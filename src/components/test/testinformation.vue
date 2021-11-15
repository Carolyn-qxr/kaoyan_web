<template>
	<el-container>
		<el-header class="header">
			<div style="position:absolute;top:4.2%">
				<h1>资料库</h1>
			</div>
			 <i class="el-icon-house" style="position:absolute;left:15%;top:12.3%;font-color:#909399;font-size:0.9em" @click="gohome">首页</i>
		</el-header>
		<div class="tiao">

		</div>
		<el-main>

			<el-page-header @back="goBack">
			</el-page-header>
			<div class="box-card">
				<h1>{{test.title}}</h1>

				<el-row :gutter="20">
					<el-col :span="2"> <span>作者：{{test.author}}</span></el-col>
					<el-col :span="3"> <i class="el-icon-view"><span>{{test.views}}</span></i> </el-col>
					<el-col :span="4"> <span>科目分类：{{courseType1}}</span> </el-col>
					<el-col :span="4"> <span>专业编号：{{test.couresname}}</span> </el-col>
					<el-col :span="4"> <span>上传时间：{{dateFormat('YYYY-mm-dd',test.upload)}}</span> </el-col>
				</el-row>
				<br>
				<span style="margin-left:4%">{{test.content}}</span>
				<br><br>
				<el-divider></el-divider>
				<span>下载区</span>
				<br>
				<br>
				<el-col :span="4" v-for="(information,index) in location" :key="index">
					<div style="width:200px;height:100px">
						<div style="position:relative;top:-15px">
							<p>下载文件{{index+1}}
							</p>
							<el-button size="mini" type="primary" style="margin-left:3%"
								@click="geturl(information.location)"> 下载</el-button>
							<!-- <a :href="geturl(information.location)">xxxx</a> -->
						</div>
					</div>
				</el-col>
			</div>

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
			 gohome(){
				this.$router.push({
					path: '/home'
				});
			},
			geturl(location) {
				//var a=location.split(".");
				var url = this.HOST + location;
				//return url;
				window.location.href = url;
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
			getTestfile() {
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
			},
			dateFormat(fmt, date) {
				let ret = "";
				date = new Date(date);
				const opt = {
					'Y+': date.getFullYear().toString(), // 年
					'm+': (date.getMonth() + 1).toString(), // 月
					'd+': date.getDate().toString(), // 日
					// 'H+': date.getHours().toString(), // 时
					// 'M+': date.getMinutes().toString(), // 分
					// 'S+': date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				}
				for (let k in opt) {
					ret = new RegExp('(' + k + ')').exec(fmt)
					if (ret) {
						fmt = fmt.replace(
							ret[1],
							ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
						)
					}
				}
				return fmt
			}
		}
	}
</script>

<style scoped>
	.box-card {
		margin-top: 2%;
		margin-bottom: 6%;
		margin-right: 5%;
		margin-left: 5%;
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
</style>
