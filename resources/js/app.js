/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue';
import Vuetify from 'vuetify';
import router from './router/router';

Vue.use(Vuetify);

import VueSimplemde from 'vue-simplemde';
import 'simplemde/dist/simplemde.min.css';

Vue.component('vue-simplemde', VueSimplemde);

import md from 'marked';
window.md = md;

import User from './helpers/user';
window.User = User;

import Exception from './helpers/exception';
window.Exception = Exception;
window.EventBus = new Vue();

// console.log('User has token: ', User.hasToken());
// console.log('User id: ', User.id());
// console.log('User name: ', User.name());

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('AppHome', require('./components/AppHome.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    vuetify : new Vuetify(),
    router: router,
});