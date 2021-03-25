import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const index = ()=>import('../page') 
const home = ()=>import('../page/home') 
const car = ()=>import('../page/car') 
const mine = ()=>import('../page/mine') 
const cate = ()=>import('../page/cate') 
const goodsList = ()=>import('../page/goodlist') 
const register = ()=>import('../page/register') 
const login = ()=>import('../page/login') 
const router= new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      redirect: '/home',
      children:[
        {
          path:'home',
          component:home,
          name:'主页',
        },
        {
          path:'car',
          component:car,
          name:'购物车',
        },
        {
          path:'mine',
          component:mine,
          name:'会员中心',
        },
        {
          path:'cate',
          component:cate,
          name:'分类',
        }
      ],
    },
    {
      path:'/goodsList',
      component:goodsList,
      name:'商品列表'
    },
    {
      path:'/register',
      component:register,
      name:'注册'
    },
    {
      path:'/login',
      component:login,
      name:'登录'
    },
  ]
})
router.beforeEach((to, from, next) => {
    if(to.path=='/mime' || to.path=='/cart'){
      const user = JSON.parse(sessionStorage.getItem('user'))
      if(!user){
        Toast.fail('请登录');
        router.push('/login')
        return
      }
    }
    next();
 })
 export default router