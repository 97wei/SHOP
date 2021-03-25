<template>
  <div>
      <el-dialog
    :title="info.title"
  :visible.sync="info.isshow"
  width="30%"
  >
 <el-form  label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名称" >
     <el-input v-model="form.rolename"></el-input>
  </el-form-item>
<el-form-item label="角色权限" >
    <el-tree
  :data="data"
  show-checkbox
  node-key="id"
  :default-checked-keys="defaultKey"
  :props="defaultProps" ref="tree">
</el-tree>
  </el-form-item>
<el-form-item label="状态" :label-width="formLabelWidth">
<el-switch
  v-model="form.status"
  active-color="blue"
  inactive-color="grey" :active-value="1" :inactive-value="2">
</el-switch>
</el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="confirm" v-if='info.isAdd'>确 定</el-button>
    <el-button type="primary" @click="update" v-else>修改</el-button>

  </span>
</el-dialog>
     
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import{addRole,onerole,updaterole} from '../../../utils/request'
import{successAlert} from '../../../utils/alert'
export default {
            props: ['info'],
 data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'title'
        },
      formLabelWidth:'100px',
      form:{
        rolename:'',
        menus:'',
        status:1,
      },
       defaultKey:[]
      }
    },
    computed: {
      ...mapGetters({
        "data":'menu/menuList',
      })
},
methods: {
  ...mapActions({
      "requestMenuList":"menu/menuListActions",
      'requestroleList':'role/roleListActions'
  }),
  // 添加角色中的取消按钮
  cancel(){
     this.info.isshow=false
     this.form={
        rolename:'',
        menus:'',
        status:1,
   }
      this.defaultKey=this.$refs.tree.setCheckedNodes([])
  },
  //添加角色 确认按钮
  confirm(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
     addRole(this.form).then(res=>{
          successAlert(res.data.list)
     });
      this.cancel();
      this.requestroleList()
  },
  //修改角色 确认按钮
  update(){
    this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    updaterole(this.form).then(res=>{
      successAlert(res.data.msg)
      this.cancel();
      this.requestroleList()
    })
  },
  //获取角色信息
    getonerole(id){
       onerole({id}).then(res=>{
         this.form=res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(this.form.menus);
       })
    }
},

mounted () {
  this.requestMenuList();
}
  };

</script>

<style>

</style>