<template>
<div>
<el-table   :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    >
     <el-table-column prop="id" label="用户编号"  ></el-table-column>
      <el-table-column prop="username" label="昵称"  ></el-table-column>
      <el-table-column prop="rolename" label="手机号"  ></el-table-column>
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
 
</div>
</template>


<script>
import {mapActions,mapGetters} from  'vuex'
import{memberList,memberInfo,memberEdit} from '../../../utils/request'
export default {
    methods: {
        ...mapActions({
            requestMemberList:'member/MemberListActions'
        })
    },
    computed: {
      ...mapGetters({
          tableData:'member/memList'
      })  
    },
    mounted () {
        this.requestMemberList()
    }
}
</script>

<style>

</style>