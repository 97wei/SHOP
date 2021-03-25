<template>
  <div>
<el-dialog  :title='info.title' :visible.sync="info.isshow">
    <el-form :model="form" :label-width="formLabelWidth">
            <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="form.pid" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <el-option label="顶级分类" :value="0"></el-option>
     <el-option :label="item.catename" v-for="item in catelist" :value="item.id" :key='item.id'></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="分类名称" >
     <el-input  placeholder="请输入分类名称" v-model="form.catename" ></el-input>
  </el-form-item>
      <el-form-item label="图片" >
     <el-upload
          class="avatar-uploader"
          action="#"
          :on-change='changeImg'
          :show-file-list="false"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

  </el-form-item>
     <el-form-item label="状态" :label-width="formLabelWidth">
         <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey" :active-value="1" :inactive-value="2">
        </el-switch>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button  v-if="info.isAdd" type="primary" @click="confrim">确 定</el-button>
    <el-button v-else type="primary" @click='update()'>修 改</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>

import {cateadd,getCateone,cateedit} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
import { mapGetters,mapActions } from 'vuex'
export default {
     props:['info'],
     data(){
       return{
         formLabelWidth:'120px',
           imageUrl: '',
              form:{
                pid:0,
                catename:'',
                img:'',
                status:1,
              }
       }
     },
      computed: {
        ...mapGetters({
        "catelist":'cate/catelist'
        } )
    },
     methods: {
       ...mapActions({
              requestOneCate:'OneCateActions'
       }),
             ...mapActions({
            'requestCatelist':'cate/CatelistActions'
        }),
     //改变图片时,获取图片路径及信息
     changeImg(e){
      // 处理文件大小
      if(e.size > 2*1024*1024){
        warningAlert('文件大小不能超过2M')
        return
      }

      // 处理文件后缀
      var ext = ['.jpg','.png','.jpeg','.gif'];
      var extName = e.name.slice(e.name.lastIndexOf('.'));
      if(!ext.some(item=>item==extName)){
        warningAlert('上传文件格式不正确')
        return
      }      
      // 上传正确的文件
      this.imageUrl = URL.createObjectURL(e.raw)
      // 将文件存放到form.img中
      this.form.img = e.raw;
      },
      //添加商品分类时的确认按钮
      confrim(){
       cateadd(this.form).then(res=>{
          successAlert(res.data.msg)
          this.cancel()
          this.requestCatelist()
       })
      },
      //添加商品分类时的修改按钮
      update(){
         cateedit(this.form).then(res=>{
          successAlert(res.data.msg)
          this.requestCatelist()
          this.cancel()
         })
      },
      cancel(){
        this.form={
                pid:0,
                catename:'',
                img:'',
                status:1,
        }
        this.imageUrl=''
        this.info.isshow=false
      },
      getDetail(id){
          // 发起菜单详情
        getCateone({id}).then(res=>{
          this.form =res.data.list;
          this.imageUrl=this.$preImg+res.data.list.img
          this.form.id = id;
        })
      }
     },
     mounted () {
        this.requestCatelist()
     }

}
</script>

<style scoped>
  .avatar-uploader>>>.el-upload {
    border: 1px dashed grey;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader>>>.el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>