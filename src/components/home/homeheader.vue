<template>
	<div>
		<el-row>
			<el-image :src="logourl" class="image" @click="gohome()"></el-image>
			<el-input placeholder="请输入内容" v-model="searchinput" class="searchinput" >
				<el-select v-model="select" slot="prepend" placeholder="请选择" style=" width: 100px;" >
					<el-option label="公告" value="1"></el-option>
					<el-option label="院校" value="2"></el-option>
					<el-option label="资料" value="3"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
			<i class="el-icon-house" style="position:absolute;left:85%;top:55%;font-color:#909399;font-size:0.9em" @click="gohome">首页</i>
			<el-avatar v-if="!visable" :size="45" :src="imageurl" class="avatar"></el-avatar>
			
			<div class="avatar-bottom">
				<!--用户名下拉菜单-->
				<el-dropdown  @command="handleCommand">
					
					<span class="el-dropdown-link" style="color:#606266">
						{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu>
							<el-dropdown-item divided command="login" v-show="userName=='未登录'">登录</el-dropdown-item>
							<el-dropdown-item divided command="zhuce" v-show="userName=='未登录'">注册</el-dropdown-item>
							<el-dropdown-item divided command="logout" v-show="userName!='未登录'">登出</el-dropdown-item>
						</el-dropdown-menu>
				</el-dropdown>
				<!-- <el-button type="text" v-if="visable" style="margin-left:15%;margin-top:-100px"   @click="login()">登录</el-button>
				<el-button type="text" v-if="visable" style="margin-left:3% ;margin-top:-100px" @click="register()">注册</el-button>
				<el-avatar v-if="!visable" :size="50" :src="imageurl" style="margin-left:15% "></el-avatar>
				<a v-if="!visable" style="margin-left: 20px;">{{userName}}</a> -->
			</div>
		</el-row>
		
	</div>
</template>
<script>
	export default {
		created(){
			if(this.$store.state.username == ""){
				this.userName="未登录"
			}
		},
		computed: {
			visable(){
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
				logourl: require("../assets/font2.png"),
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
			gohome(){
				this.$router.push({
					path: '/home'
				});
			},
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
			handleCommand(command) {
				if (command == "login") {
					this.login()
				} else if(command=="logout"){
					this.$axioss({
						method: "post",
						url: this.HOST + "/logout",
						crossDomain: true,
					}).then(response => {
						if (response.data.code == "200") {
							alert(response.data.msg); 
							this.$store.commit('addUserName','');
							this.created()
						}
					})
					
				}else{
					this.register();
				}

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
		width: 500px;
		margin-left: 5%;
		top: -40px
	}

	.image {
		width: 400px;
		height: 100px;
		margin-left: 2%;

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
	.avatar-bottom{
		position: absolute;
		margin-left: 95%;
		top:70px;
	}
	.avatar{
		position: absolute;
		margin-left: 95px;
		top: 58px;
	}
</style>
