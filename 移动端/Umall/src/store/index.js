import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {state,mutations,getters} from './mutation'
import actions from './action'

const store = new Vuex.Store({
  // 存储数据
  state,
  // 操作状态数据
  mutations,
  // 对接组件中的操作方法
  actions,
  // 获取数据并返回给组件
  getters,
})

export default store
