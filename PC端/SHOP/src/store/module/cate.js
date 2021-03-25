import {getCate} from '../../utils/request'
const state= {
     catelist:[],
}

const mutations= { 
    changeCatelist(state,arr){
        return state.catelist=arr
    }
   
}

const actions= {
    CatelistActions(context){
        getCate({istree:true}).then(res=>{
            context.commit('changeCatelist',res.data.list)
        })
    },

}
const getters= {
  catelist(){
      return state.catelist
  }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}