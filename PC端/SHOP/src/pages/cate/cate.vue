<template>
<div>
   <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref='add'></v-add>
    <v-list @edit='edit($event)'></v-list>
</div>
 
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
    data(){
        return{
                info:{
                    isshow:false,
                    title:'',
                    isAdd:'true'
                }
        }
    },
 components: {
     vAdd,
     vList
 },
 methods: {
     add(){
         this.info={
                    isshow:true,
                    title:'添加商品分类',
                    isAdd:true
         }
     },
     edit(id){
            this.info={
            isshow:true,
            title:'编辑商品分类',
            isAdd:false
         }
       this.$refs.add.getDetail(id);
     }
 }
}
</script>

<style>
.el-button{
    margin-top: 15px;

}
</style>