import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './components/Dashboard.vue'
//import NavBar from './includes/NavBar.vue'

// import Login from './views/Login.vue'
// import ApiService from './services/api.service';


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      //redirect: '',
      component: Dashboard,
      // children: [
      //   {
      //     path: 'dashboard',
      //     name: 'dashboard',
      //     component: Dashboard
      //   }
      // ]
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   meta: {
    //     public: true
    //   },
    //   component: Login
    // }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (!ApiService.isLogged() && !to.meta.public) {
//     next({
//       path: '/login'
//     });
//     return;
//   }
//   next();
// })

export default router;
