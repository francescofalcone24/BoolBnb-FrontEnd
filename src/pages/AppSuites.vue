<script>
import store from '../data/store';
import axios from "axios";
import { useRoute } from 'vue-router';

export default {

    name: 'AppSuites',


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
            pokemon: null,
            base_url: 'http://localhost:8000/api',
            end_point: 0,
            myApi: null,
            check: [],
            services: [],
            service_url: '',
            suite_art : 'd-none',
            loading_art : '',

        }
    },
    methods: {
        getInputSearch(value) {
            this.search_input = value.target.value
            this.autocomplete(this.search_input)
        },
        getApi() {

            console.log(this.$route.query.latitude, this.$route.query.longitude, 'coordinate per chiamata')
            delete axios.defaults.headers.common['X-Requested-With'];
            // console.log(this.store, 'questo è lo store');

            axios.get(
                // 'http://localhost:8000/api'+  this.$route.path
                // this.base_url + this.end_point
                //'http://localhost:8000/api' + this.$route.fullPath
                'http://localhost:8000/api/suite/search?latitude=' + this.$route.query.latitude + '&longitude=' +
                this.$route.query.longitude +
                '&radius=' + this.range +
                '&room=' + this.room +
                '&bed=' + this.bed +
                this.$route.query.services

                , {
                    params: {
                        service: this.check
                    }
                }).then(response => {
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
                     for (let index = 0; index <= this.filtered.length -1; index++) {                       
                        let filter_coordinate = this.getDistanceBetweenPoints(this.filtered[index].latitude, this.filtered[index].longitude, this.$route.query.latitude, this.$route.query.longitude);
                        console.log( filter_coordinate + "dell'index" + index)
                        this.filtered[index].distance =  filter_coordinate 
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
                this.lat_rom = this.result_suggest[0].position.lat
                this.lon_rom = this.result_suggest[0].position.lon
                for (let index = 0; index < this.result_suggest.length; index++) {
                    this.aka[index] = this.result_suggest[index].address.freeformAddress
                }
            });
        },
        getSuite() {
            this.$route.query.latitude = this.result_suggest[0].position.lat

            this.$route.query.longitude = this.result_suggest[0].position.lon

            // console.log(this.store.country_range, 'coordinate')
            this.getApi()
        },
        getChoose(x) {
            this.pokemon = this.aka[x]
            // console.log(this.searchBar, 'cliccato')
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
            console.log(this.$route, 'questo è lurl')
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
                console.log(this.service_url)

            }
            // this.$route.fullPath += this.service_url  
            history.pushState(
                {},
                null,
                // this.$route.fullPath
                this.$route.path + '?latitude=' + this.$route.query.latitude + '&longitude=' + this.$route.query.longitude + '&radius=' + this.range + '&room=' + this.room + '&bed=' + this.bed + this.service_url
            )
        },
        getApiMounted() {

            // console.log(this.$route.query.latitude, this.$route.query.longitude, 'coordinate per chiamata')
            delete axios.defaults.headers.common['X-Requested-With'];


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
                    this.filtered =  response.data.results[0];
                    this.services =  response.data.results[1];               
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



    }


}


</script>


<template>

    <div class="container">


        <!-- SEARCHBAR -->
        <form class="d-flex justify-content-center my-5" role="search">
            <div class="col-8 me-3">
                <input class="searchbar w-100" type="search" placeholder="Search" aria-label="Search" v-model="pokemon"
                    @input="getInputSearch" name="search_bar" required>
                <ul id="result" class="list-group position-absolute">
                    <li class="list-group-item" v-for="item, index in this.aka" @click="this.getChoose(index)">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div>
                <!-- <router-link :to="{ name: 'suites' , query:{latitude: this.$route.query.latitude , longitude:this.$route.query.latitude} }" class="nav-link text-light"> -->
                <button id="search-btn" class="btn btn-success search-btn me-3" type="button" @click="getSuite">
                    Search
                </button>
                <!-- <button @click="prova">prova</button> -->
                <!-- </router-link> -->
            </div>
        </form>

        <div class="container container-breack">




            <!-- FILTERS BAR -->
            <div class="my-left-bar col-2 p-0 border border-dark my-2 h-100 sticky-top z-1 bg-warning-subtle">
                <h4 class="border-bottom border-dark p-3 text-center m-0">
                    Results:
                    <span :class="suite_art">
                        {{ filtered.length }}
                    </span>
                </h4>

                <h5 class="border-bottom border-dark p-1 my-3">Filter by:</h5>
                <div class="filtri-brack">
                    <div class="border-bottom border-dark my-3">
                        <label for="customRange1" class="ms-2 fw-semibold form-label">Km radius: <br> {{ this.range }}
                        </label>
                        <input @input="filter()" type="range" min="0" max="20" v-model=range
                            class="w-50 mx-2 mb-2 form-control form-range text-light" id="customRange1">
                    </div>
                    <div class="border-bottom border-dark my-3">
                        <label for="suite_room" class="ms-2 fw-semibold form-label">Rooms:</label>
                        <input type="number" class="w-50 mx-2 mb-2 form-control form-control" id="suite_room"
                            placeholder="" name="room" min="0" max="20" v-model=room @input="filter()">
                    </div>
                    <div class="my-3">
                        <label for="suite_bed" class="ms-2 fw-semibold form-label">Beds:</label>
                        <input type="number" class="w-50 mx-2 mb-2 form-control" id="suite_bed" placeholder=""
                            name="bed" min="0" max="20" v-model=bed @input="filter()">
                    </div>
                    <div class="my-3">

                        <label for="suite_services" class="ms-2 fw-semibold form-label">Select Services:</label>
                        <div v-for="service in services">
                            <label class="ms-2 fw-semibold form-label" :for="service.name">{{ service.name
                                }}</label><br />
                            <input class="mx-2 mb-2" type="checkbox" :value='service.id' :name="service.name"
                                v-model="check" @input="filter()" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- ***************************************SUITE CARDS****************************************************** -->

            <div :class="loading_art" class="load-wrapp container-fluid justify-self-center">
                <div class="load-9" style=" position:absolute; left :48%;top : 25%;">

                    <div class="spinner" style="width : 175px">
                        <div class="bubble-1"></div>
                        <div class="bubble-2"></div>
                    </div>
                </div>
            </div>


            <div :class="suite_art" class="col-xl-8 col-lg-9 col-md-9 col-md-12">
                <!-- CARD SPONSORIZZATE -->
                <div v-for="suite in filtered">
                    <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                        class="text-decoration-none text-dark">
                        <div v-if="suite.sponsor === 1"
                            class="col-xl-12 ms-2 my-3 d-flex rounded border p-2 position-relative my-card-breack">
                            <div class="my-sponsored-div">Sponsored<i class="fa-regular fa-star ms-1"></i></div>
                            <div class="my-img col-3 me-3">
                                <img v-if="!suite.img.startsWith('http')"
                                    :src="store.localHostUrl + '/storage/' + suite.img"
                                    class="h-100 col-3 rounded card-img-top object-fit-cover " alt="...">

                                <img v-else="" :src="suite.img"
                                    class="card-img-top h-100 col-3 rounded object-fit-cover" alt="...">
                            </div>
                            <div class="col-6 ">
                                <h4 class="card-title ellipse py-1">{{ suite.title }}</h4>
                                <p>{{ suite.address }}</p>
                                <span>{{ suite.distance }} KM from centre </span>
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
                            <div class="p-3 col-3 d-flex justify-content-start flex-wrap">
                                    <span class="col-12" style="font-size: 25px;">
                                    Services:
                                    </span>
                                    <div class="d-flex col-3 flex-row flex-wrap"
                                        v-for="service in suite.services">
                                        <div class="d-flex gap">
                                                <i :class="service.icon" class="col-3" style=""></i>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </router-link>
                </div>


                <!-- CARD NON SPONSORIZZATE -->
                <div v-for="suite in filtered" :class="suite_art">
                    <router-link
                        :to="{ name: 'AppSingleSuite', params: { slug: suite.slug }, query: { slug: suite.slug } }"
                        class="text-decoration-none text-dark">
                        <div v-if="suite.sponsor === 0"
                            class="col-xl-12 ms-2 my-3 d-flex rounded border p-2 my-card-breack">

                            <div class="my-img col-3 me-3">
                                <img v-if="!suite.img.startsWith('http')"
                                    :src="store.localHostUrl + '/storage/' + suite.img"
                                    class="card-img-top object-fit-cover " alt="...">

                                <img v-else="" :src="suite.img"
                                    class="card-img-top h-100 col-3 rounded object-fit-cover" alt="...">
                            </div>
                            <div class="col-6 ">
                                <h4 class="card-title ellipse py-1">{{ suite.title }}</h4>
                                <p>{{ suite.address }}</p>
                                <span>{{ suite.distance }} KM from centre </span>

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

                            <div class="ms-4 mt-2 col-2">


                                <div>
                                    <strong>Services:</strong>
                                    <div v-for="service in suite.services">
                                        <br>
                                        {{ service.name }}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.container-breack {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.my-left-bar {
    top: 1rem
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

.my-img {
    width: 220px;
    height: 220px;
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






.l-9 {
  animation-delay: 1.44s;
}


.load-9 .spinner {
  animation: loadingI 2s linear infinite;
}
.load-9 .bubble-1,
.load-9 .bubble-2 {
  animation: bounce 2s ease-in-out infinite;
}
.load-9 .bubble-2 {
  animation-delay: -1s;
}



@keyframes loadingA {
  0% {
    height: 15px;
  }
  50% {
    height: 75px;
  }
  100% {
    height: 15px;
  }
}

@keyframes loadingB {
  0% {
    width: 15px;
  }
  50% {
    width: 75px;
  }
  100% {
    width: 15px;
  }
}

@keyframes loadingC {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 45px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes loadingD {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loadingE {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loadingF {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes loadingG {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(70px, 0) rotate(360deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes loadingH {
  0% {
    width: 15px;
  }
  50% {
    width: 75px;
    padding: 4px;
  }
  100% {
    width: 15px;
  }
}

@keyframes loadingI {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

@keyframes loadingJ {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(80px, 0);
    background-color: #f5634a;
    width: 25px;
  }
}


@media only screen and (max-width: 992px) {
    .my-left-bar {
        position: static;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .container-breack {
        display: block;
    }

    .my-card-breack {
        display: flex;
        flex-direction: column;
        align-self: center;
    }

    .my-img {
        align-self: center;
    }
}



</style>