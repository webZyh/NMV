import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList/GoodsList'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    },
    {
      path: '/cart',
      component:  resolve => require(['../views/ShopCart/ShopCart.vue'],resolve)
    },
    {
      path: '/address',
      component:  resolve => require(['../views/Address/Address.vue'],resolve)
    },
    {
      path:'/orderConfirm',
      component: resolve => require(['../views/OrderConfirm/OrderConfirm'],resolve)
    },
    {
      path:'/orderSuccess',
      component: resolve => require(['../views/orderSuccess/orderSuccess'],resolve)
    }
  ]
})
