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
            latest_endpoint: '/api/suite/latest',
            myApi: 'latitude=' + this.lat_rom + '&longitude=' + this.lon_rom + '&radius=20',
            visible: '',
            scrollLine: null,
            byeBye: ''


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
            this.myApi = 'latitude=' + this.lat_rom + '&longitude=' + this.lon_rom

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
            const apiKey = `.json?key=jmRHcyl09MwwWAWkpuc1wvI3C3miUjkN&limit=6&countrySet=IT`

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
            console.log(this.aka, 'cliccato')
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
        },
        getFix() {
            this.scrollLine = window.scrollY
            if (this.scrollLine > 300) {
                console.log(this.scrollLine, "sta andando")
                // nav.classList.add("ciao")  
                this.visible = "navFixed"
                this.byeBye = "d-none"
            } else if (this.scrollLine < 300) {
                console.log("contiene")
                this.visible = ""
                this.byeBye = ''
            }
        }

        // da spostare
    },



    mounted() {
        this.getHome();



    },
    created() {
        window.addEventListener('scroll', this.getFix)
    },


}

</script>

<template>
    <div class="jumbotron">
        <div class="img-container">
            <div class="d-flex flex-column justify-content-end align-items-center h-100">
                <h1 :class="this.byeBye" class="display-5 fw-bold text-light">
                    Welcome to BoolBnB
                </h1>

                <div class="searchbar-container" :class="this.visible">
                    <form class="d-flex justify-content-center" role="search">
                        <div class="col-8 me-2 position-relative">
                            <input class="searchbar w-100" type="search" placeholder="Search a location" aria-label="Search"
                                v-model="pokemon" @input="getInputSearch" name="search_bar" required autocomplete="off">
                            <ul id="result" class="list-group position-absolute">
                                <li class="list-group-item" v-for="item, index in this.aka"
                                    @click="this.getChoose(index)">
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <router-link
                                :to="{ name: 'suites', query: { latitude: this.lat_rom, longitude: this.lon_rom, address: this.pokemon }, params: { address: this.pokemon } }"
                                class="nav-link text-light disabled" id="search-link">
                                <button class="btn btn-success search-btn me-3 " type="button" @click="getSuite">
                                    Search
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

        <h2 class="my-3 col-9 mx-auto">Our Advices:</h2>
      
        <div v-for="suite in this.suite" class="col-lg-12 col-md-12 col-12 link-underline-opacity-0" id="my_suite">
                <router-link :to="{ name: 'AppSingleSuite', params: { slug: suite.slug } }"
                    class="text-decoration-none">

                    <div v-if="suite.sponsor === 1"
                        class="col-12 d-flex rounded border p-2 justify-content-between mt-2 flex-wrap"  >


                        <div class="col-12 col-md-4 d-flex align-items-center ">

                            <div class="position-relative">
                                <img v-if="!suite.img.startsWith('http')"
                                    :src="store.localHostUrl + '/storage/' + suite.img" alt="..." class=" col-3 rounded card-img-top object-fit-cover">
                                <img v-else="" :src="suite.img" class=" col-3 rounded card-img-top object-fit-cover">

                                <!-- Etichetta sponsored -->
                                <div class="my-sponsored-div">Sponsored<i class="fa-regular fa-star ms-1"></i></div>
                            </div>

                        </div>


                        <div class="col-6 p-3 col-md-4 text-dark  text-decoration-none">
                            <h4 class="card-title ellipse py-1">{{ suite.title }}</h4>
                            <p>{{ suite.address }}</p>
                            
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

    </div>



</template>

<style scoped>
.jumbotron{
     padding-top: 6rem; 
}

#my_suite:hover{
    transform: scale(1.01);
    background-color: rgba(255, 165, 22,0.6);
    border-radius: 5px;
    box-shadow: 0 0 3px rgb(23, 23, 23);;
}
.jumbo-img {
    width: 100%
}

.img-container {
    height: calc(620px - 10rem);
    width: 100%;
    background-size: cover;
    background-position-y: center;
    background-repeat: no-repeat;
    background-image: url(../assets/img/lago.jpg);
}

.searchbar-container {
    background-color: rgba(134, 134, 134, 0.815);
    width: 50%;
    /* min-width: 25rem; */
    border-radius: 80px;
    margin-top: 2rem;
    margin-bottom: 10rem;
    padding: 1rem;
}

.navFixed {
    position: fixed;

    background-color: rgba(134, 134, 134, 1);
    left: 26%;
    top: 3.89%;
    color: black;

    z-index: 999
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
    background-color: rgba(240, 248, 255, 0.5);
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
@media only screen and (max-width: 1200px) {
    #result{
        top: 25%;
    }

}
@media only screen and (min-width: 992px) {
    img {
        width: 220px;
        height: 220px;
    }
    #result{
        top: 99%;
        left: 7%;
    }
    .navFixed {
        width: 50%;
        left: 25.1%;
        top: 5.9%;

    }
}
@media only screen and (min-width: 769px) and (max-width: 992px)  {
    img {
        width: 199px;
        height: 199px;
    }
    #result{
        top: 99%;
        left: 7.8%;
    }
    .jumbotron{
     padding-top: 4rem; 
}



}
@media only screen and (min-width: 576px) and (max-width: 768px) {
   img {
        /* width: 498px;
        height: 664px; */
        aspect-ratio: 1/1;
        /* in caso voleste mettere queste passare la sezione delle colonne della card da col-md a col-sm */
    } 
    #result{
        top: 99%;
        left: 9%;
    }
    .navFixed {
        width: 90%;
        left: 5%;
        top: 8.6%;

    }
}
@media only screen and (max-width: 576px) {
    .navFixed {
        width: 90%;
        left: 5%;

    }
    .searchbar-container{
        width: 90%;
    }
    #result{
        top: 99%;
        left: 5%;
        width: 55%;
    }
    .jumbotron{
     padding-top: 4.3rem; 
     
}
img {
        width: 100%;
         aspect-ratio: 1/1; 
        /* in caso voleste mettere queste passare la sezione delle colonne della card da col-md a col-sm */
    }
}








/* @media only screen and (max-width: 768px) {
    .my-card-breack {
        flex-direction: column;
    }

    .my-img {
        align-self: center;
    }

    .searchbar-container {
        min-width: 80%;
    }
}
@media only screen and (max-width: 992px) {
    .img-container{
        background-position-x: right;
    }
} */
</style>
