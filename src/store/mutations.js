import {
  INCREMENT_GOODS_COUNT,
  DECREMENT_GOODS_COUNT,
} from './mutation-type'


export default {
  [INCREMENT_GOODS_COUNT](state,{goods}){
    goods.productNum++
  },
  [DECREMENT_GOODS_COUNT](state,{goods}){
    if(goods.productNum>0){
      goods.productNum--
      if(goods.productNum<1){
        state.cartList.splice(state.cartList.indexOf(goods));
      }
    }
  }
}
