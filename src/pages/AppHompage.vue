<script>
import store from '../data/store.js';
import axios from "axios";

export default {

    name: 'AppHompage',


    components: {



    },

    data() {
        return {
            store,
            suite: '',
            searchBar: [],
            room: 0,
            bed: 0,
            range: 20,
            search_input: null,
            result_suggest: [],
            aka: [],


            base_url: "https://api.tomtom.com/search/2/search/",
            pokemon: null,

            // lat_nap: 0,
            // lon_nap: 0,

            lat_rom: 0,
            lon_rom: 0,
            unita: "kilometers",
            my_base_url: 'http://127.0.0.1:8000',
            latest_endpoint: '/api/suite/latest'


        }
    },
    methods: {
        getInputSearch(value) {
            this.search_input = value.target.value
            this.autocomplete(this.search_input)
        },

        getSuite() {
            this.store.country_range.lat = this.result_suggest[0].position.lat
            this.store.country_range.lng = this.result_suggest[0].position.lon

            console.log(this.store.country_range, 'coordinate')
            // this.getApi()
            // console.log(this.range, 'questo è il range')

            // axios.get('http://localhost:8000/api/suite').then(response => {
            //     // console.log(response, 'questa è la chiamata')
            //     this.store.suite = []
            //     for (let index = 0; index <= response.data.results.data.length - 1; index++) {
            //         // let suite_address = response.data.results.data[index].address

            //         // let country_filter = suite_address.toLowerCase().includes(this.search_input.toLowerCase())
            //         let suite_room = response.data.results.data[index].room
            //         let bed_room = response.data.results.data[index].bed

            //         let lat_input = response.data.results.data[index].latitude
            //         let lng_input = response.data.results.data[index].longitude

            //         let filter_coordinate = this.getDistanceBetweenPoints(lat_input, lng_input, this.lat_rom, this.lon_rom, this.unita)

            //         if (filter_coordinate <= this.range) {
            //             if ((this.room != 0 && this.bed != 0) || (this.room != 0 || this.bed != 0) || (this.room == 0 || this.bed == 0)) {
            //                 if (suite_room >= this.room && bed_room >= this.bed) {
            //                     console.log(response.data.results.data[index])
            //                     this.store.suite.push(response.data.results.data[index])
            //                 }
            //             }
            //         }
            //     }
            // })
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

        //**************************************** */
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
        getChoose(x) {
            this.pokemon = this.aka[x]
            console.log(this.searchBar, 'cliccato')
            this.aka = [];
            this.disabled();
        },

        getHome() {
            delete axios.defaults.headers.common['X-Requested-With'];

            axios.get(this.my_base_url + this.latest_endpoint).then(response => {
                this.suite = response.data.results;
                console.log(this.suite);

            });
        },

        disabled() {
            document.getElementById("search-link").classList.remove("disabled")
        }

        // da spostare
    },



    mounted() {
        this.getHome();



    }


}

</script>

<template>
    <div class="jumbotron">
        <div class="img-container">
            <div class="d-flex flex-column justify-content-end align-items-center h-100">
                <h1 class="display-5 fw-bold text-light">
                    Welcome to BoolBnB
                </h1>
                <div class="searchbar-container">
                    <form class="d-flex justify-content-center" role="search">
                        <div class="col-8 me-3">
                            <input class="searchbar w-100" type="search" placeholder="Search" aria-label="Search"
                                v-model="pokemon" @input="getInputSearch" name="search_bar" required>
                            <ul id="result" class="list-group position-absolute">
                                <li class="list-group-item" v-for="item, index in this.aka"
                                    @click="this.getChoose(index)">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <router-link :to="{ name: 'suites' }" class="nav-link text-light disabled" id="search-link">
                                <button class="btn btn-success search-btn me-3 " type="button" @click="getSuite"> Search
                                </button>
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--************************************* SEZIONE PER LE CARD **********************************************************-->
    <div class="container">
        <h2 class="my-3">Our Advices:</h2>
        <!-- <div class="row col-12 col-sm-6 col-md-4 col-xl-3 w-100">
            <div v-for="suite in this.suite" class="col-3 myBorder">
                <div class="card my-3 myBorder">
                    <img v-if="!suite.img.startsWith('http')" :src="store.localHostUrl + '/storage/' + suite.img"
                        class="card-img-top h-100" alt="...">

                    <img v-else="" :src="suite.img" class="card-img-top h-100" alt="...">
                    <div class="card-body myBorder text-center">
                        <h5 class="card-title ellipse py-1">{{ suite.title }}</h5>
                        <p class="card-text ellipse">{{ suite.address }}</p>
                        <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                            class="btn btn-outline-primary mt-auto">more
                            details</router-link>
                    </div>
                </div>
            </div>

        </div> -->
        <div v-for="suite in this.suite">
            <div class="col-12 ms-2 my-3 d-flex rounded border p-2 position-relative">
                <!-- <div class="my-sponsored-div">Sponsored<i class="fa-regular fa-star ms-1"></i></div> -->
                <div class="my-img col-3 me-3">
                    <img v-if="!suite.img.startsWith('http')" :src="store.localHostUrl + '/storage/' + suite.img"
                        class="card-img-top object-fit-cover " alt="...">

                    <img v-else="" :src="suite.img" class="card-img-top h-100 col-3 rounded" alt="...">
                </div>
                <div class="col-6 ">
                    <h4 class="card-title ellipse py-1">{{ suite.title }}</h4>
                    <span>{{ suite.address }}</span>
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

                    <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                        class="btn btn-outline-primary mt-auto">Show Suite</router-link>
                    <!-- <div>
                                servizi:
                                <br>
                                1
                                <br>
                                2
                                <br>
                                3
                                <br>
                                4
                            </div> -->
                </div>
            </div>
        </div>

    </div>



</template>

<style scoped>
.jumbo-img {
    width: 100%
}

.img-container {
    height: calc(100vh - 10rem);
    width: 100%;
    background-size: 100%;
    background-position-y: center;
    background-repeat: no-repeat;
    background-image: url(../assets/img/lago.jpg);
}

.searchbar-container {
    background-color: rgba(134, 134, 134, 0.815);
    width: 50%;
    border-radius: 80px;
    margin-top: 2rem;
    margin-bottom: 10rem;
    padding: 1rem;
}

.searchbar {
    border-radius: 80px;
    height: 3rem;
    background-color: rgba(240, 248, 255, 0);
    border: white 2px solid;
    /* width: 70%; */
    padding: 1rem;
    outline: none;
    color: white;
}

.searchbar:focus {
    background-color: white;
    transition: 0.5s;
    color: black
}


.searchbar::placeholder {
    color: rgba(255, 255, 255, 0.927);
}

.search-btn {
    height: 3rem;
    border-radius: 20px;
    background-color: rgba(240, 248, 255, 0);
    border: white 2px solid;
}

.search-btn:hover {
    background-color: white;
    color: rgb(0, 89, 255);
}

.offcanvas {
    background-color: #222;
    color: white;
    height: 50vh;
}

.offcanvas-item {
    width: 20%;
    margin-bottom: 1rem;
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
</style>
