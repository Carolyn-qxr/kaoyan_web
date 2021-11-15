<template>
	<el-container>
		<el-header class="header">
			<homeheader></homeheader>
		</el-header>
		 <div class="tiao">

        </div>
		<el-container>
			<el-main>
				<el-page-header @back="goBack" content="公告">
				</el-page-header>
				<br>
				<div class="box-card">
					<el-col v-for="(information,index) in notice" :key="index">
						
						<h1>{{information.title}}</h1>
						<el-col :span="15"><span>{{information.content.substring(0,50)}}...</span></el-col>

						<el-col :span="5"><i class="el-icon-view" style="margin-left:70%"> {{information.views}}</i>
						</el-col>
						<el-col :span="2">
							<el-button type="text" @click="gotoNoticeInformation(information.noticeid)" style="margin-top:-7px">查看</el-button>
						</el-col>
				
						<br>
						<el-divider></el-divider>
					</el-col>
				</div>
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
				notice: [{title:"aaaaaaa" ,content:"aaaaaaa",views:1}]
			}
		},
		methods: {
			goBack() {   //路由会有问题
				this.$store.commit("editTitle", "");
				this.$router.go(-1);
			},
			//通过公告id从后端获取公告
			gotoNoticeInformation(noticeid) {
				this.$router.push({
					path: '/noticeinformation',
					query: {
						noticeid: noticeid
					}
				});
			},
			//搜索栏通过title模糊查找公告
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
		height: 120px !important;
		margin-top: -10px;
        margin-left: -10px;
        margin-right: -10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.box-card {
		margin-left: 5%;
		margin-right: 5%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

	}
	.tiao{
    height: 10px;
    width:102%;
    margin-left:-10px;
    background-color:	#00aeef;
	}
</style>
