<template>
  <div>
<el-dialog  :title='info.title' :visible.sync="info.isshow" @opened="open">
<el-form  label-width="100px" class="demo-ruleForm">
       <el-form-item label="活动名称" >
     <el-input  v-model="form.title" ></el-input>
        </el-form-item>
    <el-form-item label="活动名称" >
    <div class="block" >
            <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            align="right">
            </el-date-picker>
        </div>
    </el-form-item>     
     <el-form-item label="一级分类" >
     <el-select v-model="form.first_cateid" @change="changeCate()">
      <el-option lable="请选择" value='' disabled>--请选择--</el-option>
      <el-option :label="item.firstcatename" v-for="item in cate1" :value="item.firstcatename" :key='item.id'></el-option>
    </el-select>
      </el-form-item>
      <el-form-item label="二级分类" >
     <el-select v-model="form.second_cateid">
      <el-option lable="请选择" value='' disabled>--请选择--</el-option>
      <el-option :label="item.catename" v-for="item in secondCate" :value="item.id" :key='item.id'></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="商品" >
      <el-input v-model="form.goodsid"></el-input>
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
    <el-button v-else type="primary" @click="update()" >修 改</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
// import {skec}from '../../../utils/request'
import {mapActions,mapGetters} from 'vuex'
export default {
    props: ['info'],
data(){
    return{
        formLabelWidth:'120px',
        form:{
            title:'',
            begintime:'',
            endtime:'',
            first_cateid:'',
            second_cateid:'',
            goodsid:'',
            status:''
        },
        value1:''
    }
},
methods: {
   ...mapActions({
          requestGoodsList:'goods/GoodListActions',
   }),
   cancel(){
     this.form={
             title:'',
            begintime:'',
            endtime:'',
            first_cateid:'',
            second_cateid:'',
            goodsid:'',
            status:''
     }
     this.info.isshow=false,
      this.value2=[new Date(this.begintime), new Date(this.endtime)]
   },
   confrim(){

     skec(this.form).then(res=>{

     })
   }
},
    computed: {
       ...mapGetters({
        cate1:'goods/goodsList',
        })
    },
    mounted () {
          this.requestGoodsList()
          this.requestGoodsCount()
      }
}
</script>

<style>

</style>