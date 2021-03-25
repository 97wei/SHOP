<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    :tree-props="{children: 'children'}">
     <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"  ></el-table-column>
        <el-table-column  label="图片">
        <template v-slot="prop">
          <img :src="$preImg+prop.row.img" alt="">
        </template>
      </el-table-column>
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
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {bannerDelete} from  '../../../utils/request'
import {successAlert} from '../../../utils/alert'

export default {
    methods: {
        ...mapActions({
         requestbannerList:'banner/bannerListActions'
        }),
        del(id){
    this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        bannerDelete({id}).then(res=>{
            successAlert(res.data.msg)
              //管理员列表区请求
              this.requestbannerList()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      edit(id){
          this.$emit('edit',id)
      }
    },
    computed: {
      ...mapGetters({
          tableData:'banner/bannerlists'
      })  
    },
     mounted () {
         //轮播图列表请求
         this.requestbannerList()
     }
}
</script>

<style scoped>
img{
    width: 100%;
    height: 100%;
}
</style>