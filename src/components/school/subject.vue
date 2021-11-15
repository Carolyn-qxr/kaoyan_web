<template>
	<el-container>
		<el-header class="header">
			<div class="font">
				<h1>硕士专业目录</h1>
			</div>
			 <i class="el-icon-house" style="position:absolute;left:15%;top:12.3%;font-color:#909399;font-size:0.9em" @click="gohome">首页</i>
		</el-header>
		<div class="tiao">

		</div>
		<el-main>
			<el-page-header @back="goBack">
			</el-page-header>
			<!-- 考试信息 -->
			<div class="box-card">
				<el-card>
					<el-row :gutter="20">
						<el-col :span="10">
							<h4>招生单位：{{schoolName}}</h4>
						</el-col>
						<el-col :span="10">
							<h4>考试方式：{{examMethod}}</h4>
						</el-col>
						<el-col :span="10">
							<h4>专业：{{subjectName}}</h4>
						</el-col>
						<el-col :span="10">
							<h4>学习方式：{{studyMethod}}</h4>
						</el-col>
						<el-col :span="10">
							<h4>研究方式：{{direction}}</h4>
						</el-col>
						<el-col :span="10">
							<h4>拟招人数：{{peopleNum}}</h4>
						</el-col>
					</el-row>
					<el-divider></el-divider>
					<h2>考试范围</h2>
					<el-row :gutter="20">
						<el-col :span="6">
							<h4>政治</h4>
						</el-col>
						<el-col :span="6">
							<h4>外语</h4>
						</el-col>
						<el-col :span="6">
							<h4>业务课一</h4>
						</el-col>
						<el-col :span="6">
							<h4>业务课二</h4>
						</el-col>
						<el-col :span="6">
							<h4>{{politics}}</h4>
						</el-col>
						<el-col :span="6">
							<h4>{{english}}</h4>
						</el-col>
						<el-col :span="6">
							<h4>{{course1}}</h4>
						</el-col>
						<el-col :span="6">
							<h4>{{course2}}</h4>
						</el-col>
						<el-col :span="6">
							<el-button type="text" @click="gototestsearch(politics)">查看历年真题</el-button>
						</el-col>
						<el-col :span="6">
							<el-button type="text" @click="gototestsearch(english)">查看历年真题</el-button>
						</el-col>
						<el-col :span="6">
							<el-button type="text" @click="gototestsearch(course1)">查看历年真题</el-button>
						</el-col>
						<el-col :span="6">
							<el-button type="text" @click="gototestsearch(course2)">查看历年真题</el-button>
						</el-col>

					</el-row>

				</el-card>
			</div>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				inforId: "1",
				schoolName: "北京大学",
				examMethod: "统考",
				subjectName: "(专业学位)电子信息",
				peopleNum: "55",
				studyMethod: "全日制",
				direction: "(01)软件工程",
				politics: "思政(101)",
				english: "英一(201)",
				course1: "数一(301)",
				course2: "综合(408)",
				coursetable: []
			}
		},
		created() {
			this.getsubjectinformation();

		},

		methods: {
			 gohome(){
				this.$router.push({
					path: '/home'
				});
			},
			//初始化课程科目表格
			getcoursetable(resp) {
				this.inforId = this.$route.query.inforId;
				this.$axioss({
					method: "get",
					url: this.HOST + "/getAllCourse",
					crossDomain: true,
					dataType: 'jsonp',
				}).then(response => {
					if (response.data.code == "200") {
						this.coursetable = response.data.data;
						this.politics = this.coursetable.find(item => item.courseid === resp.data.data.politics)
							.coursename;
						this.english = this.coursetable.find(item => item.courseid === resp.data.data.english)
							.coursename;
						this.course1 = this.coursetable.find(item => item.courseid === resp.data.data.course1)
							.coursename;
						this.course2 = this.coursetable.find(item => item.courseid === resp.data.data.course2)
							.coursename;
					}

				})
			},
			//通过专业id从后台获取考试科目范围
			getsubjectinformation() {
				this.inforId = this.$route.query.inforId;
				this.$axioss({
					method: "get",
					url: this.HOST + "/getInformationById",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						inforId: this.inforId
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.getcoursetable(response);
						this.schoolName = response.data.data.schoolname;
						this.examMethod = response.data.data.exammethod;
						this.subjectName = response.data.data.subjectname;
						this.peopleNum = response.data.data.peoplenum;
						this.studymethod = response.data.data.studymethod;
					}
				})
			},
			goBack() {
				this.$router.go(-1);
			},
			//跳转资料库
			gototestsearch(subject) {
				this.$router.push({
					path: '/testsearch',
					query: {
						keyword: subject
					}
				});
			}
		}
	}
</script>
<style scoped>
	.box-card {
		margin-top: 2%;
		margin-left: 5%;
		margin-right: 5%;

	}

	.header {
		height: 120px !important;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.tiao {
		height: 10px;
		width: 102%;
		margin-left: -10px;
		background-color: #00aeef;
	}

	.title {
		position: absolute;
		top: 4.5%
	}

	.font {
		position: absolute;
		top: 4.5%;
	}
</style>
