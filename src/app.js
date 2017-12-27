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

let LoginComponent = Vue.component('login-component', {
    template:`
    <v-card>
    <v-card-title class="headline">Use Google's location service?</v-card-title>
    <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="closeDialog()">Disagree</v-btn>
        <v-btn color="green darken-1" flat @click.native="closeDialog()">Agree</v-btn>
    </v-card-actions>
    </v-card>`,
    props:['dialog'],
    data () {
        return {
            mutableDialog: this.dialog
        }
    },
    methods: {
        closeDialog(){
            this.mutableDialog = false;
            this.$eventHub.$emit('closeLoginDialog');
        }
    }
});

//VIEWS
let GettingStartedView = {
    template:`<section>
    <v-parallax src="assets/hero.jpeg" height="600">
      <v-layout column align-center justify-center class="white--text">
        <img src="assets/vuetify.png" alt="Vuetify.js" height="200">
        <h1 class="white--text mb-2 display-1 text-xs-center">Parallax Template</h1>
        <div class="subheading mb-3 text-xs-center">Powered by Vuetify</div>
        <v-dialog v-model="dialog" persistent max-width="600">
            <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
            <login-component v-bind:dialog="dialog"></login-component>
        </v-dialog>
        </v-layout>
        </v-parallax>
    </section>`,
    data () {
        return {
            dialog: false
        }
    },
    mounted () {
        this.$eventHub.$on('closeLoginDialog', () => {
            this.dialog = false;
        });
    },
};

let LoginView = {
    template: `<v-form v-model="valid">
        <v-text-field label="Name" v-model="name" :rules="nameRules" :counter="20" required></v-text-field>
        <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
    </v-form>`,
    data () {
        return {
            valid: false,
            name: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v.length <= 20 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    }
};

//ROUTING
const routes = [
    { path: '/', name: "GettingStarted", component: GettingStartedView },
    { path: '/login', name: "Login", component: LoginView },
    { path: '*', redirect: '/'}
];

const router = new VueRouter({
    routes
});

Vue.prototype.$eventHub = new Vue(); // Global event bus

let vm = new Vue({
    router,
    el: '#portoflio-app',
    data () {
        return {
            title: 'Your Logo'
        }
    }
});