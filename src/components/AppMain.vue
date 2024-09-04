<script>
import AppHompage from '../pages/AppHompage.vue'
import store from '../data/store';
import axios from "axios";
import { RouterView } from 'vue-router';
export default {

    name: 'AppMain',


    components: {

        AppHompage

    },

    data() {
        return {
            store,
            suite: [],
            searchBar : [],
            room : null,
            bed: null,
            search_input : null ,
        }
    },
    methods: {
        getInputSearch(value) {
			this.search_input = value.target.value
		},

        getSuite(){
		axios.get('http://localhost:8000/api/suite?page=1').then(response => {		
            for (let index = 0; index <= response.data.results.data.length - 1; index++) {
                let suite_address = response.data.results.data[index].address
                let country_filter = suite_address.toLowerCase().includes( this.search_input.toLowerCase())
                let suite_room = response.data.results.data[index].room 
                let bed_room = response.data.results.data[index].bed
                
                if(country_filter && suite_room == this.room && bed_room == this.bed ){
                    
                    console.log(response.data.results.data[index])
                    this.suite.push(  response.data.results.data[index])
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

    <router-view></router-view>
    <div>
        <label for="search_bar">ricerca</label>
        <input @input="getInputSearch" name="search_bar" type="text">
    </div>
    <div>
        <label for="n_room">stanze</label>
        <input name="n_room" v-model=room type="number">
    </div>

    <div>
        <label for="n_bed">bed</label>
        <input name="n_bed" v-model=bed type="number">
    </div>

    <button @click="getSuite"> cerca</button>
    <div>
        <ul v-for="element in suite">
            <li>
                {{ element.address }}
            </li>
        </ul>
    </div>
</template>

<style scoped></style>