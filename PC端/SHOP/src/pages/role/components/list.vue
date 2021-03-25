<template>
   <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    >
     <el-table-column prop="id" label="角色编号"  ></el-table-column>
      <el-table-column prop="rolename" label="角色名称"  ></el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {roleList,roleDel} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
export default { 
     methods: {
         ...mapActions({
           'requestroleList':'role/roleListActions'
         }),
        //  删除功能
        del(id){
           this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          roleDel({id}).then(res=>{
            successAlert(res.data.msg),
              this.requestroleList()
          })
        }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
          });          
        });
        },
         //修改角色信息
     edit(id){
       this.$emit('edit',id)
     },
     },
    
     computed: {
       ...mapGetters({
           'tableData':'role/RoleList'
       })  
     },
     mounted () {
         this.requestroleList()
     }
}
</script>

<style>

</style>