<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal()">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap" style="margin-top: 20px;">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow"></div>
  </div>
</template>
<script>
  import "../../assets/css/login.css"
  import "../../assets/css/base.css"
  export default {
    props:{
      mdShow:{
        type: Boolean
      }
    },
    methods:{
      closeModal(){
        this.$emit('closeModal');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
