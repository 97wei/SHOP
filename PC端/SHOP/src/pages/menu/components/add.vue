<template>
 <div>
<el-dialog  :title=info.title :visible.sync="info.show">
<el-form  label-width="100px" class="demo-ruleForm">
  <el-form-item label="菜单名称" >
     <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="上级菜单">
    <el-select v-model="form.pid">
      <el-option label="--请选择--" disabled value=""></el-option>
      <el-option label="顶级菜单" :value="0"></el-option>
       <!-- 遍历菜单列表 -->
    <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="菜单类型" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.type" :label="1">目录</el-radio>
                <el-radio v-model="form.type" :label="2">菜单</el-radio>
            </template>
          </el-form-item>
     <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
            <el-select v-model="form.icon" >
              <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
            <el-select v-model="form.url" >
              <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
                     <el-form-item label="菜单状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
           </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button  v-if="info.isAdd" type="primary" @click="confrim" >确 定</el-button>
    <el-button v-else type="primary" @click="update">修 改</el-button>

  </span>
</el-dialog>
</div>

</template>

<script>
import {addMenu,oneMenu,updateMenu} from '../../../utils/request'
import { successAlert } from '../../../utils/alert';
import {mapGetters,mapActions} from 'vuex'

export default {
    props:['info'],
data(){
   return{
       formLabelWidth: '120px',
       form: {
          pid: 0,
          title: '',
          icon: '',
          type: 1,//类型 1目录 2菜单
          url: '',
          status: 1,//状态 1正常 2 禁用
        },
         dialogVisible: false,
        icons:['el-icon-setting','el-icon-help','el-icon-menu'],
        // 所有菜单地址
        urls:[
          'menu',
          'home',
          'role',
          'manager',
          'cate',
          'spec',
          'goods',
          'member',
          'banner',
          'seckill'
        ]
   } 
},
computed:{
    ...mapGetters({
      'list':"menu/menuList"
    })
  },
methods: {
     ...mapActions({
      "requestMenuList":"menu/menuListActions"
    }),
    cancel(){
            this.info.show=false
            this.form={
            pid: 0,
            title: '',
            icon: '',
            type: 1,//类型 1目录 2菜单
            url: '',
            status: 1,//状态 1正常 2 禁用
        }
    },
        confrim(){
            addMenu(this.form).then(res=>{
               successAlert(res.data.msg)
                this.cancel();
                    this.requestMenuList()
            })
        },
        update(){
            updateMenu(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel();
                this.requestMenuList()

            })
        },
          // 获取菜单详情方法
    getDetail(id){
      // 发起菜单详情
        oneMenu({id}).then(res=>{
          this.form =res.data.list;
          this.form.id = id;
        })
    },
    
    },
mounted(){
    // 组件挂载完成时,获取菜单列表数据
    this.requestMenuList()
  }
}
</script>

<style>

</style>