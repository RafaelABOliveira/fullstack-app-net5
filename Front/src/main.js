import Vue from 'vue'
import App from './App.vue'
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue, SidebarPlugin, IconsPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue)
Vue.use(SidebarPlugin)
Vue.use(IconsPlugin)

import Loader from './includes/Loader.vue'
Vue.component('g-loader', Loader);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
