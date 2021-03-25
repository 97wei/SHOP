<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-add :info='info' ref='add'></v-add>
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from './components/add.vue'
import vList from './components/list.vue'

export default {
    data(){
        return{
           info:{
               isshow:false,
               title:'',
               isAdd:true
           }
        }
    },
 components: {
     vAdd,
     vList
 },
methods: {
    add(){
         this.info.isshow=true,
         this.info.title='添加活动',
         this.info.isAdd=true
  
    },
    edit(id){
        this.info.isshow=true,
         this.info.title='编辑活动',
         this.info.isAdd=false
        this.$refs.add.getonerole(id)
    }
}
}
</script>

<style>
.el-button{
    margin-top: 15px;
}
</style>