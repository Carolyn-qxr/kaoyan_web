<template>
	<div>
		<el-button @click="dialogVisible=true">上传</el-button>
		<el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="form.content" placeholder="请输入内容">
					</el-input>
				</el-form-item>
				<el-form-item label="科目分类">
					<el-select v-model="form.subjectsort" placeholder="请选择分类" @change="getTcourseName()">
						<el-option label="政治" value="1"></el-option>
						<el-option label="英语" value="2"></el-option>
						<el-option label="数学" value="3"></el-option>
						<el-option label="专业课" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="专业编号">
					<el-select v-model="form.subjectnum" placeholder="请选择编号" @change="changeId">
						<el-option :label="course.coursename" :value="course.courseid"
							v-for="(course,index) in subjectName " :key="index" ></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传区">
					<el-upload class="upload-demo" :action="uuu" :data="u" ref="upload"
						:on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit()">立即发布</el-button>
					<el-button @click="onCancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		computed:{
			userName(){
				return this.$store.state.username;
			}
		},
		data() {
			return {
				dialogVisible: false,
				form: {
					title:"",//标题
					content:"",  //内容
					subjectsort: "",
					subjectnum: "",
					
				},
				courseName:"",
				fileList: [],
				subjectName: [],
				uuu: this.HOST + "/savefile",
				u: {
					testId: null
				}
			}
		},
		methods: {
			changeId(id){
				var i=this.subjectName.find(course => course.courseid==id);
				this.courseName=i.coursename;
			},
			onCancel() {
				this.form ={
					title:"",//标题
					content:"",  //内容
					subjectsort: "",
					subjectnum: "",
				};
				this.dialogVisible = false;
			},
			onSubmit() {
				//this.$refs.upload.submit();
				var test = {
					coursetype: this.form.subjectsort-1,
					upload: new Date(),
					author: this.userName,
					title: this.form.title,
					content: this.form.content,
					state: 0,
					views: 0,
					location: null,
					courseid: this.form.subjectnum,
					couresname: this.courseName
				};
				this.$axioss({
					method: "post",
					url: this.HOST + "/insertTest",
					crossDomain: true,
					data:test
				}).then(response => {
					if (response.data.code == "200") {
						var id=response.data.data;
						this.u.testId=id;
						if (this.u.testId != null)
							this.$refs.upload.submit();
						alert("插入成功");
						this.onCancel();
					}
				})
			},
			getTcourseName() {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getCourseByType",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						courseType: this.form.subjectsort - 1
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.subjectName = response.data.data;
					}
				})
			},

			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		}
	}
</script>

<style>
</style>
