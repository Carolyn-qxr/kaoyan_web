<template>
	<div>
		<el-row>
			<el-avatar shape="square" :size="100" :src="logourl" class="image"></el-avatar>
			<el-input placeholder="请输入内容" v-model="searchinput" class="searchinput">
				<el-select v-model="select" slot="prepend" placeholder="请选择" style=" width: 100px;">
					<el-option label="公告" value="1"></el-option>
					<el-option label="院校" value="2"></el-option>
					<el-option label="资料" value="3"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
			<el-button type="text" v-if="visable" style="margin-left:15%" @click="login()">登录</el-button>
			<el-button type="text" v-if="visable" style="margin-left:3%" @click="register()">注册</el-button>
			<el-avatar v-if="!visable" :size="50" :src="imageurl" style="margin-left:15% "></el-avatar>
			<a v-if="!visable" style="margin-left: 20px;">{{userName}}</a>
		</el-row>
		<el-row style="margin-left: 32%;">
			<el-col :span="2" v-for="(message,index) in information" :key="index">
				<el-button type="text" style="margin-left:3%;">{{message.name}}</el-button>
			</el-col>
		</el-row>
		<el-divider></el-divider>
	</div>
</template>
<script>
	export default {
		computed: {
			visable() {
				if (this.$store.state.username == "")
					return true;
				else
					return false;
			},
			title() {
				return this.$store.state.title;
			}
		},
		data() {
			return {
				searchinput: "",
				select: "1",
				logourl: require("../assets/logo.png"),
				imageurl: require("../assets/img.png"),
				userName: this.$store.state.username,
				information: [{
						name: "(综合)408"
					},
					{
						name: "(软件)893"
					},
					{
						name: "北京工业大学"
					},
					{
						name: "北京信息科技大学"
					}
				],
				drawer: true,

			}

		},
		// created(){
		//     this.getkeyword();
		// },
		methods: {
			login() {
				this.$router.push({
					path: '/login'
				});
			},
			register() {
				this.$router.push({
					path: '/register'
				});
			},
			search() {
				this.$store.commit("editTitle", this.searchinput);
				if (this.select == "1") {
					this.$router.push({
						path: '/noticesearch',
						query: {
							keyword: this.searchinput
						}
					});
				}
				if (this.select == "2") {
					this.$router.push({
						path: '/schoolsearch',
						query: {
							keyword: this.searchinput
						}
					});
				}
				if (this.select == "3")
					this.$router.push({
						path: '/testsearch',
						query: {
							keyword: this.searchinput
						}
					});
			},
			// getkeyword(){
			//     if(keyword!=null )
			//       this.searchinput=keyword;
			// }


		},
		mounted() {
			this.searchinput = this.title;
		},

	}
</script>

<style scoped>
	.searchinput {
		width: 600px;
		margin-left: 15%;
		top: -10px
	}

	.image {
		width: 200px;
		height: 100px;
		margin-left: 10%;
		margin-top: 20px;
	}

	.Img1 img {
		width: 50px;
		height: 50px;
		position: absolute;
		border-radius: 50%;
		top: 10%;
		left: 10%;
	}

	.changeInfo {
		position: absolute;
		left: 75%;
		top: 16%;
	}

	.Img img {
		width: 40px;
		height: 40px;
		position: absolute;
		border-radius: 50%;
		top: 22%;
		left: 25%;
	}
</style>
