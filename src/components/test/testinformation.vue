<template>
	<el-container>
		<el-main>
			<h1>资料库</h1>
			<el-divider></el-divider>
			<el-page-header @back="goBack">
			</el-page-header>
			<el-card class="box-card">
				<h1>{{test.title}}</h1>

				<el-row :gutter="20">
					<el-col :span="2"> <span>作者：{{test.author}}</span></el-col>
					<el-col :span="3"> <i class="el-icon-view"><span>{{test.views}}</span></i> </el-col>
					<el-col :span="4"> <span>科目分类：{{courseType1}}</span> </el-col>
					<el-col :span="4"> <span>专业编号：{{test.couresname}}</span> </el-col>
					<el-col :span="4"> <span>上传时间：{{test.upload}}</span> </el-col>
				</el-row>
				<br>
				<span style="margin-left:4%">{{test.content}}</span>
				<br><br>
				<el-divider></el-divider>
				<span>下载区</span>
				<br>
				<br>
				<el-col :span="5" v-for="(information,index) in location" :key="index">
					<el-card class="box-card">
						<p>{{information}}
						</p>
						<el-button type="primary" style="margin-left:60%" @click="geturl(information.location)"> 下载</el-button>
						<!-- <a :href="geturl(information.location)">xxxx</a> -->
					</el-card>
				</el-col>
			</el-card>

		</el-main>

	</el-container>
</template>

<script>
	export default {
		computed: {
			userName() {
				return this.$store.state.username;
			},
			courseType1() {
				switch (this.test.coursetype) {
					case 0:
						return "政治";
						break;
					case 1:
						return "英语";
						break;
					case 2:
						return "数学";
						break;
					case 3:
						return "专业课";
						break;
					default:
						return "其他";
				}
			}
		},
		data() {
			return {
				testId: "",
				location: ["zip", "zip"],
				test: {
					author: "test",
					content: "1111",
					couresname: "政治(101)",
					courseid: 6,
					coursetype: 0,
					location: null,
					state: 1,
					testid: 17,
					title: "测试一",
					upload: "2021-10-28T02:05:52.000+00:00",
					views: 0
				}
			}
		},
		created() {
			this.getTestInformation();
			this.getTestfile();
		},
		methods: {
			geturl(location){
				//var a=location.split(".");
				var url = this.HOST + location;
				//return url;
				window.location.href=url;
				// this.axios({
				//    url: url, // 服务器上pdf路径
				//    method: 'get',
				//    responseType: 'blob'
				//  }).then(res => {
				//    // eslint-disable-next-line no-undef
				//    // console.log(res)
				//    const FileSaver = require('file-saver')
				//    const blob = new Blob([res], { type: 'image/png;charset=utf-8' }) // 此处type根据你想要的
				//    FileSaver.saveAs(blob,"111") // 下载的name文件名
				//  }).catch(err => {
				//    // eslint-disable-next-line no-undef
				//    console.log(err)
				//  })
			},
			getTestInformation() {
				this.testId = this.$route.query.testId;
				this.axios({
					methods: "get",
					url: this.HOST + "/getTestById",
					params: {
						testId: this.testId
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.test = response.data.data;
					}
				})
			},
			getTestfile(){
				this.testId = this.$route.query.testId;
				this.axios({
					methods: "get",
					url: this.HOST + "/getTestFileAll",
					params: {
						testId: this.testId
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.location = response.data.data;
					}
				})
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.box-card {
		margin-top: 2%;
		margin-bottom: 6%
	}
</style>
