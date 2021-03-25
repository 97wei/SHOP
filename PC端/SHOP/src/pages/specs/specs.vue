<template>
    <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-add :info='info' ref='add'></v-add>
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'

export default {
  data () {
    return {
      info:{
        title:'',
        isshow:false,
        isAdd:true,
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
              titile:'添加商品规格',
              isshow:true,
              isAdd:true,
            }
      },
      edit(id){
            this.info={
              titile:'修改商品规格',
              isshow:true,
              isAdd:false,
            }
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