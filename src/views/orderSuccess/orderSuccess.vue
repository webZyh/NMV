<template>
  <div class="container">
    <Header></Header>
    <Nav>
      <span slot="msg">orderSuccess</span>
    </Nav>
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li class="cur"><span>Make</span> payment</li>
        <li class="cur"><span>Order</span> confirmation</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="/static/img/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>Congratulations! <br>Your order is under processing!</h3>
        <p>
          <span>Order ID：{{orderId}}</span>
          <span>Order total：{{orderTotal}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link to="/cart" class="btn btn--m">Cart List</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link to="/" class="btn btn--m">Goods List</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header/Header.vue'
  import Footer from '../../components/Footer/Footer.vue'
  import Nav from '../../components/Nav/Nav'
  import axios from 'axios'
    export default {
      data(){
        return{
          orderId:'',
          orderTotal:0
        }
      },
      mounted(){
        let orderId = this.$route.query.orderId;
        this.orderId = orderId;
        if (!orderId){
          return;
        }
        axios.get('/user/orderDetail',{
          params:{
            orderId:orderId
          }
        }).then((result)=>{
          let res = result.data;
          if (res.code == 0){
            this.orderTotal = res.data.orderTotal;
          }
        })
      },
      components: {
        Header,
        Footer,
        Nav,
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/css/base.css';
  @import '../../assets/css/checkout.css';
</style>
