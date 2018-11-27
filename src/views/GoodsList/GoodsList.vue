<template>
  <div class="">
    <Header/>
    <Nav>
      <span slot="goods">Goods</span>
    </Nav>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click.prevent.stop="sortPrice()">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':currentSelect=='all'}"
                     @click="currentSelect='all'">All</a></dd>
              <dd v-for="(price,index) in priceFilter" @click="setCurrentPrice(index)">
                <a href="javascript:void(0)"
                   :class="{'cur': currentSelect==index}">{{price.startPrice}}-{{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="`../static/img/${item.productImage}`"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click.prevent.stop="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="../../../static/loading/loading-spinning-bubbles.svg" alt="" v-show="loading">
                <div v-if="noData" style="font-size: 18px;">哥，这回真的没有了！</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayShow" @click="hideOverlay"></div>
    <Footer/>
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
    data() {
      return {
        goodsList: [],
        priceFilter: [
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
        filterBy: false,
        overlayShow: false,
        sortFlag: true,    //为true时，sort=1,升序排序
        page: 1,
        pageSize: 8,
        busy: true,    //禁止加载
        loading: false,   //loading 不显示
        priceLevel: 'all',    //价格等级区间
        noData: false,
      }
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList(flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceLevel,
        };
        axios.get('/goods/list', {
          params: param
        }).then((res) => {
          this.loading = false;
          let result = res.data;
          console.log(result);
          if (result.code === 0) {
            if (flag) { //flag为true时，表示下拉加载
              this.goodsList = this.goodsList.concat(result.data.list);
              if (result.data.count == 0) {
                this.busy = true;
                this.noData = true;
              } else {
                this.busy = false;
                this.noData = false;
              }
            } else {      //表示第一次加载
              this.busy = false;
              this.goodsList = result.data.list;
            }
            console.log(this.goodsList)
          }

        })
      },
      sortPrice() {      //升降排序
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      loadMore() {      //分页加载功能
        this.noData = false;
        this.loading = true;
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
          this.busy = false;
        }, 1000);
      },
      showFilterPop() {     //显示价格区间
        this.filterBy = true;
        this.overlayShow = true;
      },
      hideOverlay() {       //隐藏遮罩
        this.filterBy = false;
        this.overlayShow = false;
      },
      setCurrentPrice(index) {      //设置价格
        this.currentSelect = index;
        this.hideOverlay();
        //价格过滤
        this.priceLevel = index;
        this.page = 1;
        this.getGoodsList();
      },
      //加入购物车
      addCart(productId) {
        axios.post('/goods/addCart',{productId: productId}).then((res) => {
          console.log(res.data);
          if (res.data.code == 0) {
            alert("加入购物车成功！")
          } else {
            alert("失败" + res.data.msg);
          }
        })
      }
    },
    components: {
      Header,
      Footer,
      Nav
    }
  }
</script>

<style lang="stylus" rel="stylesheet/css" scoped>

</style>
