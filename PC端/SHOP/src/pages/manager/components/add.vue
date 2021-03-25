<template>
  <div>
<el-dialog  :title=info.title :visible.sync="info.isshow">
<el-form  label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属角色" >
     <el-select v-model="form.roleid" placeholder="请选择所属角色">
      <el-option lable="请选择" value='' disabled>--请选择--</el-option>
      <el-option :label="item.rolename" v-for="item in roledata" :value="item.id" :key='item.id'></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="用户名" >
     <el-input  placeholder="请输入用户名" v-model="form.username" ></el-input>
  </el-form-item>
      <el-form-item label="密码" >
      <el-input placeholder='请输入密码' v-model="form.password"></el-input>
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
    <el-button  v-if="info.isAdd" type="primary" @click="confrim">确 定</el-button>
    <el-button v-else type="primary" @click="update" >修 改</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import{mapActions,mapGetters} from 'vuex'
import{useredit,adduser}from'../../../utils/request'
import { successAlert } from '../../../utils/alert'
export default {
  props: ['info'],
  data(){
      return{
          formLabelWidth:'100px',
          form:{
              roleid:'',
              username:'',
              password:'',
              status:1,
          }
      }
  },
  methods: {
     ...mapActions({
         "requestroleList" : 'role/roleListActions',
        "requestManagerList":"managers/ManagerListActions",
        "requestCount":"managers/usercountsActions",
     }),
     //添加管理员中的取消按钮
     cancel(){
         this.info.isshow=false
         this.form={
              roleid:'',
              username:'',
              password:'',
              status:1,
         }
     },
     //添加管理员中的确认按钮
     confrim(){
     adduser(this.form).then(res=>{
         successAlert(res.data.msg)
         });
        this.cancel();
        this.requestManagerList();
        this.requestCount()
},
//添加管理员中的修改按钮
   update(){
     this.form.uid=this.info.uid
     useredit(this.form).then(res=>{
     successAlert(res.data.msg)
     this.requestManagerList();
     this.cancel()
     })
   }
  },
  computed: {
    ...mapGetters({
        "roledata" :'role/RoleList',
    })  
  },
  mounted () {
       this.requestroleList();
  }
}
</script>

<style>

</style>