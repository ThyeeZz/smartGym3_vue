// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {succeed,failed,warning,jes,decrypt} from "@/tools"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import httpRequest from "@/utils/httpRequest"

import tokenRequest from "@/utils/tokenRequest"


require('./tools/mock')

Vue.use(ElementUI);

Vue.prototype.httpRequest = httpRequest

Vue.prototype.tokenRequest = tokenRequest

Vue.prototype.$jes = jes
Vue.prototype.$decrypt = decrypt

Vue.prototype.succeed = succeed
Vue.prototype.failed = failed
Vue.prototype.warning = warning


Vue.config.productionTip = false

const store = {
  debug: true,
  state: {
    logoSrc: ""
  },
  getLogo (newValue) {
    if (this.debug)
    this.state.logoSrc = newValue
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data(){
    return {
      store
    }
  },
  router,
   render: h => h(App)
})
