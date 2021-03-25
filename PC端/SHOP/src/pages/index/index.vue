<template>
      <el-container>
        <el-aside width="200px">
  <el-col >
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" router>
      <!-- -------------首页-------------- -->
        <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <template v-for="item in user.menus">
        <!-- 有目录有儿子的情况下 -->
        <el-submenu :index="item.title" :key='item.id' v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
     <el-menu-item v-for="i in item.children" :key="i.id" :index="'/'+i.url">{{i.title}}</el-menu-item>
      </el-submenu>
      <!-- 只有目录的情况下 -->
        <el-menu-item  :index="'/'+item.url"  :key='item.id' v-else>
          {{item.title}}
      </el-menu-item>
      </template>
    </el-menu>
  </el-col>
</el-aside>
        <el-container>
        <el-header>
          {{user.username}}
          <i @click="logout" class='el-icon-setting'></i></el-header>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
            </el-breadcrumb>
                      <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
        </el-container>
        </el-container>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
methods: {
    logout(){
        //  this.requestUser(null);
        this.$router.push('/login')
    },
    ...mapActions({
      "requestuser":"userActions"
    })
},
computed: {
    ...mapGetters({
      "user":'user'
    })
},

}
</script>
 
<style scoped>
.el-aside{
  height: 100vh;
  background: #20222A;
  color:white;
}
.el-header{
  background: #B3C0D1;
  line-height: 60px;
  text-align:right;
}
.el-icon-setting{
    cursor: pointer;
}
</style>