<template>
<div>
<el-table   :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    >
     <el-table-column prop="id" label="用户编号"  ></el-table-column>
      <el-table-column prop="username" label="用户名称"  ></el-table-column>
      <el-table-column prop="rolename" label="所属角色"  ></el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.uid)">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="2"
        @current-change='cPage'
        :total="count">
      </el-pagination>
</div>
     
  
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import {userdelete, userCount} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
export default {
    data(){
        return{
        }
    },
  methods: {
    ...mapActions({
        "requestManagerList":"managers/ManagerListActions",
        "requestCount":"managers/usercountsActions",
        "requestPage":'managers/requestPageActions'
    }),
    cPage(page){
         this.requestPage(page)
         this.requestManagerList()
    },
    //编辑
    edit(uid){
          this.$emit('edit',uid)
        },
    // 删除
    del(uid){
       this.$confirm('此操作将永久删除该会员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        userdelete({uid}).then(res=>{
            successAlert(res.data.msg)
              //管理员列表区请求
              this.requestManagerList()
              //管理员总数请求
             this.requestCount()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
  
  computed: {
      ...mapGetters({
          "tableData":"managers/managerList",
          "count":"managers/usercounts"
      }) 
  },
  mounted(){
      //管理员列表区请求
    this.requestManagerList()
    //管理员总数请求
    this.requestCount()
  }
}
</script>

<style>

</style>