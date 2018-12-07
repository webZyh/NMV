<template>
  <div class="cart-control">
    <div class="reduce cart-btn" @click="updateCount(false)">-</div>
    <div class="count">{{goods.productNum}}</div>
    <div class="add cart-btn" @click="updateCount(true)">+</div>
  </div>
</template>
<script>
  export default {
    props:{
      goods:{
        type: Object
      }
    },
    methods:{
      updateCount(isAdd){
        const {goods} = this;

        this.$store.dispatch('goodsCount',{isAdd,goods});
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
