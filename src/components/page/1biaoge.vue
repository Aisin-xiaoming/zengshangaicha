<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>我的基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        	<!-- 添加按钮 -->
        	<el-button type="primary" icon="el-icon-plus" class="red" @click="showAdd">添加</el-button>
		    <el-table
		      :data="kindList"
		      style="width: 100%">
		      <el-table-column
		        prop="goodsKind.title"
		        label="title"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="goodsKind.ctitle"
		        label="ctitle"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="goodsKind.img"
		        label="img">
		      </el-table-column>
		      <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit"@click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.goodsKind.id)">删除</el-button>
                    </template>
                </el-table-column>
		    </el-table>

        </div>
    	<!-- 编辑弹出 -->
		<el-dialog
			title="编辑"
			:visible.sync="editVisible"
			width="30%"
			>
		     <el-form ref="form" :model="form" label-width="100px">
	            <el-form-item label="英文名字">
	                <el-input v-model="form.title"></el-input>
	            </el-form-item>
	            <el-form-item label="中文名字">
	               <el-input v-model="form.ctitle"></el-input>
	            </el-form-item>

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
import {getKindList,delKind,addKind,saveEditKind} from '@/api/1biaoge'
    export default {
             data(){
            return{
                kindList:[],
                delId:'',
                kindDelType:1,
                issaveEdit:true,
                issaveEditID:'',
                form:{
                    title: '',
                    ctitle:'',
                    pid:0
                },
                editVisible: false,
                delVisible: false,
                addVisible:false,
            }
        },
        created(){
            //实时更新,生命周期函数created只能渲染一次,所一封装成一个方法;调用这个方法,是数据实时更新;
            this.getKindList()
            // .then(res=>{
            //     this.kindList=res.data.data;
            //     // console.log(res)
            // })
        },




    	 methods: {
            //kind数据获取
             getKindList(){
                getKindList()//不加this指的是引用的api下的接口。
                .then(res=>this.kindList=res.data.data)
            },
            
           //shanchu
           handleDelete(id,flag) {
                this.delId = id;
                this.delVisible = true
           },
           //删除的确认按钮
           deleteKind(){
                delKind(this.delId,this.kindDelType)
                .then(res=>{
                    // console.log(res)
                    if(res.data.code==='S'){
                        this.$message.success(`删除成功`);
                        this.getKindList()
                    }
                })
                this.delVisible = false;
            },
            //编辑今天
           handleEdit(id){
             this.editVisible = true;
             this.issaveEdit = true;
             this.form={
                title:id.goodsKind.title,
                ctitle:id.goodsKind.ctitle,
             };
            this.issaveEditID =id.goodsKind.id
             // console.log(this.issaveEditID)
           } ,
           //编辑确定按钮
           saveEditKind(){
            this.form.id=this.issaveEditID
            saveEditKind({goodsKind:this.form})
            .then(res=>{
                if(res.data.code==='S'){
                    this.$message.success(`chenggong`);
                    this.getKindList()
                }
                // console.log(res)

            })
                this.editVisible=false;

            },

            //显示添加
            showAdd(id){
                //每次打开添加输入框为空
               this.form={
                    title: '',
                    ctitle:'',
                    pid:0
                },
                this.editVisible = true;
                 this.issaveEdit = false;

            },
            //tianjia确定按钮
             addKind(){
                addKind({goodsKind:this.form})
                .then(res=>{
                    if(res.data.code==='S'){
                        this.$message.success(`添加成功`);
                        this.getKindList()
                    }
                })
                this.editVisible= false;

            },


//下面是昨天的代码;  
		      // handleClose(done) {
		      //   this.$confirm('确认关闭？')
		      //     .then(_ => {
		      //       done();
		      //     })
		      //     .catch(_ => {});
		      // },
		      //编辑按钮
		      // handleEdit(index, row) {
		      // 	this.isEdit = true
        //         this.idx = index;
        //         let item = this.tableData[index];
        //         this.form = {
        //             name: item.name,
        //             date: item.date,
        //             address: item.address
        //         }
        //         //当编辑弹出为true时弹出
        //         this.editVisible = true;

        //     },
            //删除按钮
            // handleDelete(index, row) {
            //     this.idx = index;
            //     this.delVisible = true;
            // },
            //添加按钮
            // handleAdd(){
            // 	this.isEdit = false
            // 	this.editVisible = true;
            // 	this.form = {};
            	
            // },
            // 保存编辑后的内容确认按牛
            // saveEdit(){
            // 	this.editVisible=false;
            // 	this.$set(this.tableData,this.idx,this.form);
            // 	this.$message.success(`修改${this.idx+1}行成功`)

            // },
            // deleteHang(){
            // 	this.delVisible = false;
            // 	this.tableData.splice(this.idx,1);
            // 	this.$message.success(`删除${this.idx+1}行成功`)
            // },
            //确认按钮
            // addHang(){
            // 	this.tableData.push(this.form);
            // 	this.editVisible= false;
            // },
		    },
        // data(){
        // 	return{
        // 		isEdit:true,
        // 		form: {
        //             name: '',
        //             date: '',
        //             address: ''
        //         },
        //         editVisible: false,
        // 		delVisible: false,
        // 		addVisible:false,
        // 		//  tableData: [{
        //   //   date: '2016-05-02',
        //   //   name: '小萍萍',
        //   //   address: '上海市普陀区金沙江路 1518 弄'
        //   // }, {
        //   //   date: '2016-05-04',
        //   //   name: '小明明',
        //   //   address: '上海市普陀区金沙江路 1517 弄'
        //   // }, {
        //   //   date: '2016-05-01',
        //   //   name: '小萍萍',
        //   //   address: '上海市普陀区金沙江路 1519 弄'
        //   // }, {
        //   //   date: '2016-05-03',
        //   //   name: '小明明',
        //   //   address: '上海市普陀区金沙江路 1516 弄'
        //   // }]
        // 	}
        // },
       
        
      
    }

</script>

<style scoped>
    
</style>
