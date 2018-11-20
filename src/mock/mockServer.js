/*
* 使用mockjs提供mock数据接口
* */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/getGoodsList',{code:0,data: data.data});   //需要发ajax请求方可访问数据


//export default  不需要向外暴露任何数据，只需要执行一遍
