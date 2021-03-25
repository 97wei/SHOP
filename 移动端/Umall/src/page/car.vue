<template>
  <div class="cart">
    <!-- 标签页 navBar -->
    <van-nav-bar left-arrow @click-left="$router.go(-1)"  title="购物车"/>
    <div class="container">
        <template v-if="cartList !== null">
            <van-card
              v-for="item in cartList"
              :key="item.id"
              :price="item.price"
              :title="item.goodsname"
              :thumb="$preImg+item.img"
            >
              <template #footer>
                <van-stepper v-model="item.num" theme="round" button-size="22" disable-input />
                <van-button type="primary" size="mini" @click="del(item.id)">删除</van-button>
              </template>
            </van-card>
            <van-submit-bar :price="sumAcount" button-text="提交订单"  />
        </template>
        <van-empty
            v-else
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="购物车空空如也!!!"
          />

    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import { getCart, cartDelete } from '../utils/request'
export default {
  data(){
    return {
   
    }
  },
  computed:{
    ...mapGetters({
      "user":"user",
      "cartList":"cartList",
      "sumAcount":"sumAcount"
    })
  },
  methods:{
    ...mapActions({
      "requestCart":"cartListActions"
    }),
    del(id){
      // 发起删除购物车请求
      cartDelete({id}).then(res=>{
        // 1.提示删除成功
        this.$toast.success('删除商品成功')
        // 2.发起更新购物车列表
        this.requestCart(this.user.uid)
      })
    }
  },
  mounted(){
    if(this.user){
      this.requestCart(this.user.uid)
    }

  }
}
</script>

<style scoped>
.cart{
  margin-bottom:100px;
}
.van-submit-bar{
  margin-bottom: 50px;
}
 .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>
