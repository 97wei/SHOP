import {specscount,specslist} from '../../utils/request'
const state={
    specslist:[],
    size:2,
    page:1,
    counts:0,
}  

const mutations={
    changeSpecsList(state,arr){
         state.specslist=arr
    },
    changeSpecsCount(state,num){
         state.counts=num
    },
    changePage(state,num){
        state.page=num
       
    }
}
const actions= {
    specsListActions(context){
        var  params = {
            size:context.state.size,
            page:context.state.page,
          }
          specslist(params).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page - 1;
                context.commit('changePage',p);
                context.dispatch("specsListActions")
              }
        context.commit('changeSpecsList',res.data.list)
        })
    },
    requestspecsCount(context){
        specscount().then(res=>{
            context.commit('changeSpecsCount',res.data.list[0].total)
        })
    },
    requestSpecsPageActions(context,page){
      context.commit('changePage',page)
    }
}

const getters={
    specslist(state){
        return state.specslist
    },
    specsCounts(state){
        return state.counts
    }
}
export default{
    state,mutations,actions,getters,
    namespaced: true
}