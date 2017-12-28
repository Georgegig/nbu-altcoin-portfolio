'use strict';

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

//HELPERS

let usersTableContainsEmail = (email) => {
    let usersTable = JSON.parse(localStorage.getItem('usersTable'));
    if(!usersTable){
        return false;
    }
    for(var i = 0; i < usersTable.length; i++){
        if(usersTable[i].email == email){
            return true;
        }
    }
};

let validateEmailAndPassword = (email, password) => {
    let usersTable = JSON.parse(localStorage.getItem('usersTable'));
    if(!usersTable){
        return false;
    }
    for(var i = 0; i < usersTable.length; i++){
        if(usersTable[i].email == email && usersTable[i].password == password){
            return true;
        }
    }
};

let getUsername = (email, password) => {
    let usersTable = JSON.parse(localStorage.getItem('usersTable'));
    if(!usersTable){
        return "";
    }
    for(var i = 0; i < usersTable.length; i++){
        if(usersTable[i].email == email && usersTable[i].password == password){
            return usersTable[i].name;
        }
    }
;}

let userLoggedIn = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user){
        if(user.timeStamp && 
        ((new Date(user.timeStamp)).addDays(1)).getTime() > (new Date()).getTime()){
            return true;
        }
        else{
            localStorage.removeItem('user');
            return false;
        }
    }
    return false;
};

//COMPONENTS
let FooterComponent = Vue.component('footer-component',{
    template:`<v-footer class="blue darken-2">
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="white--text ml-3">
          Made with <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>`
});

let NavigationComponent = Vue.component('nav-component', {
    template: `
    <v-toolbar class="white">                  
        <span v-on:click="homePage()"><h1 style="cursor:pointer;" class="title" v-text="title"></h1></span>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <span><h1 v-text="loggedUser"></h1></span>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat v-show="userLoggedIn" @click.native="logout()">Log out</v-btn>
            <v-btn flat v-show="!userLoggedIn" @click.native="login()">Log in</v-btn>
            <v-btn flat v-show="!userLoggedIn" @click.native="register()">Register</v-btn>
        </v-toolbar-items>
    </v-toolbar>`,
    props:['title'],
    data(){
        return {
            userLoggedIn: false,
            loggedUser: ''
        }
    },
    mounted() {
        this.loginStatus();
        this.$eventHub.$on('loginChange', () => {
            this.loginStatus();
        });
    },
    methods: {
        homePage() {
            debugger;
            this.$router.push('/');
        },
        login(){
            this.$router.push('/login');
        },
        logout(){
            localStorage.removeItem('user');
            this.$eventHub.$emit('loginChange');
        },
        register(){
            this.$router.push('/register');
        },
        loginStatus(){
            this.userLoggedIn = userLoggedIn();
            if(this.userLoggedIn){
                this.loggedUser = JSON.parse(localStorage.getItem('user')).name;
            }
            else{
                this.loggedUser = '';
            }
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
    template:`
    <section>
        <v-parallax src="assets/hero.jpeg" height="300">
            <v-card class="elevation-0 blue">
                <v-card-title primary-title class="layout justify-center white--text">
                    <div class="headline text-xs-center">The best way to monitor your portfolio</div>
                </v-card-title>
                <v-card-text class="layout justify-center white--text">
                    Multifunctional and easy. 
                </v-card-text>
            </v-card>
        </v-parallax>
        <v-layout column wrap class="my-5" align-center>
            <v-flex xs12>
                <v-container grid-list-xl>
                    <v-layout row wrap align-center>
                        <v-flex xs12 md4>
                            <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-xs-center">Material Design</div>
                            </v-card-title>
                            <v-card-text>
                                Platform based on material design and flex box containers. Responsive and fully customizable. 
                            </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">Easy to use</div>
                            </v-card-title>
                            <v-card-text>
                                Get started under 5 minutes
                            </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-card class="elevation-0 transparent">
                            <v-card-text class="text-xs-center">
                                <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                            </v-card-text>
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-xs-center">Completely Open Sourced</div>
                            </v-card-title>
                            <v-card-text>
                                Developed using only open source frameworks. Code could be found on <a href="https://github.com/Georgegig/nbu-altcoin-portfolio">Altcoin Portfolio</a> 
                            </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-parallax src="assets/section.jpg" height="380">
            <v-layout column align-center justify-center>
                <v-layout column align-center justify-center class="white--text"> 
                    <v-dialog v-model="dialog" persistent max-width="600">
                        <v-btn color="blue" dark slot="activator">Get started right away</v-btn>
                        <login-component></login-component>
                    </v-dialog>
                </v-layout>
                </v-layout>
        </v-parallax>
    </section>
    `,
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
                <v-form v-model="valid" ref="form" v-show="!successfulLogin">
                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                    <v-text-field label="Password" v-model="password" :rules="passwordRules" required></v-text-field>
                    <v-btn @click="login()" :disabled="!valid" color="primary" white--text><b>LOG IN</b></v-btn>
                    <v-btn @click="clear()">clear</v-btn>
                </v-form>
                <v-alert color="success" icon="check_circle" value="true" v-show="successfulLogin">
                    Successfully logged in. Redirecting to portfolio page.
                </v-alert>
                <v-alert color="error" icon="warning" value="true" v-show="unsuccessfulLogin">
                    Specified email or password is wrong.
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>`,
    data () {
        return {
            valid: false,
            successfulLogin: false,
            unsuccessfulLogin: false,
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
                this.successfulLogin = false;
                this.unsuccessfulLogin = false;
              // Native form submission is not yet supported
                if(validateEmailAndPassword(this.email, this.password)){
                    let loginDate = new Date();
                    let user = {
                        name: getUsername(this.email, this.password),
                        email: this.email,
                        timeStamp:  loginDate.getFullYear() + '-' + (loginDate.getMonth() + 1) + '-' + loginDate.getDate()
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    this.successfulLogin = true;
                    setTimeout(() => {
                        this.$router.push('/portfolio');
                    }, 1500)
                    this.$eventHub.$emit('loginChange');
                }
                else{
                    this.unsuccessfulLogin = true;
                }
            }
          },
          clear() {
            this.$refs.form.reset()
            this.successfulLogin = false;
            this.unsuccessfulLogin = false;
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
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
                (v) => JSON.parse(localStorage.getItem('usersTable')) ? 
                     usersTableContainsEmail(v) ? 'E-mail already exists' : true : true
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
              let usersTable = JSON.parse(localStorage.getItem('usersTable'));
              if (!usersTable){
                  usersTable = [];
              }

              usersTable.push({
                  name: this.name,
                  email: this.email,
                  password: this.password
              })

              localStorage.setItem('usersTable', JSON.stringify(usersTable));
              this.$router.push('/login');
            }
          },
          clear() {
            this.$refs.form.reset()
          }
    }
};

let PortfolioView = {
    template: `<section>PORTFOLIOOOO</section>`,
    data() {
        return {

        }
    }
}

//ROUTING
const routes = [
    { path: '/', name: "GettingStarted", component: GettingStartedView },
    { path: '/login', name: "Login", component: LoginView },
    { path: '/register', name: "Register", component: RegisterView },
    { path: '/portfolio', name: "Portfolio", component: PortfolioView },
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
            title: 'nbu-altcoin-portfolio'
        }
    }
});