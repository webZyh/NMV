<template>
  <div class="cart-control">
    <div class="reduce cart-btn">-</div>
    <div class="count">{{cartList.productNum}}</div>
    <div class="add cart-btn">+</div>
  </div>
</template>
<script>
  export default {
    props:{
      cartList:{
        type:Array
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
