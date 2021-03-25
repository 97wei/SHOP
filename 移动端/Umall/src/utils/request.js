import axios from 'axios';
import { Toast } from 'vant';
import qs from 'qs'
// 配置基础路径
const baseUrl = "";


// 设置请求头
axios.interceptors.request.use(config=>{
  console.group("本次请求地址为:"+config.url)
  // 设置请求头
  const user = JSON.parse(sessionStorage.getItem('user'))
  if(user){
    // 设置请求头
    config.headers.authorization = user.token;
  }
  return config
})

// 设置响应拦截
axios.interceptors.response.use(res=>{
    console.group('本次响应路径为:'+res.config.url)
    if(res.data.code !== 200){
      // 提示错误信息
      Toast.fail(res.data.msg);
      return;
    }
    console.log(res);
    return res;
  })
  //获取轮播图
  export const getBanner=()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/getbanner',
      })
  }
    //获取商品信息
    export const getIndexGoods=()=>{
        return axios({
            method:'get',
            url:baseUrl+'/api/getindexgoods',
          })
      }
    //购物车列表
    export const cartList=(params)=>{
        return axios({
            method:'get',
            url:baseUrl+'/api/cartlist',
            params
          })
      }
          //分类树形列表
    export const getCateTree=()=>{
      return axios({
          method:'get',
          url:baseUrl+'/api/getcatetree',
        })
    }

    //分类列表
    export const getGoods=(params)=>{
      return axios({
          method:'get',
          url:baseUrl+'/api/getgoods',
          params
        })
    }
    //购物车添加列表
    export const cartAdd=(data)=>{
      return axios({
          method:'post',
          url:baseUrl+'/api/cartadd',
          data:qs.stringify(data)
        })
    }
//会员注册
export const register = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/register',
    data:qs.stringify(data)
  })
}
//会员登陆
export const login = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/login',
    data:qs.stringify(data)
  })
}

//删除购物车

export const cartDelete = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/cartdelete',
    data:qs.stringify(data)
  })
}
