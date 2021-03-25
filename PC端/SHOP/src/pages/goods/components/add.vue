<template>
  <div>
<el-dialog  :title='info.title' :visible.sync="info.isshow" @opened="open">
<el-form  label-width="100px" class="demo-ruleForm">
     <el-form-item label="一级分类" >
     <el-select v-model="form.first_cateid" @change="changeCate()">
      <el-option lable="请选择" value='' disabled>--请选择--</el-option>
      <el-option :label="item.catename" v-for="item in first_cate" :value="item.id" :key='item.id'></el-option>
    </el-select>
      </el-form-item>
      <el-form-item label="二级分类" >
     <el-select v-model="form.second_cateid">
      <el-option lable="请选择" value='' disabled>--请选择--</el-option>
      <el-option :label="item.catename" v-for="item in secondCate" :value="item.id" :key='item.id'></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="商品名称" >
     <el-input  v-model="form.goodsname" ></el-input>
  </el-form-item>
  <el-form-item label="价格" >
      <el-input v-model="form.price"></el-input>
  </el-form-item>
   <el-form-item label="市场价格" >
      <el-input v-model="form.market_price"></el-input>
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
        <el-form-item label="商品规格" >
            <el-select v-model="form.specsid" @change="changeSpecs()">
            <el-option lable="请选择" value='' disabled>--请选择--</el-option>
            <el-option :label="item.specsname" v-for="item in specs" :value="item.id" :key='item.id'></el-option>
            </el-select>
        </el-form-item>
            <el-form-item label="规格属性" >
            <el-select v-model="form.specsattr" multiple="multiple" >
            <el-option lable="请选择" value='' disabled>--请选择--</el-option>
            <el-option :label="item" v-for="item in specsattrs" :value="item" :key='item'  ></el-option>
            <!-- <el-option v-show='!info.isAdd' :label="item" v-for="item in form.specsattr" :value="item" :key='item'></el-option> -->
            </el-select>
        </el-form-item>
            <el-form-item label="是否新品" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.isnew" :label="1">是</el-radio>
                <el-radio v-model="form.isnew" :label="2">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="是否热卖" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.ishot" :label="1">是</el-radio>
                <el-radio v-model="form.ishot" :label="2">否</el-radio>
            </template>
          </el-form-item>
     <el-form-item label="状态" :label-width="formLabelWidth">
         <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey" :active-value="1" :inactive-value="2">
        </el-switch>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
         <div id="ms"></div>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button  v-if="info.isAdd" type="primary" @click="confrim">确 定</el-button>
    <el-button v-else type="primary" @click="update()" >修 改</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import {goodsAdd,goodsInfo,goodsEdit} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
import E from 'wangeditor'
export default {
props: ['info'],
 data () {
     return {
      imageUrl:'',
      secondCate:[],
      specsattrs:[],
      editor:'',
      formLabelWidth:'120px',
      form:{
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:'',
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      }  
     }
 },
 methods: {
       ...mapActions({
            'requestCatelist':'cate/CatelistActions',
            'requestspecsList':'specs/specsListActions',
            'requestGoodsList':'goods/GoodListActions',
            'requestGoodsCount':'goods/GoodsCountActions'
        }),
        changeCate(f){
             if(!f){
                 this.form.second_cateid = '';
             }
             var index =  this.first_cate.findIndex(item=>item.id==this.form.first_cateid)
             this.secondCate = this.first_cate[index].children
        },
        open(){
              this.editor = new E('#ms')
              this.editor.create()
       this.editor.txt.html(this.form.description)

              // this.form.description=this.editor.txt.html(this.editor)
        },
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
      cancel(){
      this.info.isshow = false,
      this.form={
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:'',
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      this.imageUrl = '';  
      },
        confrim(){
       this.form.description = this.editor.txt.html();
       goodsAdd(this.form).then(res=>{
           successAlert(res.data.msg)
       })
        this.requestGoodsCount()
       this.requestGoodsList()
       this.cancel()
     },
     update(id){
       this.form.id= this.info.id
       this.form.description = this.editor.txt.html();
          goodsEdit(this.form).then(res=>{
           successAlert(res.data.msg)
       })
         this.requestGoodsList()
         this.cancel()
     },
     getdetail(id){
        goodsInfo({id}).then(res=>{
          this.form = res.data.list;
          this.editor.txt.html(this.form.description)
          this.imageUrl=this.$preImg+this.form.img
        })
     },
     changeSpecs(f){
            if(!f){
              this.form.specsattr=''
            }
          var index = this.specs.findIndex(item=>item.id==this.form.specsid)
           this.specsattrs = this.specs[index].attrs
     }
 },
 computed: {
          ...mapGetters({
        "first_cate":'cate/catelist',
        "specs":'specs/specslist'
        } ),
 },
 mounted () {
  this.requestCatelist();
  this.requestspecsList();
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