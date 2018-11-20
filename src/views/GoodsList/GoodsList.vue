<template>
  <div class="">
    <Header />
    <Nav>
      <span slot="goods">Goods</span>
    </Nav>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':currentSelect=='all'}" @click="currentSelect='all'">All</a></dd>
              <dd v-for="(price,index) in priceFilter"  @click="setCurrentPrice(index)">
                <a href="javascript:void(0)"  :class="{'cur': currentSelect==index}">{{price.startPrice}}-{{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="`../static/img/${item.imgPath}`"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.name}}</div>
                    <div class="price">{{item.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayShow" @click="hideOverlay"></div>
    <Footer />  
  </div>
</template>

<script>
  import '../../assets/css/base.css'
  import '../../assets/css/product.css'

  import Header from '../../components/Header/Header'
  import Footer from '../../components/Footer/Footer'
  import Nav from '../../components/Nav/Nav'

  import axios from 'axios'
  export default {
    data(){
      return {
        goodsList:[],
        priceFilter:[
          {
            startPrice: 0,
            endPrice: 100
          },
          {
            startPrice: 100,
            endPrice: 500
          },
          {
            startPrice: 500,
            endPrice: 1000
          },
          {
            startPrice: 1000,
            endPrice: 2000
          },
        ],
        currentSelect: 'all',  //当前选中的
        filterBy:false,
        overlayShow:false,
      }
    },
    mounted(){
      this.getGoodsList();
    },
    methods:{
      getGoodsList(){
        axios.get('/getGoodsList').then((res)=>{
          let result = res.data;
          if(result.code ===0){
            this.goodsList = result.data
            console.log(this.goodsList)
          }
          
        })
      },
      showFilterPop(){
        this.filterBy = true;
        this.overlayShow = true;
      },
      hideOverlay(){
        this.filterBy = false;
        this.overlayShow = false;
      },
      setCurrentPrice(index){
        this.currentSelect=index;
        this.hideOverlay();
      }
      
    },
    components:{
      Header,
      Footer,
      Nav
    }
  }
</script>

<style lang="stylus" rel="stylesheet/css" scoped>
  
</style>
