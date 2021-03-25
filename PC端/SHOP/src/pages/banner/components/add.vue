<template>
  <div>
      <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
            <div class="imgbox">
                <p>+</p>
                <img v-if="imageUrl" :src="imageUrl" alt="">
                <input type="file" @change="changeImg">
            </div>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="skyblue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>s
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { successAlert, warningAlert } from '../../../utils/alert';
import { banneradd,bannerinfo,bannerEdit} from '../../../utils/request';
export default {
    props:['info'],
    data(){
        return{
            formLabelWidth:'120px',
            imageUrl:"",
            form:{
                title:"",
                img:"",
                status:1
            }
        }
    },
    methods:{
          ...mapActions({
         requestbannerList:'banner/bannerListActions'
        }),
        changeImg(e){
            var file = e.target.files[0];
            //处理文件大小
            if(file.size > 2*1024*1024){
                warningAlert("文件大小不能超过2M!");
                return;
            }
            //处理文件后缀
            var ext = ['.jpg','.png','.jpeg','.gif'];
            var fileExt = file.name.slice(file.name.lastIndexOf('.'));
            if(!ext.some(item => item == fileExt)){
                warningAlert("文件格式不对!")
                return;
            }
            //将图片信息生成图片地址并显示
            this.imageUrl = URL.createObjectURL(file);
            // 将图片信息存入this.form.img中
            this.form.img = file;
        },
        cancel(){
            this.info.isshow = false;
            this.form = {
                title:"",
                img:"",
                status:1
            };
            this.imageUrl = "";
        },
        //添加
        confirm(){
            //发送请求
            banneradd(this.form).then(res=>{
               //成功
                successAlert(res.data.msg);
            })
                 this.cancel();
                 this.requestbannerList()
        },
     
     getbannerdetail(id){
         bannerinfo({id}).then(res=>{
            this.form=res.data.list
            this.form.id=id
            this.imageUrl=this.$preImg+res.data.list.img
         })
     },
     //更新轮播图
     update(){
        bannerEdit(this.form).then(res=>{
             successAlert(res.data.msg)
                 this.cancel();

        })
     }
    }
}
</script>

<style scoped>
.imgbox{
    width: 150px;
    height: 150px;
    border: 1px dashed gray;
    position: relative;
}
p{
    width: 100%;
    height: 100%;
    font-size: 40px;
    text-align: center;
    line-height: 150px;
   
}
img{
     width: 100%;
    height: 100%;
     position: absolute;
    top: 0;
    left: 0;
}
input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
</style>
