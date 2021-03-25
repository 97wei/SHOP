<template>
  <div>
      <van-nav-bar
        :title="this.$route.name"
        left-arrow
         @click-left="onClickLeft"
        />
        <div class="cate">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item v-for='(item,index) in firstCate' :key="index" :title="item.catename" @click="changeCate(index)"/>
            </van-sidebar>
            <van-grid :column-num="3" style="">
                  <van-grid-item  v-for="value in secondCate" :key="value.id" :to="`/goodsList?fid=${value.id}`" >
                        <van-image :src=$preImg+value.img />
                        <p>{{value.catename}}</p>
                    </van-grid-item>
            </van-grid>
        </div>

 </div>
</template>

<script>
import {getCateTree} from '../utils/request'
export default {
   data(){
       return{
          activeKey: 0,
          firstCate:[],
          secondCate:[],
       }
  },
     methods: {
       onClickLeft(){
      this.$router.go(-1)
       },
       changeCate(index){
       this.secondCate =  this.firstCate[index].children
       },
        requestgetCateTree(){
             getCateTree().then(res=>{
            this.firstCate=res.data.list
            this.changeCate(0)
             })
        }
    },
    
      mounted () {
          this.requestgetCateTree()
      }
}
</script>

<style scoped>
.van-sidebar{
   float: left;
}
</style> 