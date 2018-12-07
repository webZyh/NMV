import {
  INCREMENT_GOODS_COUNT,
  DECREMENT_GOODS_COUNT,
} from './mutation-type'

export default {
  //同步获取商品的数量count
  goodsCount({commit},{isAdd,goods}){
    if(isAdd){    //增加数量
      commit(INCREMENT_GOODS_COUNT,{goods});
    }else{    //减少数量
      commit(DECREMENT_GOODS_COUNT,{goods});
    }
  }
}
