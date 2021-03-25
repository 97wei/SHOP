<template>
  <div class="container">
      <van-nav-bar
        :title="this.$route.name"
        left-arrow
         @click-left="$router.go(-1)"
        />
        <div class="bg">
        <van-image
            round
            width="10rem"
            height="10rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <p>{{user.nickname}}</p>
      </div>
      <van-button type="danger" @click="$router.push('/login')">安全退出</van-button>
      <div class="select">
        <van-cell is-link >我的收藏</van-cell>
        <van-cell is-link >我的评论</van-cell>
        <van-cell is-link >我的订单</van-cell>
      </div>
        </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
   methods: {

   },
   computed: {
       ...mapGetters({
           user :'user'
       })
   },
 
}
</script>
<style scoped>
.container{
    text-align: center;
}
.bg{
    position: relative;
    width: 100%;
    height: 200px;
    background-color: rgba(220, 220, 220, 0.5);
    text-align: center;

}
.van-image{
       position: absolute;
       left: 50%;
       top:50%;
      transform: translate(-50%,-50%);
}
.van-button{
    width: 95%;
    margin-top: 20px;
}
.select{
    margin-top: 20px;
    padding: 10px;
}
.bg>p{
       position: absolute;
       left: 50%;
       top:86%;
      transform: translate(-50%,-50%);
}
</style>