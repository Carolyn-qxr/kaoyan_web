<template>
	<div class="admin">
		<div class="admin-header">
			<div class="admin-logo">后台管理系统</div>
			<div class="admin-header-right">
				<div class="admin-avatar">
					<img src="../assets/img/avatar.jpg">
				</div>
				<!--用户名下拉菜单-->
				<el-dropdown class="admin-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						退出<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
							<el-dropdown-item divided command="daima">代码仓库</el-dropdown-item>
						</el-dropdown-menu>

					</template>
				</el-dropdown>
			</div>
		</div>
		<div class="admin-body">
			<el-tabs style="position: absolute;top: 13%;width: 98%;height: 100%" type="border-card"
				v-model="activeName">
				<el-tab-pane label="信息审核" name="first">
					<el-table :data="examineData">
						<el-table-column prop="author" label="上传人" width="180px" align="center"></el-table-column>
						<el-table-column prop="upload" label="上传时间" width="180px" align="center"></el-table-column>
						<el-table-column prop="title" label="资料名称" width="180px" align="center"></el-table-column>
						<el-table-column prop="couresname" label="对应学科" width="180px" align="center"></el-table-column>
						<el-table-column label="资料" align="center">
							<a target="_blank" href="/word1.docx">相关资料</a>
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button size="mini" type="danger">拒绝</el-button>
								<el-button size="mini" @click="pass(scope.row)">同意</el-button>
							</template>

						</el-table-column>
					</el-table>
				</el-tab-pane>

				<el-tab-pane label="上传公告" name="second">
					<el-form :model="upLoadForm" ref="upLoadForm" label-width="100px">
						<el-form-item label="文章标题" prop="title">
							<el-input v-model="upLoadForm.title" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="文章内容" prop="content">
							<el-input v-model="upLoadForm.content" type="textarea" maxlength="1000" show-word-limit
								:autosize="{ minRows: 5, maxRows: 20}" clearable>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="medium" @click="submit()">立即创建</el-button>
							<el-button size="medium" @click="resetForm('upLoadForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>

				<el-tab-pane label="添加学校" name="third">
					<el-form :model="schoolInfo" label-width="100px">
						<el-form-item label="学校编号">
							<el-input v-model="schoolInfo.schoolNum" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="学校名称">
							<el-input v-model="schoolInfo.schoolName" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="所在地">
							<el-input v-model="schoolInfo.location" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="自划线">
							<el-input v-model="schoolInfo.isSelf" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="官网">
							<el-input v-model="schoolInfo.official" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="研究生院">
							<el-input v-model="schoolInfo.isHave" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="学校特征">
							<el-input v-model="schoolInfo.features" style="width: 400px" clearable></el-input>
						</el-form-item>
					</el-form>
					<el-button @click="addSchool()">添加</el-button>
				</el-tab-pane>
				<el-tab-pane label="添加专业" name="fourth">
					<el-form :model="information" label-width="100px">
						<el-form-item label="学校编号">
							<el-input v-model="information.schoolnum" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="学校名称">
							<el-input v-model="information.schoolname" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="考试方式">
							<el-input v-model="information.exammethod" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="学习方式">
							<el-input v-model="information.studymethod" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="人数">
							<el-input v-model="information.peoplenum" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="研究方向">
							<el-input v-model="information.direction" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="政治">
							<el-input v-model="information.politics" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="英语">
							<el-input v-model="information.english" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="数学">
							<el-input v-model="information.course1" style="width: 400px" clearable></el-input>
						</el-form-item>
						<el-form-item label="专业课">
							<el-input v-model="information.course2" style="width: 400px" clearable></el-input>
						</el-form-item>
					</el-form>
					<el-button @click="addinformation()">添加</el-button>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			username() {
				return this.$store.state.username;
			}
		},
		data() {
			return {
				activeName: 'second',
				upLoadForm: {
					author: "",
					title: '',
					content: '',
					upload: new Date(),
					state: 1,
					views: 0,
					location: null
				},
				schoolInfo: {
					schoolNum: "",
					schoolName: "",
					location: "北京",
					isSelf: 1,
					official: "111",
					isHave: 1,
					features: 1
				},
				information: {
					schoolnum: "001",
					schoolname: "清华大学",
					subjectid:"1",
					subjectname: "计算机",
					exammethod: "自主命题",
					studymethod: "全日制",
					peoplenum: 500,
					direction: "大数据",
					politics: 6,
					english: 4,
					course1: 2,
					course2: 1
				},
				examineData: [] //资料没有写
			}
		},
		methods: {
			pass(row) { //同意，修改状态
				var test = row;
				test.state = 1;
				this.$axioss({
					method: "post",
					url: this.HOST + "/updateTest",
					crossDomain: true,
					data: test
				}).then(response => {
					if (response.data.code == "200") {
						alert(response.data.msg);
					}
				})
			},
			getAudit() {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getAllTestAudit",
					crossDomain: true,
					dataType: 'jsonp',
					params: {}
				}).then(response => {
					if (response.data.code == "200") {
						this.examineData = response.data.data.data
					}
				})
			},
			handleCommand(command) {
				if (command == "exit") {
					this.$router.push("/login");
					sessionStorage.removeItem("admin")
				} else {
					window.location.href = 'https://github.com/zhengnaying/dealpf'
				}
			},
			/*将输入的公告信息上传到后端*/
			submit() {
				this.upLoadForm.author = this.username;
				this.$axioss({
					method: "post",
					url: this.HOST + "/insertNotice",
					crossDomain: true,
					data: this.upLoadForm
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
					}
				})

			},
			addSchool() {
				this.$axioss({
					method: "post",
					url: this.HOST + "/insertSchool",
					crossDomain: true,
					params: {
						schoolNum: this.schoolInfo.schoolNum,
						schoolName: this.schoolInfo.schoolName,
						location: this.schoolInfo.location,
						isSelf: this.schoolInfo.isSelf,
						official: this.schoolInfo.official,
						isHave: this.schoolInfo.isHave,
						features: this.schoolInfo.features
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
					}
				})
			},
			addinformation() {
				this.$axioss({
					method: "post",
					url: this.HOST + "/insertInformation",
					crossDomain: true,
					data: this.information
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			}
		},
		mounted() {
			this.getAudit();
		}
	}
</script>
<style>
	.admin-header {
		position: absolute;
		width: 100%;
		height: 70px;
		top: 0px;
		left: 0px;
		font-size: 22px;
		color: #fff;
		background: #242f42;
	}

	.admin-logo {
		margin-left: 10px;
		width: 250px;
		line-height: 70px;
	}

	.admin-header-right {
		float: right;
		padding-right: 50px;
	}

	.admin-avatar img {
		display: block;
		width: 40px;
		height: 40px;
		margin-top: -55px;
		position: absolute;
		border-radius: 50%;
		right: 90px;
	}

	.admin-name {
		right: 25px;
		margin-top: -45px;
		position: absolute;
	}

	.el-dropdown-link {
		color: #fff;
		cursor: pointer;

	}

	.admin-el-menu {
		width: 10%;
		height: 95%;
		margin-top: 60px;
		left: 0px;
		position: absolute;
	}

	.el-menu-item {
		margin-top: 30px;
	}

	.tab-card {
		position: absolute;
		width: 100%;
		height: 500%;
		background-color: #42b983;
	}
</style>
