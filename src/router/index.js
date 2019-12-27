import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      // component: ()=>import("@/views/login")
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/index',
      name: "index",
      redirect: "/index/smartgym",
      // component: ()=>import("@/views/smartgym")
      component: resolve => require(['@/views/index'], resolve),
      children: [{
        path: '/index/smartgym',
        name: "smartgym",
        // component: ()=>import("@/views/smartgym")
        component: resolve => require(['@/views/smartgym'], resolve),
      },
      // {
      //   path: '/index/verticalgym',
      //   name: "verticalgym",
      //   // component: ()=>import("@/views/test")
      //   component: resolve => require(['@/views/gym'], resolve),
      // },
      {
        path: '/index/test',
        name: "test",
        // component: ()=>import("@/views/test")
        component: resolve => require(['@/views/test'], resolve),
      }]
    }
  ]
})
