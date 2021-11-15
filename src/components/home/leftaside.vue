<template>
	<div>
		<el-card class="box-card" style="height:250px">
			<div slot="header">
				<span>院校库</span>
				<el-button type="text" style="margin-left:70%" @click="gotoschoolsearch">前往</el-button>
			</div>
			<el-col :span="8" v-for="(name,index) in school" :key="index">
				<el-button type="text" @click="gotoSchool(name.schoolname)">{{name.schoolname}}</el-button>
			</el-col>
		</el-card>
		<br>
		<br>
		<el-card class="box-card" style="height:250px">
			<div slot="header">
				<span>资料库</span>
				<el-button type="text" style="margin-left:70%" @click="gototestsearch">前往</el-button>
			</div>
			<el-col :span="8" v-for="(name,index) in subject" :key="index">
				<el-button  type="text" @click="gotoTest(name.courseid,name.coursetype)">{{name.coursename}}</el-button>
			</el-col>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				school: [],
				subject: []
			}
		},
		methods: {
			gotoschoolsearch() {
				this.$router.push({
					path: '/schoolsearch'
				});
			},
			gototestsearch() {
				this.$router.push({
					path: '/testsearch'
				});
			},
			getcourse() { //获取所有专业
				this.$axioss({
					method: "get",
					url: this.HOST + "/getAllCourse",
					crossDomain: true,
					params: {}
				}).then(response => {
					if (response.data.code == "200") {
						this.subject = response.data.data; //这里要不要分页

					}
				})
			},
			getschool() { //获取所有的学校
				this.$axioss({
					method: "get",
					url: this.HOST + "/getAllSchool",
					crossDomain: true,
					params: {}
				}).then(response => {
					if (response.data.code == "200") {
						this.school = response.data.data.data;

					}
				})
			},
			gotoSchool(schoolname) {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getSchoolByName",
					crossDomain: true,
					params: {
						schoolName: schoolname
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.$router.push({
							path: '/schoolinformation',
							query: {
								schoolNum: response.data.data.data[0].schoolnum,
								schoolName: schoolname
							}
						});
					}
				})
			},
			gotoTest(id,type){
				this.$router.push({
					path: '/testsearch',
					query: {
						id: id,
						type: type
					}
				});
			}
			
		},
		mounted() {
			this.getschool();
			this.getcourse();
		}
	}
</script>
