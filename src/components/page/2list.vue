<template>
  <!-- 第二次增删改查,图片添加,通过axios以及api后台获取数据 -->
    <div class="table">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>我的list列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <!-- 添加按钮 -->
        <el-row>
          <el-button type="primary" icon="el-icon-plus" class="red" @click="showAdd()">添加</el-button>
          <!-- <span class="total-row">gong{{totalRow}}</span> -->
        </el-row>
        <el-table
        height="500"
        border 
          :data="goodsList" 
          style="width: 100%">

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="进价">
                  <span>{{ props.row.goods.priceIn }}</span>
                </el-form-item>
                <el-form-item label="卖出价">
                  <span>{{ props.row.goods.priceOut }}</span>
                </el-form-item>
                <el-form-item label="当前价">
                  <span>{{ props.row.goods.priceNow }}</span>
                </el-form-item>
                <el-form-item label="大小1">
                  <span>{{ props.row.goods.size_s }}</span>
                </el-form-item>
                <el-form-item label="大小2">
                  <span>{{ props.row.goods.size_m }}</span>
                </el-form-item>
                <el-form-item label="大小3">
                  <span>{{ props.row.goods.size_l }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            prop="goods.addTime"
            label="时间"
            >
          </el-table-column>
          <el-table-column
            prop="goods.brandId"
            label="品牌"
           >
          </el-table-column>
          <el-table-column
                prop="goods.name"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="goods.desc"
                label="描述">
              </el-table-column>
               <el-table-column
                prop="goods.hot"
                label="热卖">
              </el-table-column>
              <el-table-column
                prop="goods.color1"
                label="颜色1">
                <template scope='scope'>
                  <span :style="{backgroundColor: scope.row.goods.color1}"
                  class="span_bg" :title="scope.row.goods.color1"></span> 
                  <span :style="{backgroundColor: scope.row.goods.color2}"
                  class="span_bg" :title="scope.row.goods.color2"></span> 
                  <span :style="{backgroundColor: scope.row.goods.color3}"
                  class="span_bg" :title="scope.row.goods.color3"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods.img"
                label="图片">
                <template scope='scope'>
                  <img :src="picture+scope.row.goods.img1" alt="">
                  <img :src="picture+scope.row.goods.img2" alt="">
                  <img :src="picture+scope.row.goods.img3" alt="">
                </template>
              </el-table-column>
          <el-table-column label="操作" width="200px" height="100px" align="center">
              <template slot-scope="scope">
                  <el-button type="primary"  icon="el-icon-edit"@click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="danger" size="mini"   icon="el-icon-delete" class="red" @click="handleDelete(scope.row.goods.id)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRow">
         </el-pagination>
        </div>
    <!-- 删除按钮 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteKind">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 组件编辑弹出出现传值 -->
    <mo-show
    :picture='picture'
     :form = 'form'
     :title="title"
     :img1='img1'
     :img2='img2'
     :img3='img3'
     :kindList='kindList'
     :editVisible='editVisible'
     :issaveEdit='issaveEdit'
     @close='close'
     @addKind='addKind'
     @saveEditKind='saveEditKind'
     @handleAvatarSuccess='handleAvatarSuccess'
     @handleAvatarSuccess1='handleAvatarSuccess1'
     @handleAvatarSuccess2='handleAvatarSuccess2'
    >
    </mo-show>
       
  </div>
</template>

<script>
import goodsApi from '@/api/2list.js'
import kindApi from '@/api/1biaoge.js'
import MoShow from './components/2listshow'
    export default {
      components: {
            MoShow
        },
             data(){
            return{
              picture:'http://192.168.0.118/',
              pageNumber:1,
              totalPage:1,
              currentPage:1,
              totalRow:0,
              objpag:{

                start:1,
              },
              limit:10,
              title:'',
               img1:'', 
               img2:'',
               img3:'',
              content: '',
               radio2: 3,
               radio1: 3,
                goodsList:[],
                kindList:[],
                delId:'',
                kindDelType:1,
                issaveEdit:true,
                issaveEditID:'',
                form:{
                    desc:'',
                    brandId:'',
                    name:'',
                    priceIn:'',
                    priceOut:'',
                    priceNow:'',
                    hot:0,
                    img1:'',
                    img2:'',
                    img3:'',
                    color1:'',
                    color2:'',
                    color3:'',
                    size_s:'1',
                    size_m:'1',
                    size_l:'1',
                    contentSource:'',
                },
                editVisible: false,
                delVisible: false,
                addVisible:false,
            }
        },
        created(){
            //实时更新,生命周期函数created只能渲染一次,所一封装成一个方法;调用这个方法,是数据实时更新;
            this.getGoodsList();
            
        },
       methods: {
         handleSizeChange(val) {
          this.limit=val
          this.getGoodsList(this.limit)
      },
        handleCurrentChange(val) {
          this.objpag.start=val
          this.getGoodsList(this.objpag)
      },
        // goods数据获取封装
        getGoodsList(data){
          var regex=/^size/;
          goodsApi.getGoodsList(data)
          .then(res=>{
            console.log(res)
            this.totalRow=res.data.data.totalRow //商品总数
            this.totalPage=res.data.data.pageNumber //总页数
            this.currentPage=res.data.data.totalPage*10 //当前页数

            this.goodsList=res.data.data.list
            for(let i = 0; i<this.goodsList.length; i++){
              var item = this.goodsList[i].goods
              for(let a in item){
                if(regex.test(a)){
                  item[a]==1?item[a]='有库存':item[a]='无库存'
                };
                if(a==='hot'){
                  item[a]==1?item[a]='热卖':item[a]='普通'
                }
              }
            }
          })
        },
        //将返回后台的数据的文字变成相应的数字
        changenumber() {
          var regex=/^size/;
            for(let i = 0; i<this.goodsList.length; i++){
              var item = this.goodsList[i].goods
              for(let b in item){
                if(regex.test(b)){
                  item[b]=='有库存'?item[b]='1':item[b]='0'
                }
                if(b==='hot'){
                  item[b]=='热卖'?item[b]='1':item[b]='0'
                }
              }
            }
        },
        // kind数据获取封装
        getKindList(){
          kindApi.getKindList()
          .then(res=>{
            this.kindList=res.data.data
          })
        },
        close(){
          this.editVisible= false
        },

        //上传图片与编辑绑定出现
         handleAvatarSuccess(res, file) {
          this.img1 = file.response.data;
          this.form.img1 = this.img1
        }, 
        handleAvatarSuccess1(res, file) {
          this.img2 = file.response.data;
          this.form.img2 = this.img2
        },  
        handleAvatarSuccess2(res, file) {
          this.img3 = file.response.data;
          this.form.img3 = this.img3
        },
         // beforeAvatarUpload(file) {
         // },
        
          //编辑
           handleEdit(data){
            this.changenumber()
            this.getKindList()
            this.title='编辑'
            this.img1=data.goods.img1;
            this.img2=data.goods.img2;
            this.img3=data.goods.img3;

             this.editVisible = true;
             this.issaveEdit = true;
             // 深拷贝data.goods
             this.form= Object.assign({}, data.goods);
             delete this.form.addTime
             delete this.form.count
            this.issaveEditID =data.goods.id

           } ,
           //编辑确定按钮
           saveEditKind(){
            this.changenumber()
            this.form.id=this.issaveEditID
            goodsApi.saveEditKind({goods:this.form})
            .then(res=>{
                if(res.data.code==='S'){
                    this.$message.success(`chenggong`);
                   this.getGoodsList()

                }
            })
                this.editVisible=false;

            },

            //显示添加
            showAdd(id){
                kindApi.getKindList()//不加this指的是引用的api下的接口。
                .then(res=>{
                  this.kindList=res.data.data
                })
                //每次打开添加输入框为空
                this.title='添加'
               this.form={
                },
                this.img1='',
                this.img2='',
                this.img3='',
                this.editVisible = true;
                 this.issaveEdit = false;
            },
            //tianjia确定按钮
             addKind(){
                goodsApi.addKind({goods:this.form})
                .then(res=>{
                  // console.log(res)
                    if(res.data.code==='S'){
                        this.$message.success(`添加成功`);
                        this.getGoodsList()
                        // this.$refs.upload.clearFiles();
                    }
                })
                this.editVisible= false;

            },
           //shanchu弹框并且传值;
           handleDelete(id,flag) {
                this.delId = id;
                this.delVisible = true
           },
           //删除的确认按钮
           deleteKind(){
                goodsApi.delKind({
                   'id':this.delId
                })
                .then(res=>{
                    // console.log(res)
                    if(res.data.code==='S'){
                        this.$message.success(`删除成功`);
                    }else{
                       this.$message.error(`删除失败`);
                       this.getGoodsList()
                    }
                })
                this.delVisible = false;
            },
        },
    }

</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .span_bg{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
img{
  width: 20px;
  height: 20px;
}
    
</style>