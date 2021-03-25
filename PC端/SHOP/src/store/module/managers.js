import {userCount,userList} from '../../utils/request'
const state= {
    usercounts:0,
    size:2,
    page:1,
    managerList:[]
}

const mutations= { 
    changeManagerList(state,arr){
     return state.managerList = arr
    },
    channgeUserCounts(state,num){
        return state.usercounts = num
    }, 
    changePage(state,page){
        return state.page = page
    }
   
}

const actions= {
    ManagerListActions(context){
        var params={
            size:context.state.size,
            page:context.state.page

        }
          userList(params).then(res=>{
          if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
          var p = context.state.page -1;
          context.commit('changePage',p);
          context.dispatch('ManagerListActions');
          return;
      }
                context.commit('changeManagerList',res.data.list)
        })
    },
    usercountsActions(context){
        userCount().then(res=>{
            context.commit('channgeUserCounts',res.data.list[0].total)
        })
    },
    requestPageActions(context,page){
      context.commit('changePage',page)
    }
}
const getters= {
    managerList(state){
        return state.managerList
    },
    usercounts(state){
        return state.usercounts
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}