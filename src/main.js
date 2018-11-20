// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './mock/mockServer'    //加载mockServer即可
Vue.config.productionTip = false


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
  render: h=>h(App)
  /*render:function(h){
  	return h(App);
  }*/
}).$mount("#app");
