<script>
import store from '../data/store';
import axios from "axios";
import { useRoute } from 'vue-router';

export default {

    name: 'AppSuites',
    // props :{
    //     address : Object
    // },

    components: {



    },

    data() {
        return {
            store,
            filtered: [],
            range: 20,
            results: 0,
            room: 0,
            bed: 0,
            search_input: null,
            lat_rom: 0,
            lon_rom: 0,
            aka: [],
            result_suggest: [],
            searchBar: [],
            pokemon: this.$route.query.address,
            base_url: 'http://localhost:8000/api',
            end_point: 0,
            myApi: null,
            check: [],
            services: [],
            service_url: '',
            suite_art: 'd-none',
            loading_art: '',
            alah: null

        }
    },
    methods: {
        getInputSearch(value) {
            this.search_input = value.target.value
            this.autocomplete(this.search_input)
        },
        getApi() {

            // console.log(this.$route.query.latitude, this.$route.query.longitude, 'coordinate per chiamata')
            delete axios.defaults.headers.common['X-Requested-With'];
            // console.log(this.store, 'questo è lo store');

            axios.get(
                // 'http://localhost:8000/api'+  this.$route.path
                // this.base_url + this.end_point
                // 'http://localhost:8000/api' + this.$route.fullPath

                'http://localhost:8000/api/suite/search?latitude=' + this.$route.query.latitude + '&longitude=' +
                this.$route.query.longitude +
                '&radius=' + this.range +
                '&room=' + this.room +
                '&bed=' + this.bed

                // this.$route.query.services

                , {
                    params: {
                        service: this.check
                    }
                }
            ).then(response => {
                console.log(response.data.results, 'questa è la nuoava api');
                // this.store.suite = response.data.results;
                this.filtered = response.data.results[0];
                this.services = response.data.results[1];
                // console.log(response.data.richiesta, 'richiesta')
                // console.log(this.filtered, 'questo e` array filtrato da API')
                // this.filter()
                this.filter()
                this.orderByDistance()
            }).catch(function (error) {
                console.log(error);
            });
            this.changeUrl()
        },

        getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2, unit = 'kilometers') {
            let theta = longitude1 - longitude2;
            let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(
                Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
                Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
            );
            if (unit == 'miles') {
                return Math.round(distance, 2);

            } else if (unit == 'kilometers') {
                return Math.round(distance * 1.609344, 2);

            }
        },

        filter() {
            for (let index = 0; index <= this.filtered.length - 1; index++) {
                let filter_coordinate = this.getDistanceBetweenPoints(this.filtered[index].latitude, this.filtered[index].longitude, this.$route.query.latitude, this.$route.query.longitude);
                // console.log(filter_coordinate + "dell'index" + index)
                this.filtered[index].distance = filter_coordinate
            }






            //  this.orderByDistance();
        },
        autocomplete(value) {

            const base_url = "https://api.tomtom.com/search/2/geocode/"
            this.aka = []

            let mid_url = value.replace(/ /g, '%20');
            const apiKey = `.json?key=jmRHcyl09MwwWAWkpuc1wvI3C3miUjkN&limit=5&countrySet=IT`

            delete axios.defaults.headers.common['X-Requested-With'];

            axios.get(base_url + mid_url + apiKey).then(response => {
                this.result_suggest = response.data.results;
                this.$route.query.latitude = this.result_suggest[0].position.lat
                this.$route.query.longitude = this.result_suggest[0].position.lon
                for (let index = 0; index < this.result_suggest.length; index++) {
                    this.aka[index] = this.result_suggest[index].address.freeformAddress
                }
            });
        },
        getSuite() {


            // console.log(this.store.country_range, 'coordinate')
            this.getApi()
            this.suite_art = 'd-none'
            this.loading_art = ''
            setTimeout(() => {
                this.suite_art = ''
                this.loading_art = 'd-none'
            }, 2376);
            this.filter()
            console.log(this.filtered, 'deve stamparle')
        },
        getChoose(x) {
            this.pokemon = this.aka[x]

            // console.log(this.$route.query.address, 'cliccato')
            this.aka = [];
            this.disabled();
            this.getApi();
        },

        disabled() {
            document.getElementById("search-btn").classList.remove("disabled")
        },

        orderByDistance() {
            this.filtered.sort((a, b) => a.distance - b.distance)
        },
        getroute() {
            // console.log(this.$route, 'questo è lurl')
            this.myApi = this.$route.path.api_url

            // console.log(route.path, 'yo')
            // this.end_point = route.path
            // console.log(this.end_point, 'yo secondo')
        },
        changeUrl() {

            let url = null
            this.service_url = ''
            for (let index = 0; index < this.check.length; index++) {
                url = '&service[]=' + this.check[index]
                // console.log(url)
                this.service_url += url
                // console.log(this.service_url)

            }
            // this.$route.fullPath += this.service_url  
            history.pushState(
                {},
                null,

                // this.$route.fullPath
                this.$route.path + '?latitude=' + this.$route.query.latitude + '&longitude=' + this.$route.query.longitude + '&radius=' + this.range + '&room=' + this.room + '&bed=' + this.bed + this.service_url + '&address=' + this.pokemon
            )
        },
        getApiMounted() {

            // console.log(this.$route.query.latitude, this.$route.query.longitude, 'coordinate per chiamata')
            delete axios.defaults.headers.common['X-Requested-With'];

            this.pokemon = this.$route.query.address
            axios.get(
                // 'http://localhost:8000/api'+  this.$route.path
                // this.base_url + this.end_point
                'http://localhost:8000/api' + this.$route.fullPath
                // 'http://localhost:8000/api/suite/search?latitude=' + this.$route.query.latitude + '&longitude=' + this.$route.query.longitude + '&radius=20' + this.$route.query.services
                , {
                    //  params: {
                    //     service : this.check 
                    //  }
                }).then(response => {
                    console.log(response.data.results, 'questa è la nuoava api');
                    // this.store.suite = response.data.results;
                    this.filtered = response.data.results[0];
                    this.services = response.data.results[1];
                    this.filter()
                    this.orderByDistance()
                    
                }).catch(function (error) {
                    console.log(error);
                });
            // console.log(this.filtered[0].distance , 'al mounted')
                
            setTimeout(() => {
                this.suite_art = ''
                this.loading_art = 'd-none'
            }, 2376);
        },



    },

    mounted() {
        this.getroute()
        this.getApiMounted();
        // console.log(this.$route)
        // this.pokemon = this.$route.query.address
        console.log(this.$route.fullPath.includes("service[]=2"), 'lo include')




    },
    created() {
        // setTimeout(() => {

        //        this.pokemon = this.$route.query.address
        //        console.log(this.pokemon , 'created')
        //     }, 200);
    }


}


</script>


<template>



    <section id="aka" class="container-fluid my-bg">
        <!-- FILTERS BAR -->
        <div class="container col-sm-12 col-12 p-0 d-flex flex-wrap  h-100 z-1 radius-25">

            <!-- SEARCHBAR -->

            <div class="d-flex justify-content-center w-100 py-4" role="search" style="margin-top: 6rem;">
                <div class="col-sm-10 col-8 d-flex  justify-content-center position-relative">
                    <input class="searchbar" type="search" placeholder="Search" aria-label="Search" v-model="pokemon"
                        @input="getInputSearch" name="search_bar" style="width: 90%;" required autocomplete="off">
                    <ul id="result" class="list-group position-absolute">
                        <li class="list-group-item" v-for="item, index in this.aka" @click="this.getChoose(index)">
                            {{ item }}
                        </li>
                    </ul>
                </div>
                <div class="col-sm-2  col-4 d-flex justify-content-end justify-content-sm-start ">
                    <!-- <router-link :to="{ name: 'suites' , query:{latitude: this.$route.query.latitude , longitude:this.$route.query.latitude} }" class="nav-link text-light"> -->
                    <button id="search-btn" class="btn my_btn " type="button" @click="getSuite"
                        style="position: absolute;">
                        Search
                    </button>
                    <!-- <button @click="prova">prova</button> -->
                    <!-- </router-link> -->
                </div>
            </div>

            <!---------------------------- FILTERS ---------------------------->
            <div class="col-12 d-flex flex-wrap p-4 border border-dark rounded"
                style="position: relative; background-color: white;">
                <span class=""
                    style="position: absolute;right:0; top:0; border-top: 35px solid #514b82;border-left: 55px solid rgba(77, 41, 223, 0); color:whitesmoke; background-color:  conic-gradient(#25b09b 25%, #f03355 0 50%, #514b82 0 75%, #ffa516 0);z-index:5"></span>
                <span class=""
                    style="position: absolute;right:0; top:0; border-top: 39px solid #f03355;border-left: 110px solid rgba(77, 41, 223, 0); color:whitesmoke; background-color:  conic-gradient(#25b09b 25%, #f03355 0 50%, #514b82 0 75%, #ffa516 0);z-index:4"></span>
                <span class=""
                    style="position: absolute;right:0; top:0; border-top: 43px solid #25b09b;border-left: 165px solid rgba(77, 41, 223, 0); color:whitesmoke; background-color:  conic-gradient(#25b09b 25%, #f03355 0 50%, #514b82 0 75%, #ffa516 0);z-index:3"></span>
                <span class=""
                    style="position: absolute;right:0; top:0; border-top: 47px solid #ffa516;border-left: 220px solid rgba(77, 41, 223, 0); color:whitesmoke; background-color:  conic-gradient(#ffa516 25%, #f03355 0 50%, #514b82 0 75%, #ffa516 0);z-index:2"></span>


                <div
                    class="col-lg-2 text-start d-flex flex-column justify-content-center align-items-center border-0 col-sm-4">
                    <label for="customRange1" class="ms-2 fw-semibold form-label">Km radius: {{ this.range }}
                    </label>
                    <input @input="getSuite()" type="range" min="0" max="20" v-model=range
                        class="w-50 mx-2 mb-2 form-control form-range text-light border-0 mx-5" id="customRange1">
                </div>
                <div class="col-lg-2 text-start d-flex align-items-center col-sm-4">
                    <label for="suite_room" class="m-2 fw-semibold form-label">Rooms:</label>
                    <input type="number" class="w-50 m-2 form-control form-control " id="suite_room" placeholder=""
                        name="room" min="1" max="20" v-model=room @input="getSuite()">
                </div>
                <div class="col-lg-2 text-start d-flex align-items-center col-sm-4">
                    <label for="suite_bed" class="m-2 fw-semibold form-label">Beds:</label>
                    <input type="number" class="w-50 m-2 form-control form-control " id="suite_bed" placeholder=""
                        name="bed" min="1" max="20" v-model=bed @input="getSuite()">
                </div>
                <div class="col-lg-6 col-sm-12 d-flex flex-wrap justify-content-center">

                    <h5 for="suite_services" class="ms-2 fw-semibold form-label col-12 text-center">
                        Select Services:
                    </h5>
                    <div class="d-flex col-12 flex-wrap justify-content-start">
                        <div v-for="service, index in services" :key="index" class="text-center p-1 col-4">
                            <label :for="services.name" class="border rounded p-2 w-100 h-100 text-start" id="services">
                                <input class="" type="checkbox" :value='service.id' :name="service.name" v-model="check"
                                    :id="service.name" @change="getSuite()">
                                <span style="font-size: 15px;">
                                    &nbsp;{{ service.name }}&nbsp;
                                </span>
                                <i :class="service.icon" class=""></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <!-- ***************************************SUITE CARDS****************************************************** -->
    <main class="d-flex justify-content-center align-items-center">
        <div style="height:53vh">
            <div :class="loading_art" class="loader col-1" style="width:150px; margin-top: 13rem">
            </div>
        </div>


        <section :class="suite_art" class="container">


            <!-- CARD SPONSORIZZATE -->
            <div class="p-3 text-start ">
                <h3>
                    Results:
                    <span :class="suite_art">
                        {{ filtered.length }}
                    </span>
                </h3>
            </div>

            <div v-for="suite in filtered" class="col-lg-12 col-md-12 col-12 link-underline-opacity-0" id="my_suite">
                <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                    class="text-decoration-none">

                    <div v-if="suite.sponsor == 1"
                        class="col-12 d-flex rounded border p-2 justify-content-between mt-2 flex-wrap">


                        <div class="col-12 col-md-4 d-flex align-items-center ">

                            <div class="position-relative">
                                <img v-if="!suite.img.startsWith('http')"
                                    :src="store.localHostUrl + '/storage/' + suite.img" class=" col-3 rounded card-img-top object-fit-cover" alt="...">
                                <img v-else="" :src="suite.img" class=" col-3 rounded card-img-top object-fit-cover">

                                <!-- Etichetta sponsored -->
                                <div class="my-sponsored-div">Sponsored<i class="fa-regular fa-star ms-1"></i></div>
                            </div>

                        </div>


                        <div class="col-6 p-3 col-md-4 text-dark  text-decoration-none">
                            <h4 class="card-title ellipse py-1">{{ suite.title }}</h4>
                            <p>{{ suite.address }}</p>
                            <span>{{ suite.distance }} KM from center </span>
                            <div class="d-flex flex-wrap align-content-end">
                                <div class="me-4">
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-person-shelter me-2 text-center"></i>
                                        Rooms: {{ suite.room }}
                                    </div>
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-bed me-2 text-center"></i>
                                        Beds: {{ suite.bed }}
                                    </div>
                                </div>
                                <div>
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-toilet me-2 text-center"></i>
                                        Bathrooms: {{ suite.bathroom }}
                                    </div>
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-maximize me-2 text-center"></i>
                                        Square Meters: {{ suite.squareM }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SERVICES QUI QUANDO LI ABBIAMO -->
                        <div class="p-3 col-6 col-md-4 d-flex align-self-start gap-4 flex-wrap text-dark">
                            <div class="col-12 text-start" style="font-size: 25px; height: 30px">
                                Services:
                            </div>
                            <div class="d-flex flex-wrap col-12">
                                <div class="d-flex flex-column px-2">
                                    <div class="" v-for="service in suite.services">
                                        <i :class="service.icon" class="col-3" style=""></i>

                                    </div>
                                </div>
                                <div class="d-flex flex-column px-2">
                                    <div class="d-flex flex-column" v-for="service in suite.services">
                                        <div>{{ service.name }}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </router-link>
            </div>


            <!-- CARD NON SPONSORIZZATE -->
            <div v-for="suite in filtered" class="col-lg-12 col-md-12 col-12 link-underline-opacity-0" id="my_suite">
                <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } , query : this.$route }"
                    class="text-decoration-none">

                    <div v-if="suite.sponsor == 0"
                        class="col-12 d-flex rounded border p-2 justify-content-between mt-2 flex-wrap">


                        <div class="col-12 col-md-4 d-flex align-items-center ">

                            <div class="position-relative">
                                <img v-if="!suite.img.startsWith('http')"
                                    :src="store.localHostUrl + '/storage/' + suite.img" class=" col-3 rounded card-img-top object-fit-cover" alt="...">
                                <img v-else="" :src="suite.img" class=" col-3 rounded card-img-top object-fit-cover">
                            </div>

                        </div>


                        <div class="col-6 p-3 col-md-4 text-dark  text-decoration-none">
                            <h4 class="card-title ellipse py-1">{{ suite.title }}</h4>
                            <p>{{ suite.address }}</p>
                            <span>{{ suite.distance }} KM from center </span>
                            <div class="d-flex flex-wrap align-content-end">
                                <div class="me-4">
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-person-shelter me-2 text-center"></i>
                                        Rooms: {{ suite.room }}
                                    </div>
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-bed me-2 text-center"></i>
                                        Beds: {{ suite.bed }}
                                    </div>
                                </div>
                                <div>
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-toilet me-2 text-center"></i>
                                        Bathrooms: {{ suite.bathroom }}
                                    </div>
                                    <div class="mt-3 d-flex align-items-center">
                                        <i class="my-fa-w fa-solid fa-maximize me-2 text-center"></i>
                                        Square Meters: {{ suite.squareM }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SERVICES QUI QUANDO LI ABBIAMO -->
                        <div class="p-3 col-6 col-md-4 d-flex align-self-start gap-4 flex-wrap text-dark">
                            <div class="col-12 text-start" style="font-size: 25px; height: 30px">
                                Services:
                            </div>
                            <div class="d-flex flex-wrap col-12">
                                <div class="d-flex flex-column px-2">
                                    <div class="" v-for="service in suite.services">
                                        <i :class="service.icon" class="col-3" style=""></i>

                                    </div>
                                </div>
                                <div class="d-flex flex-column px-2">
                                    <div class="d-flex flex-column" v-for="service in suite.services">
                                        <div>{{ service.name }}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </router-link>
            </div>

        </section>
    </main>


</template>

<style scoped>
/* #aka{
    background-color: white;
    width : 100%; z-index :999; position:fixed; max-height:5rem ; width:100%; margin-top:5.5rem;
} */
.my_btn {
    margin-top: 3px;
    margin-left: 0;
    border: 2.3px solid black;
    border-radius: 45px;
}

.my_btn:hover {
    transform: scale(1.15);
    background: linear-gradient(204deg, #ffffff 50%, #514b82 58% 62%, #f03355 70% 74%, #25b09b 82% 86%, #ffa516 82% 100%);
    color: white;
    /* color: rgb(113, 88, 62); */
    font-weight: bold;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: rgb(0, 0, 0);
    /* background: linear-gradient(90deg, rgb(255, 255, 255) 50%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 50%); */
}

#services {
    line-height: 25px;
    background-color: rgba(0, 0, 0, 0.05);
}

#services:hover {
    background-color: rgba(255, 165, 22, 0.7);
    cursor: pointer;
}

#my_suite:hover {
    transform: scale(1.01);
    background-color: rgba(255, 165, 22, 0.6);
    border-radius: 5px;
    box-shadow: 0 0 3px rgb(23, 23, 23);
    transition: 0.3s;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

/* Track scroll-bar */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px rgb(255, 255, 255);
}

/* Handle scroll-bar */
::-webkit-scrollbar-thumb {
    background: rgb(209, 207, 207);
    border-radius: 4px;
}



.img-container {
    height: calc(800px - 10rem);
    width: 100%;
    background-size: cover;
    background-position-y: center;
    background-repeat: no-repeat;
    background-image: url(../assets/img/lago.jpg);
}

.searchbar {
    border-radius: 80px;
    height: 3rem;
    background-color: rgba(240, 248, 255, 0);
    border: black 2px solid;
    /* width: 70%; */
    padding: 1rem;
    outline: none;
    color: black;
}

.searchbar:focus {
    background-color: #FFF3CD;
    transition: 0.5s;
}

.search-btn {
    height: 3rem;
    border-radius: 20px;
    background-color: rgba(240, 248, 255, 0);
    border: black 2px solid;
    color: black;
}

.search-btn:hover {
    background-color: #FFF3CD;
    transition: 1s;

}



.my-fa-w {
    width: 20px;
}

.my-sponsored-div {
    width: 110px;
    height: 30px;
    background-color: rgb(255, 123, 0);
    position: absolute;
    top: 1rem;
    left: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    color: white;
    padding: 2px;
    font-weight: 500;
}

#result {
    z-index: 99;
    left: 6.8%;
    top: 99%;
}

/*  */
.content {
    padding: 15px;
    overflow: hidden;
    background-color: #e7e7e7;
    background-color: rgba(0, 0, 0, 0.06);
}

h1 {
    padding-bottom: 15px;
    border-bottom: 1px solid #d8d8d8;
    font-weight: 600;
}

h1 span {
    font-family: monospace, serif;
}

h3 {
    padding-bottom: 20px;
    /* box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 0 rgba(255, 255, 255, 0.9); */
}

p {
    margin: 0;
    padding: 10px 0;
    color: #777;
}

.clear {
    clear: both;
}

/* -----------------------------------------
  =CSS3 Loading animations
-------------------------------------------- */

/* =Elements style
---------------------- */
/* .load-wrapp {
  justif
  width: 300px;
  height: 100px;
  margin: 0 10px 10px 0;
  padding: 20px 20px 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #d8d8d8;
} */

.load-wrapp p {
    padding: 0 0 20px;
}

.load-wrapp:last-child {
    margin-right: 0;
}

.line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #4b9cdb;
}

.ring-1 {
    width: 10px;
    height: 10px;
    margin: 0 auto;
    padding: 10px;
    border: 7px dashed #4b9cdb;
    border-radius: 100%;
}

.ring-2 {
    position: relative;
    width: 45px;
    height: 45px;
    margin: 0 auto;
    border: 4px solid #4b9cdb;
    border-radius: 100%;
}

.ball-holder {
    position: absolute;
    width: 12px;
    height: 45px;
    left: 17px;
    top: 0px;
}

.ball {
    position: absolute;
    top: -11px;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background: #4282b3;
}

.letter-holder {
    padding: 16px;
}

.letter {
    float: left;
    font-size: 14px;
    color: #777;
}

.square {
    width: 12px;
    height: 12px;
    border-radius: 4px;
    background-color: #4b9cdb;
}

.spinner {
    position: relative;
    width: 45px;
    height: 45px;
    margin: 0 auto;
}

.bubble-1,
.bubble-2 {
    position: absolute;
    top: 0;
    width: 55px;
    height: 55px;
    border-radius: 100%;
    background-color: #4b9cdb;
}

.bubble-2 {
    top: auto;
    bottom: 0;
}

.bar {
    float: left;
    width: 15px;
    height: 6px;
    border-radius: 2px;
    background-color: #4b9cdb;
}

/* =Animate the stuff
------------------------ */








/* HTML: <div class="loader"></div> */
.loader {
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    border-radius: 50%;
    background: conic-gradient(#25b09b 25%, #f03355 0 50%, #514b82 0 75%, #ffa516 0);
    animation: l22 2s infinite linear;
}

.loader::before,
.loader::after {
    content: "";
    grid-area: 1/1;
    margin: 15%;
    border-radius: 50%;
    background: inherit;
    animation: inherit;
}

.loader::after {
    margin: 25%;
    animation-duration: 3s;
}

@keyframes l22 {
    100% {
        transform: rotate(1turn)
    }
}

/* -->AGGIUNTO altro breakpoint per gestire la lista dei risultati */
@media only screen and (max-width: 1200px) {
    #result {
        top: 25%;
    }
}

@media only screen and (min-width: 992px) {
    img {
        width: 220px;
        height: 220px;
    }

    #result {
        top: 99%;
        left: 7%;
    }
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
    img {
        width: 199px;
        height: 199px;
    }

    #result {
        top: 99%;
        left: 7.8%;
    }



}

@media only screen and (min-width: 576px) and (max-width: 768px) {

     /* img {
        width: 159px;
        height: 159px;
         in caso voleste mettere queste passare la sezione delle colonne della card da col-md a col-sm */
    
    #result {
        top: 99%;
        left: 9%;
    }
}

/* @media only screen and (max-width: 576px) {
    #result{
        top: 99%;
        left: 9%;
    }
  
} */
/* -->SOTTO I 410PX LA LISTA DEI SUGGERIMENTI è INGESTIBILE */
@media only screen and (min-width: 410px) and (max-width: 576px) {
    #result {
        top: 99%;
        left: 9%;
        width: 55%;
    }
}
</style>
