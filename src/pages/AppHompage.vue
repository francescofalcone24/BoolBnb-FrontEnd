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
            suite: [],
            searchBar: [],
            room: null,
            bed: null,
            search_input: null,
            antonioIncazzato: []
        }
    },
    methods: {
        getInputSearch(value) {
            this.search_input = value.target.value
            console.log(this.search_input)
        },

        getSuite() {
            axios.get('http://localhost:8000/api/suite?page=1').then(response => {
                for (let index = 0; index <= response.data.results.data.length - 1; index++) {
                    let suite_address = response.data.results.data[index].address
                    let country_filter = suite_address.toLowerCase().includes(this.search_input.toLowerCase())
                    let suite_room = response.data.results.data[index].room
                    let bed_room = response.data.results.data[index].bed

                    if (country_filter && suite_room == this.room && bed_room == this.bed) {

                        console.log(response.data.results.data[index])
                        this.suite.push(response.data.results.data[index])
                    }
                }
            })
        },
    },

    mounted() {

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
                                @input="getInputSearch">
                        </div>
                        <div>
                            <button class="btn btn-success search-btn me-3" type="submit"
                                @click="getSuite()">Search</button>

                            <button class="btn btn-primary search-btn" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Filters
                            </button>
                        </div>

                        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop"
                            aria-labelledby="offcanvasTopLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasTopLabel">Search filters:</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body d-flex flex-column flex-wrap align-content-start">
                                <div class="offcanvas-item mx-5">
                                    <label for="customRange1" class="form-label">Km radius</label>
                                    <input type="range" class="form-range" id="customRange1">
                                </div>
                                <div class="offcanvas-item mx-5">
                                    <label for="suite_room" class="form-label">Rooms:</label>
                                    <input type="number" class="form-control" id="suite_room" placeholder="" name="room"
                                        min="1" max="20" v-model=room>
                                </div>
                                <div class="offcanvas-item mx-5">
                                    <label for="suite_bed" class="form-label">Beds:</label>
                                    <input type="number" class="form-control" id="suite_bed" placeholder="" name="bed"
                                        min="1" max="20" v-model=bed>
                                </div>

                                <div>
                                    <div class="form-check mx-5">
                                        <label for="services">Services:</label>
                                        <div class="d-flex flex-column flex-wrap ">
                                            <div>
                                                <input class="form-check-input offcanvas-item" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Service 1
                                                </label>
                                            </div>
                                            <div>
                                                <input class="form-check-input offcanvas-item" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Service 2
                                                </label>
                                            </div>
                                            <div>
                                                <input class="form-check-input offcanvas-item" type="checkbox" value=""
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Service 3
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <div>
        <ul v-for="element in suite">
            <li>
                {{ element.address }}
            </li>
        </ul>
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
</style>