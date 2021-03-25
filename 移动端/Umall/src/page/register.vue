<template>
    <div>
    <van-nav-bar
        :title="this.$route.name"
         right-text="去登录"
          @click-right="$router.push('/login')"
        />

     <div class="main">
        <van-form @submit="onSubmit">
          <van-field
          v-model="user.phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="user.nickname"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
        </van-form>
     </div>
    </div>
</template>

<script>
import {register} from '../utils/request'
import { Toast } from 'vant';

export default {
    data () {
        return {
        user:{
            phone:'',
            nickname: '',
            password: '',
        }
        }
    },
    methods: {
        onSubmit(){
          register(this.user).then(res=>{
           Toast(res.data.msg)
           this.$router.push('/login')
          })
        }
    }
}
</script>

<style scoped>

</style>