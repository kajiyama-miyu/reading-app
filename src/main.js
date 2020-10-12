import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'

Vue.config.productionTip = false

Vue.prototype.$http = (url, opts) => fetch(url, opts)

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDOz88LpRgEIZWg2MF_eYvf53AqEcRbRVE",
    authDomain: "my-vue-app-91bb9.firebaseapp.com",
    databaseURL: "https://my-vue-app-91bb9.firebaseio.com",
    projectId: "my-vue-app-91bb9",
    storageBucket: "my-vue-app-91bb9.appspot.com",
    messagingSenderId: "796888082631",
    appId: "1:796888082631:web:aa22c47cafe0c912fe76e2",
    measurementId: "G-9NRKCWY80J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
