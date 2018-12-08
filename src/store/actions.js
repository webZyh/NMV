import {
  RECEIVE_CART_LIST,
  INCREMENT_GOODS_COUNT,
  DECREMENT_GOODS_COUNT,
} from './mutation-type'
import axios from 'axios';
export default {
  //异步获取购物车列表
   getCartList({commit}){
     axios.get('/user/cartList').then((response) => {
       let res = response.data;
       //console.log(res);
       if (res.code == 0) {
         let cartList = res.data;
         commit(RECEIVE_CART_LIST,{cartList})     //commit 给mutations
       }
     });
  },

  //同步获取商品的数量count
  goodsCount({commit},{isAdd,goods}){
    if(isAdd){    //增加数量
      commit(INCREMENT_GOODS_COUNT,{goods});
    }else{    //减少数量
      commit(DECREMENT_GOODS_COUNT,{goods});
    }
  }
}
