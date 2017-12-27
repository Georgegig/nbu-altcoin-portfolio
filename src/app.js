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
    <v-toolbar class="white" @click.native="homePage()">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>`,
    props:['title'],
    methods: {
        homePage() {
            this.$router.push('/');
        }
    }
});

let LoginComponent = Vue.component('login-component', {
    template:`
    <v-card>
    <v-card-title class="headline">Do you have an account?</v-card-title>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="register()">Register</v-btn>
        <v-btn color="blue darken-1" flat @click.native="login()">Log in</v-btn>
    </v-card-actions>
    </v-card>`,
    props:['dialog'],
    methods: {
        register(){
            this.$eventHub.$emit('closeLoginDialog');
            this.$router.push('/register');
        },
        login (){
            this.$eventHub.$emit('closeLoginDialog');
            this.$router.push('/login');
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
            <login-component></login-component>
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
    template: `
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12>   
                <v-form v-model="valid" ref="form">
                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                    <v-text-field label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
                    <v-btn @click="login()" :disabled="!valid" color="primary" white--text><b>LOG IN</b></v-btn>
                    <v-btn @click="clear()">clear</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>`,
    data () {
        return {
            valid: false,
            password: '',
            passwordRules: [
                (v) => !!v || 'Password is required'
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
        }
    },
    methods:{
        login() {
            debugger;
            if (this.$refs.form.validate()) {
              // Native form submission is not yet supported
              
            }
          },
          clear() {
            this.$refs.form.reset()
          }
    }
};

let RegisterView = {
    template: `
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12>   
                <v-form v-model="valid" ref="form">
                    <v-text-field label="Name" v-model="name" :rules="nameRules" :counter="20" required></v-text-field>
                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                    <v-text-field label="Password" v-model="password" :rules="passwordRules" :counter="8" required></v-text-field>
                    <v-text-field label="Repeat Password" v-model="repeatedPassword" :rules="repeatedPasswordRules" required></v-text-field>
                </v-form>
                <v-btn @click="register()" :disabled="!valid" color="primary" white--text><b>REGISTER</b></v-btn>
                <v-btn @click="clear()">clear</v-btn>
            </v-flex>
        </v-layout>
    </v-container>`,
    data () {
        return {
            valid: true,
            name: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v.length <= 20 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            passwordRules: [
                (v) => !!v || 'Password is requred',
                (v) => v.length >= 8 || "Password must be atleast 8 characters long",
                (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || `
                Password must must contain at least 1 lowercase alphabetical character, 
                1 uppercase alphabetical character, 
                1 numeric character 
                and 1 special character`
            ],
            repeatedPassword: '',
            repeatedPasswordRules: [
                (v) => !!v || 'Please repeat your password',
                (v) => this.password == v || 'Passwords do not match'
            ]
        }
    },
    methods:{
        register() {
            debugger;
            if (this.$refs.form.validate()) {
              // Native form submission is not yet supported
              
            }
          },
          clear() {
            this.$refs.form.reset()
          }
    }
};

//ROUTING
const routes = [
    { path: '/', name: "GettingStarted", component: GettingStartedView },
    { path: '/login', name: "Login", component: LoginView },
    { path: '/register', name: "Register", component: RegisterView },
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