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
        	<el-button type="primary" icon="el-icon-plus" class="red" @click="showAdd()">添加</el-button>
		    <el-table
		    height="300"
		    border 
		      :data="goodsList" 
		      style="width: 100%">
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
                prop="goods.priceIn"
                label="进价">
              </el-table-column>
               <el-table-column
                prop="goods.priceOut"
                label="卖出价">
              </el-table-column> 
              <el-table-column
                prop="goods.priceNow"
                label="当前价">
              </el-table-column>
              <el-table-column
                prop="goods.color1"
                label="颜色1">
              </el-table-column>
              <el-table-column
                prop="goods.color2"
                label="颜色2">
              </el-table-column>
              <el-table-column
                prop="goods.color3"
                label="颜色3">
              </el-table-column>
              <el-table-column
                prop="goods.size_s"
                label="大小1">
              </el-table-column>
              <el-table-column
                prop="goods.size_m"
                label="大小2">
              </el-table-column>
              <el-table-column
                prop="goods.size_l"
                label="大小3">
              </el-table-column>
              <el-table-column
                prop="goods.img"
                label="图片">
                <template scope='scope'>
                	<img :src="'http://192.168.0.109/'+scope.row.goods.img1" alt="">
                	<img :src="'http://192.168.0.109/'+scope.row.goods.img2" alt="">
                	<img :src="'http://192.168.0.109/'+scope.row.goods.img3" alt="">
                </template>
                <!-- <template scope='scope'>
                	<img :src="'http://192.168.0.106/'+scope.row.goods.img2" alt="">
                </template> 
                <template scope='scope'>
                	<img :src="'http://192.168.0.106/'+scope.row.goods.img3" alt="">
                </template> -->
                
              </el-table-column>
              

		      <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit"@click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.goods.id)">删除</el-button>
                    </template>
                </el-table-column>
		    </el-table>

        </div>
    	<!-- 编辑弹出 -->
		<el-dialog
			title="编辑"
			:visible.sync="editVisible"
			width="50%"
			>
		     <el-form ref="form" :model="form" label-width="100px">
	            
	            <el-form-item label="选择分类">
	                <el-select v-model="form.kindId" placeholder="请选择">
				    <el-option
				      v-for="item in kindList"
				      :key = "item.goodsKind.id"
				      :label="item.goodsKind.ctitle"
				      :value="item.goodsKind.id">
				    </el-option>
				  </el-select>
	            </el-form-item> 
	            <el-form-item label="品牌">
	               <el-input v-model="form.brandId"></el-input>
	            </el-form-item> 
	            <el-form-item label="描述">
	               <el-input v-model="form.desc"></el-input>
	            </el-form-item>
	            <el-form-item label="名称">
	               <el-input v-model="form.name"></el-input>
	            </el-form-item>
	            <el-form-item label="价格">
	                <el-input v-model="form.priceIn"></el-input>
	            </el-form-item> 
	            <el-form-item label="卖出价格">
	                <el-input v-model="form.priceOut"></el-input>
	            </el-form-item>
	             <el-form-item label="当前价格">
	                <el-input v-model="form.priceNow"></el-input>
	            </el-form-item>
	            <el-form-item label="热卖">
	                <el-input v-model="form.hot"></el-input>
	            </el-form-item>
	                <!-- <el-input v-model="form.img"></el-input> 图片不是文本不能用v-model双向绑定-->
	           <!--  <el-form-item label="上传图片">
	                <el-upload
					ref="upload"
					class="upload-demo"
					drag
					list-type="picture-card"
					:limit="3"
					:on-success="imgSuccess"
					:on-remove="removeImg"
					action="http://192.168.0.109/api/admin/upload"
					multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
	            </el-form-item> -->
	            <!-- 图片上传编辑的时候绑定img出现 -->
	            <el-form-item label="上传图片">
		            <el-upload
					  class="avatar-uploader"
					  action="http://192.168.0.109/api/admin/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="img1" :src="'http://192.168.0.109/'+img1" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload> 
					<el-upload
					  class="avatar-uploader"
					  action="http://192.168.0.109/api/admin/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess1">
					  <img v-if="img2" :src="'http://192.168.0.109/'+img2" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-upload
					  class="avatar-uploader"
					  action="http://192.168.0.109/api/admin/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess2">
					  <img v-if="img3" :src="'http://192.168.0.109/'+img3" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
			 </el-form-item>
	              <!-- <el-form-item label="颜色">
	                <template>
		            <el-radio-group v-model="radio2">
				    <el-radio :label="3">red</el-radio>
				    <el-radio :label="6">yellow</el-radio>
				    <el-radio :label="9">pink</el-radio>
				  	</el-radio-group>
				  	</template>
	            </el-form-item> -->
	            <el-form-item label="颜色1">
	               <el-input v-model="form.color1"></el-input>
	            </el-form-item>
	            <el-form-item label="颜色2">
	               <el-input v-model="form.color2"></el-input>
	            </el-form-item> 
	            <el-form-item label="颜色3">
	               <el-input v-model="form.color3"></el-input>
	            </el-form-item>
	            <el-form-item label="大小S">
				  	<el-radio-group v-model="form.size_s">
				    <el-radio label="1">有</el-radio>
				    <el-radio label="2">吴</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>
	            <el-form-item label="大小M">
				  	<el-radio-group v-model="form.size_m">
				    <el-radio label="1">有</el-radio>
				    <el-radio label="2">吴</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>
	            <el-form-item label="大小L">
				  	<el-radio-group v-model="form.size_l">
				    <el-radio label="1">有</el-radio>
				    <el-radio label="2">吴</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>

	           <!--  <el-form-item label="大小">
				  	<template>
				  	<el-radio-group v-model="radio1">
				    <el-radio :label="1">S</el-radio>
				    <el-radio :label="2">M</el-radio>
				    <el-radio :label="3">L</el-radio>
			 	 	</el-radio-group>
					</template>
	            </el-form-item> -->
			
		        <div class="container">
		            <div class="plugins-tips">
		            	shangpinxinxi
		            </div>
		            <quill-editor ref="myTextEditor" v-model="form.content" ></quill-editor>
		        </div>
             

	        </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button  type="primary" @click="saveEditKind" v-if="issaveEdit">bianji确 定</el-button>
				<el-button v-else type="primary" @click="addKind">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 删除按钮 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteKind">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加 -->
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
// import {getKindList,delKind,addKind,saveEditKind} from '@/api/1biaoge'
import goodsApi from '@/api/2list.js'
import kindApi from '@/api/1biaoge.js'
    export default {
    	components: {
            quillEditor
        },
             data(){
            return{
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
            this.getGoodsList()
          // goodsApi.getGoodsList()
          //   .then(res=>{
          //       this.goodsList=res.data.data.list;
          //       console.log(this.goodsList)
          //   })
        },

    	 methods: {
    	 	//上传图片与编辑绑定出现
    	 	 handleAvatarSuccess(res, file) {
             console.log(file)
	        this.img1 = file.response.data;
	        this.form.img1 = this.img1
	        console.log(this.img1)
	      }, 
	      handleAvatarSuccess1(res, file) {
	        this.img2 = file.response.data;
	        this.form.img2 = this.img2
	      },  
	      handleAvatarSuccess2(res, file) {
	        this.img3 = file.response.data;
	        this.form.img3 = this.img3
	      },
	       beforeAvatarUpload(file) {
	       },
    	 	
            //goods数据获取
             getGoodsList(){
                goodsApi.getGoodsList()//不加this指的是引用的api下的接口。
                .then(res=>{
                	this.goodsList=res.data.data.list;
                })
            },
          //编辑今天
           handleEdit(data){
           	this.img1=data.goods.img1;
           	this.img2=data.goods.img2;
           	this.img3=data.goods.img3;

             this.editVisible = true;
             this.issaveEdit = true;
             this.form={
                desc:data.goods.desc,
                brandId:data.goods.brandId,
                name:data.goods.name,
                priceIn:data.goods.priceIn,
                priceOut:data.goods.priceOut,
                priceNow:data.goods.priceNow,
                hot:data.goods.hot,
                size_s:data.goods.size_s,
                size_m:data.goods.size_m,
                size_l:data.goods.size_l,
                color1:data.goods.color1,
                color2:data.goods.color2,
                color3:data.goods.color3,
                img:data.goods.img,
                img1:data.goods.img1,
                img2:data.goods.img2,
                img3:data.goods.img3,

             };
             // console.log(this.from)
            this.issaveEditID =data.goods.id
             // console.log(this.issaveEditID)
             // 图片编辑同步
           } ,
           //编辑确定按钮
           saveEditKind(){
            this.form.id=this.issaveEditID
            goodsApi.saveEditKind({goods:this.form})
            .then(res=>{
                if(res.data.code==='S'){
                    this.$message.success(`chenggong`);
                   this.getGoodsList()
                }
                // console.log(res)

            })
                this.editVisible=false;

            },

            //显示添加
            showAdd(id){
            	// this.kindList=[]
                kindApi.getKindList()//不加this指的是引用的api下的接口。
                .then(res=>this.kindList=res.data.data)
                // console.log(id)
                //每次打开添加输入框为空
               this.form={
                    desc:'',
                    brandId:'',
                    name:'',
                    priceIn:'',
                    priceOut:'',
                    priceNow:'',
                    hot:'',
                    img1:'',
                    img2:'',
                    img3:'',
                    size_s:'',
                    size_m:'',
                    size_l:'',
                    color1:'',
                 	color2:'',
             	 	color3:'',


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
                       	this.$refs.upload.clearFiles();
                    }
                })
                this.editVisible= false;

            },
		// 添加图片
            // imgSuccess:function(response, file, fileList){
            // 	// console.log(fileList)
            // 	this.form.img1=''
            // 	this.form.img2=''
            // 	this.form.img3=''
            // 	for(let i=0; i<fileList.length; i++){
            // 		if(fileList[i].response.code==="S"){
            // 			// console.log(i)
            // 			if(i==0){
            // 				this.form.img1=fileList[i].response.data
            // 			}else if(i==1){
            // 				this.form.img2=fileList[i].response.data
            // 			}else{
            // 				this.form.img3=fileList[i].response.data
            // 			}
            // 		}
            // 	}
            // },
            //删除图片
            // removeImg:function(file, fileList){
            // 	for(let i=0; i<fileList.length; i++){
            // 		if(fileList[i].response.code==="S"){
            // 			// console.log(i)
            // 			if(i==0){
            // 				this.form.img1=fileList[i].response.data
            // 			}else if(i==1){
            // 				this.form.img2=fileList[i].response.data
            // 			}else{
            // 				this.form.img3=fileList[i].response.data
            // 			}
            // 		}
            // 	}
            // },


           //shanchu弹框并且传值;
           handleDelete(id,flag) {
                this.delId = id;
                // this.kindDelType = 1 
                // if(flag){
                //     //为true的话 就认为是子类打开的删除。
                //     this.kindDelType = 1 
                // }else{
                //     //为false的话 就认为是父类打开的删除。
                //     this.kindDelType = 0 
                // }
                this.delVisible = true
           },
           //删除的确认按钮
           deleteKind(){
                goodsApi.delKind({
                   'id':this.delId



                    // 'type': this.kindDelType
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
img{
	width: 20px;
	height: 20px;
}
    
</style>
