<template>
<div>
 <van-nav-bar
        :title="this.$route.name"
        />
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item v-for="item in bannerImg" :key="item.id"><img :src="$preImg+item.img" alt=""></van-swipe-item>
   </van-swipe>
   <van-tabs v-model="active">
        <van-tab title="热门推荐">
            <van-card v-for='item in goodsList[0].content' :key='item.id'
                tag="hot"
                :price="item.price"
                desc="描述信息"
                :title="item.goodsname"
                :thumb="$preImg+item.img"
                :origin-price="item.market_price"
            >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o" @click="add(item.id)"></van-button>
            </template>
            </van-card>
        </van-tab>
        <van-tab title="发现新品">
            <van-card v-for='item in goodsList[1].content' :key='item.id'
                tag="new"
                :price="item.price"
                desc="描述信息"
                :title="item.goodsname"
                :thumb="$preImg+item.img"
                :origin-price="item.market_price"
            >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o" @click="add(item.id)"></van-button>
            </template>
            </van-card>
        </van-tab>
        <van-tab title="所有商品">
         <van-card v-for='item in goodsList[2].content' :key='item.id'
                tag="new"
                :price="item.price"
                desc="描述信息"
                :title="item.goodsname"
                :thumb="$preImg+item.img"
                :origin-price="item.market_price"
            >
            <template #footer>
              <van-button type="primary" size="small" icon="cart-o" @click="add(item.id)"></van-button>
            </template>
          </van-card>
        </van-tab>
    </van-tabs>   
</div>

</template>

<script>
import {getBanner,getIndexGoods,cartAdd} from '../utils/request'
import{mapGetters,mapActions} from 'vuex'
import { Toast } from 'vant'
export default {
    data(){
      return{
          bannerImg:[],
           active: 0,
           goodsList:[{content:[]},{content:[]},{content:[]}],
      }
    },
    methods: {
      //添加商品
      add(id){
          var data={
            num:1,
            goodsid:id,
            uid:this.user.uid
          }
          cartAdd(data).then(res=>{
           Toast.success(res.data.msg)
          })
        this.requestCart(this.user.uid)
      },
      //发起轮播图请求
        requestBanner(){
        getBanner().then(res=>{
        this.bannerImg = res.data.list
        })
        },
         requestGoodsList(){
         getIndexGoods().then(res=>{
           this.goodsList = res.data.list
        })
         },
         ...mapActions({
           requestCart:'cartListActions'
         })
    },
    computed: {
      ...mapGetters({
      "user":"user",
    })
    },
    mounted(){
    this.requestBanner()
    this.requestGoodsList()
  }
}
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    color: white;
    font-size: 20px;
    text-align: center;
  }
  img{
      width: 100%;
      height: 200px;
  };

.van-tabs__content{
  margin-bottom:100px;
}
.van-tab__pane{
  margin-bottom:100px;
}
</style>