<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info='info' ref='add'></v-add>
    <v-list @edit='edit($event)'></v-list>
</div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'

export default {
    components: {
      vAdd,
      vList
    },
    data(){
        return{
           info:{
               isshow:false,
               title:'',
               isAdd:true,
           }
        }
    },
     methods: {
         add(){
             this.info={
               isshow:true,
               title:'添加商品',
               isAdd:true,
             }
         },
         edit(id){
             this.info={
               isshow:true,
               title:'修改商品信息',
               isAdd:false, 
             }
             this.info.id = id
             this.$refs.add.getdetail(id)
         }
     }
}
</script>

<style>
.el-button{
    margin-top: 15px;

}
</style>