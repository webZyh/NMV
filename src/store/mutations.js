import {
  RECEIVE_CART_LIST,
  INCREMENT_GOODS_COUNT,
  DECREMENT_GOODS_COUNT,
} from './mutation-type'


export default {
  [RECEIVE_CART_LIST](state,{cartList}){
    state.cartList = cartList;
  },

  //此处cartControl 控制商品数量有Bug  改变了当前数组，并没有更新数据库的数据
  [INCREMENT_GOODS_COUNT](state,{goods}){
    goods.productNum++;
  },
  [DECREMENT_GOODS_COUNT](state,{goods}){
    if(goods.productNum>0){
      goods.productNum--
      if(goods.productNum<=1){
        return false;
        //state.cartList.splice(state.cartList.indexOf(goods),1);
      }
    }
  },

  //登录后获取用户名
  updateUserInfo(state,userName){
    state.userName = userName;
  },
  //购物车商品数量
  updateCartCount(state,cartCount){
    state.cartCount += cartCount;
  }
}
