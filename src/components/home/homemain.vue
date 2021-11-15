<template>
	<div>
		<el-col class="block">
			<el-carousel height="300px;" :interval="10000" arrow="always">
				<el-carousel-item v-for="(img,index) in noticeimg" :key="index" type="card">
					<el-image :src="img.url" :fit="fit" style="width: 100%;"></el-image>
				</el-carousel-item>
			</el-carousel>
		</el-col>
		<el-col class="notice">
			<el-card class="box-card" style="height:225px">
				<div slot="header">
					<span style="font-size:1.2em">公告</span>
				</div>
				<el-col v-for="(title,index) in notice" :key="index">
					<el-col :span="18">
						<span style="font-size:1em">{{title.title}}</span>
					</el-col>
					<el-col :span="3"><i class="el-icon-view" style="font-size:0.5em"> {{title.views}}</i></el-col>
					<el-col :span="3">
						<el-button type="text" @click="gotoNoticeInformation(title.noticeid)" size="small"
							style="margin-top:-3px">查看</el-button>
					</el-col>
				</el-col>
			</el-card>
		</el-col>
		<div class="bottom">

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				fit: "contain",
				noticeimg: [{
					url: require("../assets/test.jpg")
				}, {
					url: "https://t2.chei.com.cn/axvert/img/3080687852.jpg"
				},{
					url: "https://t2.chei.com.cn/axvert/img/3375636399.jpg"
				},{
					url: "https://t1.chei.com.cn/axvert/img/1867763254.jpg"
				}],
				notice: [],
			}
		},
		methods: {
			gotoNoticeInformation(noticeid) {
				this.$router.push({
					path: '/noticeinformation',
					query: {
						noticeid: noticeid
					}
				});
			},
			getNotice() { //获取前三名公告
				this.$axioss({
					method: "get",
					url: this.HOST + "/getNoticeTop",
					crossDomain: true,
					params: {}
				}).then(response => {
					if (response.data.code == "200") {
						this.notice = response.data.data;

					}
				})
			}
		},
		mounted() {
			this.getNotice();
		}
	}
</script>

<style scoped>
	.block {
		width: 69%;
		margin-left: 10%;
	}

	.notice {
		margin-top: 1%;
		width: 69%;
		margin-left: 10%;

	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
