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
            myApi: null

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
                'http://localhost:8000/api/suite/search?latitude=' + this.$route.query.latitude + '&longitude=' + this.$route.query.longitude + '&radius=20'

                , {
                    // params: {
                    //     latitude: this.store.country_range.lat,
                    //     longitude: this.store.country_range.lng,
                        
                    // }
                }).then(response => {
                    console.log(response.data.results, 'questa è la nuoava api');
                    // this.store.suite = response.data.results;
                    this.filtered =  response.data.results;;
                    // console.log(this.filtered, 'questo e` array filtrato da API')
                    // this.filter()
                }).catch(function (error) {
                    console.log(error);
                });
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

        // filter() {
        //     this.filtered = [];
        //     for (let index = 0; index < this.store.suite.length; index++) {

        //         let filter_coordinate = this.getDistanceBetweenPoints(this.store.country_range.lat, this.store.country_range.lng, this.store.suite[index].latitude, this.store.suite[index].longitude);
        //         // this.filtered[index].distance = this.filter_coordinate


        //         if (filter_coordinate <= this.range) {
        //             if ((this.store.suite[index].room >= this.room) && (this.store.suite[index].bed >= this.bed)) {
        //                 this.store.suite[index].distance = filter_coordinate
        //                 this.filtered.push(this.store.suite[index])
        //             }
        //         }
        //         // this.distance = this.getDistanceBetweenPoints(this.store.country_range.lat, this.store.country_range.lng, this.store.suite[index].latitude, this.store.suite[index].longitude);
        //         // console.log(this.filtered)

        //     }
        //     this.orderByDistance();
        // },
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
            console.log(this.$route.query ,'sono le query')
           this.myApi = this.$route.path.api_url

            // console.log(route.path, 'yo')
            // this.end_point = route.path
            // console.log(this.end_point, 'yo secondo')
        }

    },

    mounted() {
        this.getroute()
        this.getApi();
        // console.log(this.base_url + this.end_point)
        // console.log(this.store);
            
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
                <!-- </router-link> -->
            </div>
        </form>

        <div class="container container-breack">




            <!-- FILTERS BAR -->
            <div class="my-left-bar col-2 p-0 border border-dark my-2 h-100 sticky-top z-1 bg-warning-subtle">
                <h4 class="border-bottom border-dark p-3 text-center m-0">Results: {{ filtered.length }}</h4>

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
                </div>
            </div>

            <!-- ***************************************SUITE CARDS****************************************************** -->



            <div class="col-xl-8 col-lg-9 col-md-9 col-md-12">
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
                                <span>{{ suite.distance }} km from centre</span>
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
                            <div class="ms-4 mt-2 col-2">




                                <div>
                                    servizi:
                                    <br>
                                    1
                                    <br>
                                    2
                                    <br>
                                    3
                                    <br>
                                    4
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>


                <!-- CARD NON SPONSORIZZATE -->
                <div v-for="suite in filtered">
                    <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } , query: {slug : suite.slug } }"
                        class="text-decoration-none text-dark">
                        <div v-if="suite.sponsor === 0" class="col-xl-12 ms-2 my-3 d-flex rounded border p-2 my-card-breack">

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
                                <span>{{ suite.distance }} km from centre</span>

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
                                    servizi:
                                    <br>
                                    1
                                    <br>
                                    2
                                    <br>
                                    3
                                    <br>
                                    4
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