<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    :tree-props="{children: 'children'}">
     <el-table-column prop="pid" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"  ></el-table-column>
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
import{catedelete} from '../../../utils/request'
import { mapGetters,mapActions } from 'vuex'
import {successAlert} from '../../../utils/alert'

export default {
    methods: {
        ...mapActions({
            'requestCatelist':'cate/CatelistActions'
        }),
        //编辑
        edit(id){
            this.$emit('edit',id)
        },
        //删除
        del(id){
         catedelete({id}).then(res=>{
           successAlert(res.data.msg)
        this.requestCatelist()

         })
        }
    },
    computed: {
        ...mapGetters({
        "tableData":'cate/catelist'
        } )
    },
    mounted () {
        this.requestCatelist()
    }
}
</script>

<style>
img{
    width:100px;
    height: 100px;
}
</style>