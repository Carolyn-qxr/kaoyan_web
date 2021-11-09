<template>
	<el-container>
		<el-header class="header">
			<homeheader></homeheader>
		</el-header>
		<el-container>
			<el-main>
				<el-page-header @back="goBack" content="资料分类">
				</el-page-header>
				<uploadtest></uploadtest>
				<el-card class="box-card">
					<h4>科目分类 </h4>
					<div style="margin-left:10%">
						<el-radio-group v-model="courseType" @change="getTestBycourseType()" size="small">
							<el-radio-button v-for="(course,index) in coursesort " :key="index" :label="index">
								{{course}}
							</el-radio-button>
						</el-radio-group>
						<br>
					</div>
					<h4>专业编号分类 </h4>
					<div style="margin-left:10%">
						<el-radio-group v-model="courseName" @change="getTestBycourseName(0,8)" size="small">
							<el-radio-button v-for="(course,index) in courseNum " :key="index" :label="course.courseid">
								{{course.coursename}}
							</el-radio-button>
						</el-radio-group>
					</div>
					<br><br><br>
					<el-card class="box-card">
						<el-table :data="test" style="width:100%">
							<el-table-column prop="title" label="标题" width="650">
							</el-table-column>
							<el-table-column prop="author" label="作者" width="100">
							</el-table-column>
							<el-table-column prop="views" label="浏览人数" width="100">
							</el-table-column>
							<el-table-column prop="information" label="详细信息">
								<template slot-scope="scope">
									<el-button type="text" @click="gotoTestInformation(scope.row.testid)">查看</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-card>
				</el-card>
				<div class="block">
					<el-pagination layout="prev, pager, next" :total="this.pageAllSize*10" @current-change="PageChage">
					</el-pagination>
				</div>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	import homeheader from '../home/homeheader.vue'
	import uploadtest from './uploadtest.vue'
	export default {
		computed: {
			title() {
				return this.$store.state.title;
			}
		},
		data() {
			return {
				coursesort: ["政治", "英语", "数学", "专业课"],
				courseNum: [],
				test: [],
				userName: "",
				courseName: -1,
				courseType: "0", //课程种类
				pageAllSize: 0

			}
		},
		methods: {
			PageChage(x){
				this.getTestBycourseName(x,8);
			},
			goBack() {
				this.$store.commit("editTitle", "");
				this.$router.go(-1);
			},
			gotoTestInformation(testId) {
				this.$router.push({
					path: '/testinformation',
					query: {
						testId: testId
					}
				});
			},
			getTestBycourseName(pageNum, pageSize) {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getTestByCourse",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						title: this.title,
						courseId: this.courseName,
						courseType: this.courseType,
						pageNum: pageNum,
						pageSize: pageSize
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.test = response.data.data.data
						this.pageAllSize = response.data.data.totalPages;
					}
				})

			},
			getTestBycourseType() { //通过大类查找
				this.$axioss({
					method: "get",
					url: this.HOST + "/getCourseByType",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						courseType: this.courseType,
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.courseNum = response.data.data;
						this.courseName = -1;
						this.getTestBycourseName(0, 8); //选择大课程的所有资料
					}
				})
			},
		},
		components: {
			homeheader,
			uploadtest
		},
		mounted() {
			var id = this.$route.query.id;
			var type = this.$route.query.type;
			if (id != null && type != null) {
				this.courseName = id;
				this.courseType = type;
				this.$axioss({
					method: "get",
					url: this.HOST + "/getCourseByType",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						courseType: this.courseType
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.courseNum = response.data.data;
						this.getTestBycourseName(); //选择大课程的所有资料
					}
				})
			} else
				this.getTestBycourseType();
		},
		watch: {
			title(n, o) {
				this.getTestBycourseName();
			}
		}
	}
</script>
<style scoped>
	.header {
		height: 200px !important;
	}

	.box-card {
		margin-left: 10%;
		margin-right: 10%;
		margin-top: 5px;
		margin-bottom: 10px;
	}
</style>
