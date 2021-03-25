import{memberList,memberInfo,memberEdit} from '../../utils/request'
const state = {
  memList:[],//初始化数据
}

// 操作数据
const mutations = {
    changeMemberList(state,arr){
    state.memList = arr
  }
}

const actions = {
    MemberListActions(context){
    memberList({istree:true}).then(res=>{
      context.commit('changeMemberList',res.data.list);
    })
  }
}

const getters = {
    memList(state){
    return state.memList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}
