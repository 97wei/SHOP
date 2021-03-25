<template>
  <div>
    <van-nav-bar
        :title="this.$route.name"
        left-arrow
         @click-left="$router.go(-1)"
        />
         <van-card v-for='item in goodsList' :key='item.id'
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
        </div>
</template>

<script>
import {getGoods,cartAdd} from '../utils/request'
import{mapGetters,mapActions} from 'vuex'
import { Toast } from 'vant'
export default {
     data(){
         return{
            goodsList:[]
         }
     },
    methods: {
       requestGetGoods(){
        var fid = this.$route.query.fid
        getGoods(fid).then(res=>{
        this.goodsList =res.data.list
        })
       },
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
        ...mapActions({
           requestCart:'cartListActions'
         })
    },
       computed: {
      ...mapGetters({
      "user":"user",
    })
    },
     mounted () {
         this.requestGetGoods()
     }
}
</script>

<style>

</style>