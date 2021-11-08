<template>
	<el-container>
		<el-header class="header">
			<homeheader></homeheader>
		</el-header>
		<el-container>
			<el-main>
				<el-page-header @back="goBack" content="公告">
				</el-page-header>
				<br>
				<el-card class="box-card">
					<el-col v-for="(information,index) in notice" :key="index">
						<!-- <el-card class="box-card"> -->
						<h1>{{information.title}}</h1>
						<el-col :span="15"><span>{{information.content}}</span></el-col>

						<el-col :span="5"><i class="el-icon-view" style="margin-left:70%"> {{information.views}}</i>
						</el-col>
						<el-col :span="2">
							<el-button type="text" @click="gotoNoticeInformation(information.noticeid)">查看</el-button>
						</el-col>
						<!-- </el-card> -->
						<br>
						<el-divider></el-divider>
					</el-col>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
	import homeheader from '../home/homeheader.vue'

	export default {
		computed: {
			title() {
				return this.$store.state.title;
			}
		},
		data() {
			return {
				notice: []
			}
		},
		methods: {
			goBack() {   //路由会有问题
				this.$store.commit("editTitle", "");
				this.$router.go(-1);
			},
			gotoNoticeInformation(noticeid) {
				this.$router.push({
					path: '/noticeinformation',
					query: {
						noticeid: noticeid
					}
				});
			},
			getNotice() {   
				this.$axioss({
					method: "get",
					url: this.HOST + "/getNoticeByTitle",
					crossDomain: true,
					params: {
						title:this.title
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.notice = response.data.data;

					}
				})
			}
		},
		components: {
			homeheader
		},
		watch:{
			title(n,o){
				this.getNotice();
			}
		},
		mounted() {
			this.getNotice();
		}
	}
</script>

<style scoped>
	.header {
		height: 150px !important;
	}

	.box-card {
		margin-left: 10%;
		margin-right: 10%;
	}
</style>
