import {bannerList} from '../../utils/request'

const state={
  bannerlist:[],
}
const mutations= {
    changeBannerList(state,arr){
        return state.bannerlist=arr
    }
}
const actions={
    bannerListActions(context){
        bannerList().then(res=>{
          context.commit('changeBannerList',res.data.list)
        })
    }
}
const getters={
    bannerlists(){
        return state.bannerlist
    }
}
export default{
    state,actions,mutations,getters,
    namespaced: true
}