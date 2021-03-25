<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info='info'></v-add>
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
               title:'添加管理员',
               isAdd:true,
             }
         },
         edit(id){
             this.info={
               isshow:true,
               title:'修改管理员',
               isAdd:false, 
             }
             this.info.uid = id
         }
     }
}
</script>

<style>
.el-button{
    margin-top: 15px;

}
</style>