<template>
    <div>
    <van-nav-bar
        :title="this.$route.name"
         right-text="去注册"
          @click-right="$router.push('/register')"
        />
     <div class="main">
        <van-form @submit="onSubmit">
        <van-field
          v-model="user.phone"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
        </van-form>
     </div>
    </div>
</template>

<script>
import {login} from '../utils/request'
import { Toast } from 'vant';
import {mapActions} from 'vuex'
export default {
    data () {
        return {
        user:{
            phone:'123123123',
            password: '123',
            nickname:''
        }
        }
    },
    methods: {
        ...mapActions({
             "requestUser":'userActions'
          }),
        onSubmit(){
          login(this.user).then(res=>{
          //  Toast(res.data.msg)
           this.requestUser(res.data.list)
           this.$router.push('/mine')
          })
        }
    }
}
</script>

<style scoped>

</style>