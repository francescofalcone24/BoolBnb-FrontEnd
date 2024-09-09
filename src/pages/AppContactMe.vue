<script>
import store from '../data/store';
import axios from "axios";
export default {

    name: 'AppContactMe',


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
            errors: {}


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
                    console.log(this.errors);
                } else {
                    // ripulisco i campi di input
                    this.name = '';
                    this.email = '';
                    this.text = '';
                }
                this.loading = false;
            });
        },
    },

    mounted() {


    }


}


</script>


<template>

    <section class="contact_me py-3">

        <div class="container text-center">


            <h2 class="text-uppercase">contact me</h2>
            <div v-if="success" class="alert alert-success text-start" role="alert">
                Messaggio inviato con successo!
            </div>
            <div class="row">
                <form @submit.prevent="sendForm()" class="col-12 text-start">
                    <div class="mb-3">
                        <input class=" border form-control" :class="{ 'is-invalid': errors.name }" type="text"
                            name="name" id="name" placeholder="Name" v-model="name">
                        <p v-for="(error, index) in errors.name" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p>
                    </div>
                    <div class="mb-3">
                        <input class="border form-control" :class="{ 'is-invalid': errors.email }" type="text"
                            name="email" id="email" placeholder="Email" v-model="email">
                        <p v-for="(error, index) in errors.email" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p>
                    </div>
                    <div class="mb-3">
                        <textarea class="border form-control" :class="{ 'is-invalid': errors.message }" name="text"
                            id="text" cols="30" rows="10" placeholder="Message" v-model="text"></textarea>
                        <p v-for="(error, index) in errors.text" :key="`message-error-${index}`"
                            class="invalid-feedback">
                            {{ error }}
                        </p>
                    </div>
                    <button class="btn btn-lg btn-primary text-white" type="submit" :disabled="loading">{{ loading ?
                        'Sending...' : 'Send'
                        }}</button>
                </form>
            </div>

        </div>

    </section>
</template>

<style scoped>
* {
    background-color: #a39696;

}
</style>