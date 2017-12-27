'use strict';

//COMPONENTS
let FooterComponent = Vue.component('footer-component',{
    template:`<v-footer class="blue darken-2">
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="white--text ml-3">
          Made with
          <v-icon class="red--text">favorite</v-icon>
          by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
          and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>`
});

let NavigationComponent = Vue.component('nav-component', {
    template: `
    <v-toolbar class="white">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>`,
    props:['title']
});

//VIEWS
let EntryView = {
    template:`<section>
    <v-parallax src="assets/hero.jpeg" height="600">
      <v-layout
        column
        align-center
        justify-center
        class="white--text"
      >
        <img src="assets/vuetify.png" alt="Vuetify.js" height="200">
        <h1 class="white--text mb-2 display-1 text-xs-center">Parallax Template</h1>
        <div class="subheading mb-3 text-xs-center">Powered by Vuetify</div>
        <v-btn
          class="blue lighten-2 mt-5"
          dark
          large
          href="/pre-made-themes"
        >
          Get Started
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>`
};

let LoginView = {
    template: '<div>LOGIN PAGE</div>'
};

//ROUTING
const routes = [
    { path: '/', name: "GettingStarted", component: EntryView },
    { path: '/login', name: "Login", component: LoginView }
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
    el: '#portoflio-app',
    data () {
        return {
            title: 'Your Logo'
        }
    }
});