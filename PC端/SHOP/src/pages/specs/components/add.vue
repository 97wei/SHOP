<template>
    <div>
<el-dialog  :title='info.title' :visible.sync="info.isshow">
<el-form  label-width="100px" class="demo-ruleForm">
       <el-form-item label="规格名称" :label-width="formLabelWidth" >
         <el-input  v-model="form.specsname" ></el-input>
      </el-form-item>
      <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index" :label-width="formLabelWidth">
        <el-col :span=19>
           <el-input v-model="item.value"></el-input>
        </el-col>
          <el-button style='margin:0'  type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger"  style='margin:0' v-else @click="delAttr()">删除</el-button>
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
    <el-button v-else type="primary" @click="update" >修 改</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import {specsadd,specsInfo,specsEdit} from '../../../utils/request'
import {warningAlert,successAlert} from '../../../utils/alert'
import {mapActions,mapGetters} from 'vuex'

export default {
     props:['info'],

     data(){
       return {
      formLabelWidth:'120px',
      attrArr:[{value:''}],//规格属性值
         form:{
           specsname:'',
           attrs:'',
           status:1,
         }
       }
     },
     methods: {
       ...mapActions({
       requestspecsList:'specs/specsListActions',
       requestspecsCount:'specs/requestspecsCount'
   }),
       addAttr(){
        this.attrArr.push({value:''})
       },
       delAttr(){
         this.attrArr.pop()
       },
       cancel(){
         this.form={
           specsname:'',
           attrs:'',
           status:'',
         }
         this.attrArr=[{value:''}],
         this.info.isshow=false
       },
       confrim(){
         if(this.attrArr.some(item=>item.value=='')){
           warningAlert('属性值不能为空')
           return
         }
         this.form.attrs = this.attrArr.map(item=>item.value).join(',')
          specsadd(this.form).then(res=>{
              successAlert(res.data.msg)
          })
          this.cancel()
          this.requestspecsList()
          this.requestspecsCount()
       },
       getdetail(id){
         specsInfo({id}).then(res=>{
           this.form = res.data.list[0],
           this.form.id=id;
          var arr = this.form.attrs.split(',');
          this.attrArr=[];
          for(let i in arr){
            this.attrArr.push({value:arr[i]})
          }
         })
       },

       //修改属性
       update(){
           if(this.attrArr.some(item=>item.value === '')){
        warningAlert("规格属性值不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map(item=>item.value).join(',');
         specsEdit(this.form).then(res=>{
           successAlert(res.data.msg)
         })
            this.cancel()
           this.requestspecsList()
       }
     }
}
</script>

<style>

</style>