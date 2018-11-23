<template>
	  	<!-- 编辑弹出 -->
		<el-dialog
			:title="title"
			:before-close="close"
			:visible.sync="editVisible"
			width="50%">
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
	            <!-- 图片上传编辑的时候绑定img出现 -->
	            <el-form-item label="上传图片">
		            <el-upload
					  class="avatar-uploader"
					  :action='moaction'
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  >
					  <img v-if="img1" :src="picture+img1" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload> 
					<el-upload
					  class="avatar-uploader"
					  :action='moaction'
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess1"
           			>
					  <img v-if="img2" :src="picture+img2" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-upload
					  class="avatar-uploader"
					  :action='moaction'
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess2"
            			>
					  <img v-if="img3" :src="picture+img3" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
			 	</el-form-item>

	            <el-form-item label="颜色1">
	               <el-input v-model="form.color1"></el-input>
	            </el-form-item>
	            <el-form-item label="颜色2">
	               <el-input v-model="form.color2"></el-input>
	            </el-form-item> 
	            <el-form-item label="颜色3">
	               <el-input v-model="form.color3"></el-input>
	            </el-form-item>
	            <el-form-item label="热卖">
	                <el-radio-group v-model="form.hot">
				    <el-radio label="1">热卖</el-radio>
				    <el-radio label="0">默认</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>
	            <el-form-item label="大小S">
				  	<el-radio-group v-model="form.size_s">
				    <el-radio label="1">有</el-radio>
				    <el-radio label="0">吴</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>
	            <el-form-item label="大小M">
				  	<el-radio-group v-model="form.size_m">
				    <el-radio label="1">有</el-radio>
				    <el-radio label="0">吴</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>
	            <el-form-item label="大小L">
				  	<el-radio-group v-model="form.size_l">
				    <el-radio label="1">有</el-radio>
				    <el-radio label="0">吴</el-radio>
			 	 	</el-radio-group>
	            </el-form-item>
				<!-- 富文本编辑器 -->
		        <div class="container">
		            <div class="plugins-tips">
		            	富文本编辑器
		            </div>
		            <quill-editor ref="myTextEditor" v-model="form.content" ></quill-editor>
		        </div>
             

	        </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button  type="primary" @click="saveEditKind" v-if="issaveEdit">bianji确 定</el-button>
				<el-button v-else type="primary" @click="addKind">确 定</el-button>
			</span>
		</el-dialog>
</template>
<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default{
	props:['form','img1','img2','img3','title','kindList','editVisible','issaveEdit','picture'],
	components: {
            quillEditor
        },
	data(){
		return{
			moaction:'http://192.168.0.118/api/admin/upload',
			// picture:'http://192.168.0.118/'在父2list.vue里面已经设置传值过来了

		}
	},
	methods:{
		// 冒泡给父的事件
		close(){
			this.$emit('close');
		},
		handleAvatarSuccess(res, file) {
			this.$emit('handleAvatarSuccess',res, file);

        }, 
        handleAvatarSuccess1(res, file) {
        	this.$emit('handleAvatarSuccess1',res, file);

        },  
        handleAvatarSuccess2(res, file) {
        	this.$emit('handleAvatarSuccess2',res, file);
        },  
         addKind(){
         	this.$emit('addKind');
         },
         saveEditKind(){
         	this.$emit('saveEditKind');

         },
	},

}
	
</script>
<style scoped>
	
</style>