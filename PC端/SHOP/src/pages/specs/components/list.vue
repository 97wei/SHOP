<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    :tree-props="{children: 'children'}">
     <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"  ></el-table-column>
      <el-table-column  label="规格属性" >
         <template v-slot="prop">
          <el-tag  v-for="(item,index) in prop.row.attrs" :key="index" >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
           </template>
      </el-table-column>
  </el-table>
  <el-pagination
   background
   layout="prev, pager, next"
    :page-size="2"
    @current-change='Cpage'
   :total="counts">
  </el-pagination> 
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { successAlert } from '../../../utils/alert'
import{specsDelete}from'../../../utils/request'
export default {
data(){
    return{

    }
},
methods: {
   ...mapActions({
       requestspecsList:'specs/specsListActions',
       requestspecsCount:'specs/requestspecsCount',
       requestspecsPage:'specs/requestSpecsPageActions'
   }),
   Cpage(e){
      this.requestspecsPage(e)
      this.requestspecsList()
   },
   edit(id){
       this.$emit('edit',id)
   },
   del(id){
  specsDelete({id}).then(res=>{
  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          successAlert(res.data.msg)
          this.requestspecsList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  })
   }
},
computed: {
    ...mapGetters({
        'tableData':'specs/specslist',
        'counts':'specs/specsCounts'
    })
},
mounted () {
    this.requestspecsList()
    this.requestspecsCount()
}
}
</script>

<style>

</style>