<script>
import store from '../data/store';
import axios from "axios";
export default {

    name: 'AppSuites',


    components: {



    },

    data() {
        return {
            store,
            text: '',
            email: '',
            name: '',
            loading: false,
            success: false,
            errors: {},
            ip_address:0,
            suite_id: null,
            successo: false,
            suite: null,

        }
    },
    methods: {
        sendForm() {
            this.loading = true;
            const data = {
                'name': this.name,
                'email': this.email,
                'text': this.text
            };

            // pulisco l'array con i messaggi
            this.errors = {};

            // Importante - Stiamo comunicando con Laravel, quindi non è più obbligatorio inserire gli headers con il Content-Type
            // come abbiamo fatto invece quando comunicavamo direttamente con gli script PHP
            axios.post(`http://127.0.0.1:8000/api/pincopallino/${this.$route.params.slug}`, data).then((response) => {
                this.success = response.data.success;
                if (!this.success) {
                    this.errors = response.data.errors;
                    // console.log(this.errors);
                } else {
                    // ripulisco i campi di input
                    this.name = '';
                    this.email = '';
                    this.text = '';
                }
                this.loading = false;
            });
        },
        getVisuals() {
            axios.get('http://edns.ip-api.com/json', {
                params: {

                }
            }).then(response => {
                let x = []
                this.ip_address = response.data.dns.ip
                console.log('ip', this.ip_address);
                let data = {
                    'ip_address': this.ip_address,
                    'suite_id': '25',
                }; 
                
                // ******* invio al db
                this.ip_address = '151.5.216.257'
               
                axios.post('http://127.0.0.1:8000/api/visual', {
                    ip : this.ip_address.toString() ,
                    suite: this.store.singleSuite.id
                })
                    .then(function (response) {
                        console.log(response.data.results);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                //  console.log(this.store.singleSuite);

            }).catch(function (error) {
                console.log(error);
            });
            console.log('ip 2', this.ip_address);
        }

    },

    mounted() {

        //console.log(this.$route.params.slug);
        // console.log(this.$route.params, 'questa e la rotta per lo slug')
        // console.log(`http://127.0.0.1:8000/api/visual/${this.$route.params.slug}`)
        axios
            .get(`http://127.0.0.1:8000/api/suite/name/${this.$route.params.slug}`)
            .then(response => {
                // console.log(response.data.results, 'risposta api');


                if (response.data.status) {
                    this.store.singleSuite = response.data.results;
                    // console.log('questo è ', this.store.singleSuite);
                    // this.suite_id = response.data.results.id;
                    this.suite = response.data.results;
                    // console.log(this.visuals);
                    
                } else {
                    this.$router.push({ name: 'not-found' });
                }


                
            });
            setTimeout(this.getVisuals, 3000)
            
    },


}


</script>


<template>

    <!-- <div class="container text-center p-0" v-if="store.singleSuite">


        <div class="card mb-3 p-5">

            <img v-if="!store.singleSuite.img.startsWith('http')" style="height: 50rem;"
                :src="store.localHostUrl + '/storage/' + store.singleSuite.img" class="card-img-top" alt="...">

            <img v-else="" :src="store.singleSuite.img" class="card-img-top" alt="..." style="height: 50rem;">


            <div class=" card-body">

                <h5 class="card-title">{{ store.singleSuite.title }}</h5>
                <p class="card-text">{{ store.singleSuite.address }}</p>
                <router-link :to="{ name: 'suites' }" class="btn btn-outline-danger">
                    back to the list</router-link>

            </div>

        </div>

    </div> -->
    <div class="container my-breack d-flex py-2 justify-content-around col-xl-12 col-l-12 mt-5" v-if="store.singleSuite">

        <img v-if="!store.singleSuite.img.startsWith('http')" :src="store.localHostUrl + '/storage/' + suite.img"
            class="mb-5" alt="...">

        <img v-else="" :src="store.singleSuite.img" class="mb-5" alt="...">

        <div class="d-flex flex-column ">
            <h2 class="card-title">{{ store.singleSuite.title }}</h2>
            <p class="card-text">{{ store.singleSuite.address }}</p>



            <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-person-shelter col-6"></i>


                        <strong class="col-6">
                            Rooms :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.room }}
                    </span>
                </li>

                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-toilet col-6"></i>


                        <strong class="col-6">
                            Bathrooms :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.bathroom }}
                    </span>
                </li>

                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-bed col-6"></i>


                        <strong class="col-6">
                            Beds :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.bed }}
                    </span>
                </li>

                <li class="list-group-item">
                    <div class="col-6 d-flex justify-content-between">

                        <i class="fa-solid fa-maximize col-6"></i>


                        <strong class="col-6">
                            Square-Meters :
                        </strong>
                    </div>
                    <span>

                        {{ store.singleSuite.squareM }}
                    </span>
                </li>

            </ul>
            <button class="btn btn-outline-primary my-3" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                Contact the owner
            </button>
            <router-link :to="{ name: 'suites' }" class="btn btn-outline-info mb-5">Go back to search</router-link>
            <!-- <router-link :to="{ name: 'Contacts', params: { id: store.singleSuite.id } }"
                class="btn btn-outline-danger">contact</router-link> -->

        </div>
    </div>
    <!-- ***************************************OFFCANVAS****************************************************** -->

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">Contact the owner:</h5>
            <div v-if="success" class="alert alert-success text-start" role="alert">
                Messaggio inviato con successo!
            </div>
        </div>
        <div class="offcanvas-body d-flex flex-column flex-wrap ">
            <div class="row">
                <form @submit.prevent="sendForm()" class="col-12 text-start">
                    <div class="offcanvas-item my-3">
                        <input class=" border form-control" :class="{ 'is-invalid': errors.name }" type="text"
                            name="name" id="name" placeholder="Name" v-model="name">
                        <p v-for="(error, index) in errors.name" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p>
                    </div>
                    <div class="offcanvas-item my-3">
                        <input class="border form-control" :class="{ 'is-invalid': errors.email }" type="text"
                            name="email" id="email" placeholder="Email" v-model="email">
                        <p v-for="(error, index) in errors.email" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p>
                    </div>
                    <div class="offcanvas-item my-3">
                        <textarea class="border form-control" :class="{ 'is-invalid': errors.message }" name="text"
                            id="text" cols="30" rows="10" placeholder="Message" v-model="text" required></textarea>
                        <p v-for="(error, index) in errors.text" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p>
                    </div>
                    <button class="btn btn-lg btn-info " type="submit" :disabled="loading">
                        {{ loading ? 'Sending...' : 'Send' }}
                    </button>
                </form>
            </div>
        </div>
    </div>


    <!-- ***************************************OFFCANVAS****************************************************** -->

</template>

<style scoped>
li {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
}

strong {
    font-size: 15px;
    white-space: nowrap;
    margin-right: 2rem;
}

i {
    width: 10px;
}

img {
    object-fit: cover;
    width: 500px;
    height: 500px;
}

.offcanvas {

    background-color: #d4d3d3;

}

@media only screen and (max-width: 992px) {
  .my-breack {
    display: flex;
    flex-direction: column;
  }
  img{
    width: 100%;
  }
}
</style>