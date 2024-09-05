<script>
import store from '../data/store.js';
import axios from "axios";

export default {

    name: 'AppHompage',


    components: {



    },

    data() {
        return {
            // store,




        }
    },
    methods: {



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
                <div class="searchbar-container d-flex align-items-center">
                    <form class="d-flex col-6" role="search">
                        <input class="searchbar me-3" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-success" type="submit">Search</button>
                    </form>
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
    height: 40rem;
    width: 100%;
    background-size: 100%;
    background-position-y: center;
    background-repeat: no-repeat;
    /* background-image: url({{asset('/img/' . 'colosseo.jpg')}}); */
}

.searchbar-container {
    background-color: rgba(134, 134, 134, 0.815);
    width: 80%;
    border-radius: 80px;
    margin-top: 2rem;
    margin-bottom: 5rem;
    padding: 1rem;
}

.searchbar {
    border-radius: 80px;
    height: 3rem;
    background-color: rgba(240, 248, 255, 0);
    border-color: white;

}
</style>