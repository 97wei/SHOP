<template>
  <div>
<el-dialog  :title=info.title :visible.sync="info.isshow">
<el-form  label-width="100px" class="demo-ruleForm">
    <el-form-item label="手机号" >
     <el-input  placeholder="请输入用户名" v-model="form.username" ></el-input>
  </el-form-item>
   <el-form-item label="昵称" >
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
export default {

}
</script>

<style>

</style>