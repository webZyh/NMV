<template>
  <div class="cart-control">
    <div class="reduce cart-btn" @click="updateCount(false)">-</div>
    <div class="count">{{goods.productNum}}</div>
    <div class="add cart-btn" @click="updateCount(true)">+</div>
  </div>
</template>
<script>

  import axios from 'axios'
  export default {
    props:{
      goods:{
        type: Object
      }
    },
    methods:{
      updateCount(isAdd){
        const {goods} = this;
        //this.$store.dispatch('goodsCount',{isAdd,goods});   暂时不用vuex
        if(isAdd){    //增加
          goods.productNum++
        }else{      //减少
          if(goods.productNum>0){
            goods.productNum--
            if(goods.productNum=1){
              return false;
            }
          }
        }

        let productId = goods.productId;
        let productNum = goods.productNum;
        axios.post('/user/editCartShopCount',{'productId':productId,'productNum':productNum}).then((response)=>{
          let res = response.data;
          if(res.code == 0){

          }
        })

      }
    }
  }
</script>
<style ref="stylesheet/stylus" lang="stylus" scoped>
  .cart-control
    font-size 0
    .cart-btn
      display inline-block
      font-size 24px
      line-height 24px;
      cursor pointer
      padding 10px
    .count
      display inline-block
      font-size 16px
      text-align center
</style>
