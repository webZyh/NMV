// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);

//import './mock/mockServer'    //加载mockServer即可
Vue.config.productionTip = false

//全局过滤器
import {currency} from "./util/currency";

Vue.filter("currency",currency);

//veu-lazyload
import VueLazyload from 'vue-lazyload'
import loading from '../static/loading/loading-bars.svg'
Vue.use(VueLazyload,{
	loading
})
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  /*components: { App },
  template: '<App/>'*/
  render: h=>h(App),
  /*render:function(h){
  	return h(App);
  }*/
  store
}).$mount("#app");
