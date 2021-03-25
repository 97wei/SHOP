<template>
  <div>
<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
    >
     <el-table-column prop="id" label="商品编号"  ></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"  ></el-table-column>
      <el-table-column prop="price" label="商品价格"  ></el-table-column>
      <el-table-column prop="market_price" label="市场价格"  ></el-table-column>
     <el-table-column  label="图片">
        <template v-slot="prop">
          <img :src="$preImg+prop.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品"  ></el-table-column>
      <el-table-column prop="ishot" label="是否热卖"  ></el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="2"
        @current-change='cPage'
        :total="count">
      </el-pagination>
</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { successAlert } from '../../../utils/alert';
import {goodsDelete} from '../../../utils/request'
export default {
    methods: {
      ...mapActions({
          requestGoodsList:'goods/GoodListActions',
          requestGoodsCount:'goods/GoodsCountActions',
          requestPage:'goods/GoodsPageActions'
      }),
      //删除
      del(id){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           goodsDelete({id}).then(res=>{
              successAlert(res.data.msg)
              this.requestGoodsList()
             this.requestGoodsCount()

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },  
      //编辑
      edit(id){
      this.$emit('edit',id)
      },
      //分页
      cPage(e){
          this.requestPage(e)
          this.requestGoodsList()
      }
    },
    computed: {
       ...mapGetters({
        tableData:'goods/goodsList',
        count:'goods/goodsCount'
        })
    },
      mounted () {
          this.requestGoodsList()
          this.requestGoodsCount()
      }
}
</script>

<style scoped>
img{
    width:100px;
    height: 100px
}
</style>