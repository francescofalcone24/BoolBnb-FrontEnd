import { reactive } from 'vue';


const iMieiDati = reactive({

    suite: 'ciao',
    country_range : {
        "lat" : 0,
        "lng" : 0
    },
    singleSuite: null,
    localHostUrl: 'http://localhost:8000',
    logo: '../assets/img/BoolBnB.png',
});

export default iMieiDati