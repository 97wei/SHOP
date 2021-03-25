import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {state,mutations,getters} from './mutation'
import actions from './actions'
import  menu from './module/menu'
import  role from './module/roleList'
import  managers from './module/managers'
import  cate from './module/cate'
import  specs from './module/specs'
import goods from './module/goods'
import member from './module/member'
import banner from './module/banner'
const store = new Vuex.Store({
  // 存储数据
  state,
  // 操作状态数据
  mutations,
  // 对接组件中的操作方法
  actions,
  // 获取数据并返回给组件
  getters,
  //存放子模块
  modules:{   
    menu,
    role,
    managers,
    cate,
    specs,
    goods,
    member,
    banner
    },

})

export default store
