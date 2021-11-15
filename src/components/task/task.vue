<template xmlns:el-table="http://www.w3.org/1999/html">
	<div class="task">
		<div class="navigation-bar">
			<el-image :src="logourl" style="position:absolute;width:300px;height:70px;left:10px;top:13px" @click="gohome()"></el-image>
			<div class="record">
				<span div class="text1">已连续打卡:
					<span style="color: darksalmon">{{"\xa0"+this.userInfo.days}}天</span>
				</span>
				<el-button div class="daka" size="mini" @click="daka">打卡</el-button>

				<el-button div class="add" circle icon="el-icon-plus" @click="dialogVisible=true" size="mini"></el-button>
			</div>
			<div class="daojishi">
				<span class="text2">距离考研还剩：{{"\xa0"+daojishi}}天</span>
			</div>
			 <i class="el-icon-house" style="position:absolute;left:83%;top:45%;font-color:#909399;font-size:0.9em" @click="gohome">首页</i>
			<div class="avatar">
				<div class="Img">
					<img @click="drawer=true" src="../assets/img/avatar.jpg" />
				</div>
				<el-dropdown class="username" @command="logout()">
					<span>{{username}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>退出登录</el-dropdown-item>
						<el-dropdown-item>切换账号</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div>
			<el-col>
				<el-menu style="position:absolute;width: 150px;top: 17%" :uniqueOpened="true"
					default-active="$router.path" router active-text-color="#48D1CC">

					<el-menu-item index="/task/home">
						<i class="el-icon-s-home">{{"\xa0"}}</i>
						<template #title>任务列表</template>
					</el-menu-item>
					<el-menu-item index="/task/calender" class="el-menu-item">
						<i class="el-icon-date">{{"\xa0"}}</i>
						<template #title>任务日历</template>
					</el-menu-item>
				</el-menu>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-col>
		</div>
		<el-drawer title="个人信息" :visible.sync="drawer" :direction="direction">

			<div class="userInfo1">
				<div class="changeInfo">
					<i class="iconfont icon-icon-xiugai" @click="dialogVisible2 = true"></i>
					<el-tag effect="plain" size="mini" type="info" @click="dialogVisible2 = true">修改信息</el-tag>
				</div>
				<div class="Img1">
					<img @click="drawer=true" src="../assets/img/avatar.jpg" />
				</div>
				<span style="position:absolute;left: 26%" class="textfont">昵称：{{username}}</span>
				<br>
				<span style="position:absolute;left: 26%" class="textfont">打卡天数：{{this.userInfo.days}}天</span><br><br>
			</div>
			<el-divider style="margin-top: 0px" content-position="left">加油</el-divider>
			<el-descriptions :column="1" size="size" border style="margin-top: -10px">
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-mobile-phone"></i>
						手机号
					</template>
					{{this.userInfo.phone}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="iconfont icon-time"></i>
						注册时间
					</template>
					{{this.createTime}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="iconfont icon-daka"></i>
						打卡天数
					</template>
					<el-tag size="small">{{this.userInfo.days}}天</el-tag>
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="iconfont icon-gerenjianjie"></i>
						个人简介
					</template>
					{{this.userInfo.profile}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="iconfont icon-zhuangtai"></i>
						状态
					</template>
					{{this.userstate}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="iconfont icon-jiaose"></i>
						角色
					</template>
					{{userrole}}
				</el-descriptions-item>
			</el-descriptions>
			<img style="position: absolute;margin-left: 30px;margin-top: 20px" src="../assets/img/bottom.jpg" />

		</el-drawer>
		<!--修改个人信息 -->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible2"
		  width="30%">
		  <el-form  label-width="80px" :model="userInfo">
		    <el-form-item label="手机号">
		      <el-input v-model="userInfo.phone"></el-input>
		    </el-form-item>
		    <el-form-item label="个人简介">
		      <el-input v-model="userInfo.profile"></el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="changeInfo()">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<!--添加任务对话框-->
		<el-dialog title="添加今日任务" :visible.sync="dialogVisible" width="30%">
			<!--内部嵌套添加每日任务信息表单-->
			<el-form :model="plan" label-position="left" size="small">
				<el-form-item label="任务名称">
					<el-input v-model="plan.planname" style="width: 245px"></el-input>
				</el-form-item>
				<el-form-item label="任务日期">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="plan.plandate" style="width: 245px">
						</el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item prop="planInfo" label="具体信息">
					<el-input v-model="plan.information" style="width: 245px" type="textarea" :rows="2" maxlength="20">

					</el-input>
				</el-form-item>
				<span>开始时间</span>
				<el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
                      start: '06:00',
                      step: '00:30',
                      end: '22:00'
                    }">
				</el-time-select>
				<p></p>
				<span>结束时间</span>
				<el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
                      start: '06:30',
                      step: '00:30',
                      end: '22:30',
                      minTime: startTime
                    }">
				</el-time-select>
			</el-form>

			<span slot="footer" style="margin-right: 100px;margin-top: -10px">
				<el-button @click="dialogVisible = false" size="small" plain>取 消</el-button>
				<el-button type="primary" @click="insertPlan()" size="small" plain>确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import * as dateUtils from "../../util/myDate.js"
	export default {
		computed: {
			createTime() { //获取注册时间
				let d = new Date(this.userInfo.createdate);
				return dateUtils.formatDate(d, 'yyyy-MM-dd');
			},
			userstate() { //获取用户状态
				if (this.userInfo.state == 1) {
					return "在线";
				} else {
					return "异常";
				}
			},
			userrole() {
				if (this.userInfo.role == "ROLE_user") {
					return "普通用户";
				} else
					return "管理员";
			},
			username() {
				return this.$store.state.username;
			},

		},
		data() {
			return {
				logourl: require("../assets/font2.png"),
				dialogVisible2:false,
				daojishi: this.days,
				/*用户信息*/
				userInfo: {},
				/***/
				drawer: false,
				direction: 'rtl',
				dialogVisible: false,
				data: '', //接收后端传入的所有个人信息
				plan: {
					user: "",
					information: "111",
					begin: "",
					end: "",
					plandate: "",
					createdate: new Date(),
					planname: "111",
					state: 0
				},
				startTime: '',
				endTime: '',
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 3600 * 1000 * 24;
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '明天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周后',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				}
			}
		},
		methods: {
			 gohome(){
				this.$router.push({
					path: '/home'
				});
			},
			insertPlan() { //插入任务
				this.dialogVisible = false;
				this.plan.begin = this.startTime;
				this.plan.end = this.endTime;
				this.plan.user = this.username;

				this.$axioss({
					method: "post",
					url: this.HOST + "/insertPlan",
					crossDomain: true,
					data: this.plan
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
						this.$store.commit("planchange", 1); //更新任务列表
					}
				})
			},
			getUserInfo() { //通过用户名获取用户信息
				this.$axioss({
					method: "get",
					url: this.HOST + "/getUserByName",
					crossDomain: true,
					params: {
						userName: this.username,
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.userInfo = response.data.data[0];
					}
				})
			},
			daka() {
				this.$axioss({
					method: "post",
					url: this.HOST + "/clock",
					crossDomain: true,
					params: {
						userName: this.username
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
						this.$store.commit("planchange", 1); //更新任务列表
						this.getUserInfo();
					}
				})
			},
			changeInfo() {
				var user={
					days: this.userInfo.days,
					password: this.userInfo.password,
					phone: this.userInfo.phone,
					profile: this.userInfo.profile,
					role: this.userInfo.role,
					state: this.userInfo.state,
					username: this.userInfo.username,
					createdate:this.userInfo.createdate
				}
				this.$axioss({
					method: "post",
					url: this.HOST + "/upDateUser",
					data:user
				}).then(response => {
					this.dialogVisible2=false;
				})
			},
			/*提交修改信息*/
			submit() {
				this.$message.success("修改成功")
			},
			goback(){ //返回主界面
				this.$router.push('/home');
			},
			logout(){  //登出
				this.$axioss({
					method: "post",
					url: this.HOST + "/logout",
					crossDomain: true,
					params: {
					}
				}).then(response => {
					this.$store.commit('addUserName',"");
					this.$router.push('/home');
				})
				
			}

		},
		mounted() {
			this.getUserInfo();
		}
	}
</script>
<style>
	.task {
		position: absolute;
		width: 100%;
		height: 100%;
		/*background-image: url("../assets/img/background.jpg");*/
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
	}

	.navigation-bar {
		position: fixed;
		width: 100%;
		display: flex;
		top: 0px;
		height: 14%;
		border-bottom: #eeeeee solid 2px;
		z-index: 1000;
	}

	.divider {
		margin-top: 6.7%;
	}

	.task-contain {
		position: absolute;
		top: 14%;
		height: 100%;
		width: 90%;
		left: 13%;
	}

	.sidebar {
		position: absolute;
		top: 16%;
		height: 90%;
		width: 100px;
	}

	.record {
		position: absolute;
		width: 35%;
		height: 100%;
		left: 22%;
	}

	.text1 {
		position: absolute;
		top: 20%;
		font-size: 1.5em;
		font-weight: bold;
		color: #409EFF;
	}

	.daka {
		position: absolute;
		left: 0%;
		top: 60%;
	}

	.add {
		position: absolute;
		left: 15%;
		top: 60%;
	}

	.daojishi {
		position: absolute;
		width: 40%;
		height: 100%;
		left: 45%;
	}

	.text2 {
		position: absolute;
		top: 20%;
		font-size: 2.2em;
		font-weight: bold;
		color: hotpink;
	}

	.avatar {
		position: absolute;
		width: 20%;
		left: 85%;
		height: 100%;
		top:6.7%
	}

	.Img img {
		width: 40px;
		height: 40px;
		position: absolute;
		border-radius: 50%;
		top: 23%;
		left: 25%;
	}

	.Img1 img {
		width: 40px;
		height: 40px;
		position: absolute;
		border-radius: 50%;
		top: 12%;
		left: 10%;
	}

	.username {
		position: absolute;
		left: 45%;
		top: 35%;
	}

	.todolist {
		position: absolute;
		top: 10%;
		width: 30%;
		height: 80%;
		left: 1%;
		border: medium double #FF79BC;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.title1 {
		position: absolute;
		left: 10%;
		top: 2%;
		font-size: 1.8em;
		font-weight: bold;
		color: hotpink;
	}

	.calender {
		position: absolute;
		top: 2%;
		width: 60%;
		left: 35%;
		height: 30%;
	}

	.font1 {
		font-size: 14px;
		color: #606266;
	}

	.changeInfo {
		position: absolute;
		left: 75%;
		top: 20%;
	}

	.background-font {
		font-size: 14px;
		color: #000000;

	}

	.textfont {
		font-size: 14px;
		color: #303133;
	}

	.userInfo2 {
		position: absolute;
		top: 32%;
		left: 8%;
		width: 85%;
		height: 70%;
	}
</style>
