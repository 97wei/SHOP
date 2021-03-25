<template>
  <div class="bg">
      <div class='loginFrom'>
        <form action="">
          <h2>登录</h2>
          <el-input v-model='user.username' placeholder="请输入用户名"></el-input>
          <el-input v-model='user.password' placeholder="请输入密码"  show-password></el-input>
          <el-row>
          <el-button  type="primary" @click="login">登录</el-button>
         </el-row>
          </form>
      </div>
  </div>
</template>

<script>
import {warningAlert,successAlert} from'../../utils/alert'
import{userLogin} from '../../utils/request'
import {mapActions} from 'vuex'

export default {
  data(){
    return{
      user:{
          username:'',
          password:'',
      }

    }
  },
  methods: {
     ...mapActions({
      "requestUser":"userActions"
    }),
    login(){
      if(this.user.username!=='' && this.user.password!==''){
          userLogin(this.user).then(res=>{
          successAlert(res.data.msg)
           this.requestUser(res.data.list)
          this.$router.push('/')
           })
      }else{
          warningAlert('账号或者密码不能为空')
      }
    }
  }
}
</script>

<style scoped>
.bg{
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to top right,rgb(86,53,68), rgb(47,61,95));
}
.loginFrom{
  width: 500px;
  height: 300px;
  background: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
form{
   margin:20px 60px 40px ;
}
form>h2{
  text-align: center;
}
.el-input{
  margin-top:20px
}
.el-button{
  width:100%;
   margin-top:20px
}
</style>