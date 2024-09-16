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
            ip_address: 0,
            suite_id: null,
            successo: false,
            suite: null,
            validateEmail: false,
            suite_art :'d-none',
            loading_art: '',

        }
    },
    methods: {

        validateEmailInput() {

            this.validateEmail = false
            const emailInput = document.getElementById('email').value;
            const feedbackElement = document.getElementById('emailFeedback');
            const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

            if (emailInput.includes('@') && emailInput.includes('.') && !emailInput.endsWith('.')) {
                feedbackElement.textContent = ""; // Email is valid
                this.validateEmail = true
            } else {
                feedbackElement.textContent = "Please enter a valid email address.";
                this.validateEmail = false
            }

        },

        sendForm() {

            if (this.validateEmail == true) {
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
            }
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
                    ip: this.ip_address.toString(),
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
        setTimeout(() => {
            
        
        axios
            .get(`http://127.0.0.1:8000/api/suite/name/${this.$route.params.slug}`)
            .then(response => {
                // console.log(response.data.results, 'risposta api');


                if (response.data.status) {
                    this.store.singleSuite = response.data.results;
                    console.log('questo è ', this.store.singleSuite);
                    // this.suite_id = response.data.results.id;
                    this.suite = response.data.results;
                    // console.log(this.visuals);

                } else {
                    this.$router.push({ name: 'not-found' });
                }



            });
        },200);
        setTimeout(this.getVisuals, 3000)
        console.log(this.$route.query, 'query route') 
        setTimeout(() => {
                this.suite_art = ''
                this.loading_art = 'd-none'
            }, 846);

    },



}


</script>


<template>
    <section style="padding-top:6rem">
        <section class="container d-flex justify-content-center" :class="loading_art">
            <div style="height:50vh">
                <div :class="loading_art" class="loader col-1" style="width:150px;margin-top:2rem;">
                </div>
            </div>
        </section>
        <div :class="suite_art" class=" container d-flex flex-wrap py-4" v-if="store.singleSuite">

            <div class="col-12 col-sm-12 col-lg-6">
                <img v-if="!store.singleSuite.img.startsWith('http')" :src="store.localHostUrl + '/storage/' + suite.img"
                class="" alt="...">


                <img v-else="" :src="store.singleSuite.img" class="" alt="...">
            </div>

            <div class=" col-12 col-sm-12 col-lg-6 d-flex flex-wrap p-3">
                <h2 class="card-title col-12">{{ store.singleSuite.title }}</h2>
                <p class="card-text col-12">{{ store.singleSuite.address }}</p>



                <ul class="list-group list-group-flush mb-3 col-12">
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

                    <li class="list-group-item col-12 d-flex flex-wrap justify-content-start">
                       



                            <h3 class="col-12">Services:</h3>
                            <div class="col-6" v-for="service in store.singleSuite.services">
                                <span id="services" class="p-2"><i :class="service.icon" style="margin-right: 1.3rem;"  ></i>{{ service.name }}</span>
                            </div>
                        

                    </li>

                </ul>
                <div class="col-12">
                    <button class="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                        Contact the owner
                    </button>
                    <button @click="$router.go(-1)" class="btn btn-outline-info">Go back to search</button>
                    <!-- <a @click="$router.go(-1)">back</a> -->
                </div>
                <!-- <router-link :to="{ name: 'Contacts', params: { id: store.singleSuite.id } }"
                class="btn btn-outline-danger">contact</router-link> -->

            </div>
        </div>
    </section>
    <!-- ***************************************OFFCANVAS****************************************************** -->

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">Contact the owner:</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <div v-if="success" class="alert alert-success text-start" role="alert">
                Message sent successfully!
            </div>
        </div>
        <div class="offcanvas-body d-flex flex-column flex-wrap ">
            <div class="row">
                <form @submit.prevent="sendForm()" class="col-12 text-start" autocomplete="off">
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
                            name="email" id="email" placeholder="Email" v-model="email" required
                            @input="validateEmailInput()">
                        <!-- <p v-for="(error, index) in errors.email" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p> -->
                        <span id="emailFeedback" style="color: red;"></span>


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
    width: 100%;
    aspect-ratio: 1/1;
    margin-top: 3rem;
    padding: 1.5rem;
}

.offcanvas {

    background-color: #d4d3d3;

}


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

/* end animation */
@media only screen and (min-width: 1200px) {
   span{
    font-size: 21px;
   }  
   #services{
    font-size: 18px;
    white-space: nowrap;
    margin-right: 1.5rem;

   }
  
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
   span{
    font-size: 21px;
   }  
   #services{
    font-size: 18px;
    white-space: nowrap;

   }
  
}

@media only screen and (min-width: 769px) and (max-width: 992px)  {
    


    span{
    font-size: 19px;
   }  
   #services{
    font-size: 18px;
    white-space: nowrap;

   }

}

@media only screen and (min-width: 576px) and (max-width: 768px) {
    span{
    font-size: 17px;
   }  
   #services{
    font-size: 14px;
    white-space: nowrap;

   }
}

/* @media only screen and (max-width: 576px) {
    #result{
        top: 99%;
        left: 9%;
    }
  
} */
/* -->SOTTO I 410PX LA LISTA DEI SUGGERIMENTI è INGESTIBILE */
@media only screen and (min-width: 315px) and (max-width: 576px) {
    #services{
        font-size: 17px;
    white-space: nowrap;
    }
    .container{
        width: 100%;
    }
    i{
        font-size: 20px;
    }
}

</style>