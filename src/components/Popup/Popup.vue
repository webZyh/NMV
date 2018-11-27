<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition md-show">
      <div class="md-modal-inner">
        <div class="md-top">
          <slot name="title"></slot>
          <button class="md-close">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="content"></slot>
          </div>
          <div class="login-wrap" style="margin-top: 20px;">
            <slot name="btn"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginShow"></div>
  </div>
</template>
<script>
  import "../../assets/css/login.css"
  import "../../assets/css/base.css"
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
