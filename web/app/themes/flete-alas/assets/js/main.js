// Vue utils 
import 'vue2-animate/dist/vue2-animate.min.css';

// Vue Components
import Request from './components/Request.vue';
Vue.component('request', Request);
import FindMyBooking from './components/FindMyBooking.vue';
Vue.component('findmybooking', FindMyBooking);
import CalculateBooking from './components/CalculateBooking.vue';
Vue.component('calculatebooking', CalculateBooking);

const veeConfig = {
    delay: 333,
    events: 'blur|submit',
}

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, veeConfig);

// Vue instance
import Vue from 'vue';
window.Vue = Vue;
const MainApp = new Vue({
    el: '#MainApp'
})

// require('./utils')
// require('./header')