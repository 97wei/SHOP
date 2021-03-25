import {goodsList,goodsCount} from '../../utils/request'
const state={
    size:2,
    page:1,
    goodsList:[],
    count:1,
} 
const mutations={
    changeGoodsList(state,arr){
      state.goodsList=arr
    },
    changeGoodsCount(state,num){
        state.count=num
    },
    changePage(state,e){
        state.page=e
    }
}
const actions={
    GoodListActions(context){
        var form = {
            size:context.state.size,
            page:context.state.page,
        }
        goodsList(form).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page -1;
                context.commit('changePage',p);
                context.dispatch('GoodListActions');
                return;
            }
           context.commit('changeGoodsList',res.data.list)
        })
    },
    GoodsCountActions(context){
        goodsCount().then(res=>{
            context.commit('changeGoodsCount',res.data.list[0].total)
        })
    },
    GoodsPageActions(context,e){
        context.commit('changePage',e)
    }
}
const getters={
    goodsList(){
        return state.goodsList
    },
    goodsCount(){
        return state.count
    }
}
export default{
    state,mutations,actions,getters,
    namespaced: true
}