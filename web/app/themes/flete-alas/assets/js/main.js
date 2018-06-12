// Vue utils 
import 'vue2-animate/dist/vue2-animate.min.css';

// Vue Components
import Request from './components/Request.vue';
Vue.component('request', Request);

// Vue instance
import Vue from 'vue';
window.Vue = Vue;
const MainApp = new Vue({
    el: '#MainApp'
})


// require('./utils')
// require('./header')