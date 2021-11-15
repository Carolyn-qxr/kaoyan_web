<template>
	<div class="task-contain">
		<div style="margin-top: 7px;margin-left: -5px">
			<el-button type="primary" plain @click="showTable1" size="mini">今日任务</el-button>
			<el-button plain class="btn2" @click="showTable2" size="mini" style="margin-left: 0px">全部任务</el-button>
		</div>
		<el-table :data="tableData1.filter(data => !search || data.planname.toLowerCase().includes(search.toLowerCase()))"
			style="width: 100%" v-show="t1">
			<el-table-column label="日期" width="200px" align="center">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ plandayTime(scope.row.plandate) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="任务名称" width="200px" align="center" prop="planname">
			</el-table-column>
			<el-table-column label="开始时间" width="100px" align="center" prop="begin">
			</el-table-column>
			<el-table-column label="结束时间" width="100px" align="center" prop="end">
			</el-table-column>
			<el-table-column label="任务信息" width="300px" align="center" prop="information">
			</el-table-column>
			<el-table-column label="完成情况" width="100px" align="center">
				<template slot-scope="scope">
					<i v-show="scope.row.state==1" class="el-icon-check"></i> 
					<i v-show="scope.row.state==0" class="el-icon-close"></i> 
				</template>
			</el-table-column>
			<el-table-column align="right" width="300px">
				<!-- eslint-disable-next-line -->
				<template slot="header" slot-scope="scope" >
					<el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="finishPlan(scope.row)">完成</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--全部任务-->
		<el-table :data="tableData2.filter(data => !search || data.planname.toLowerCase().includes(search.toLowerCase()))"
			style="width: 95%" v-show="t2">
			<el-table-column label="日期" width="200px" align="center">
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ plandayTime(scope.row.plandate) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="任务名称" width="200px" align="center"  class="el-icon-check" style="margin-right:200px" prop="planname"></el-table-column>
			<el-table-column label="任务信息" width="400px" align="center" prop="information">
			</el-table-column>
			<el-table-column label="完成情况" width="200px" align="center">
				<template slot-scope="scope">
					<i v-show="scope.row.state==1"  class="el-icon-check"></i> 
					<i v-show="scope.row.state==0" class="el-icon-close"></i> 
				</template>
			</el-table-column>
			<el-table-column align="right" width="300px">
				<!-- eslint-disable-next-line -->
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
				</template>
				<template slot-scope="scope">
					<el-button size="mini" @click="finishPlan(scope.row)">完成</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="修改任务" :visible.sync="dialogVisible2" width="30%">
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
				<el-time-select placeholder="起始时间" v-model="plan.begin" :picker-options="{
                      start: '06:00',
                      step: '00:30',
                      end: '22:00'
                    }">
				</el-time-select>
				<p></p>
				<span>结束时间</span>
				<el-time-select placeholder="结束时间" v-model="plan.end" :picker-options="{
                      start: '06:30',
                      step: '00:30',
                      end: '22:30',
                      minTime: startTime
                    }">
				</el-time-select>
			</el-form>

			<span slot="footer" style="margin-right: 100px;margin-top: -10px">
				<el-button @click="dialogVisible2 = false" size="small" plain>取 消</el-button>
				<el-button type="primary" @click="editPlan()" size="small" plain>确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import * as dateUtils from "../../util/myDate.js"
	export default {
		computed: {
			username() {
				return this.$store.state.username;
			},
			planchange() { //用于更新任务列表
				return this.$store.state.planChange;
			}
		},
		data() {
			return {
				dialogVisible2: false,
				showmode: true,
				t1: 1,
				t2: 0,
				activeName: '今日任务',
				tableData1: [],
				tableData2: [],
				search: '',
				value: new Date(),
				dialogVisible: false,
				plan: {},
				startTime: "",
				endTime: "",
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
			compareTime(x, y) { //比较时间
				var time1 = parseInt(x.begin.toString());
				var time2 = parseInt(y.begin.toString());
				if (time1 < time2) {
					return -1;
				} else if (time1 > time2) {
					return 1;
				} else {
					return 0;
				}
			},
			compareDay(x, y) { //比较时间
				if (x.plandate < y.plandate) {
					return -1;
				} else if (x.plandate > y.plandate) {
					return 1;
				} else {
					return 0;
				}
			},
			plandayTime(t) {
				let d = new Date(t);
				return dateUtils.formatDate(d, 'yyyy-MM-dd'); //将任务时间格式化
			},
			showTable1() {
				this.t1 = 1;
				this.t2 = 0;
			},
			showTable2() {
				this.t1 = 0;
				this.t2 = 1;
			},
		    finishPlan(row){
				 var p=row;
				 p.state=1;
				this.$axioss({
					method: "post",
					url: this.HOST + "/updatePlan",
					crossDomain: true,
					data: p
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
						this.$store.commit("planchange", 1); //更新任务列表
					}
				})
			},
			editPlan() {
				this.$axioss({
					method: "post",
					url: this.HOST + "/updatePlan",
					crossDomain: true,
					data: this.plan
				}).then(response => {
					if (response.data.code == "200") {
						this.$message.success(response.data.msg);
						this.$store.commit("planchange", 1); //更新任务列表
						this.dialogVisible2 = false;
					}
				})
			},
			handleEdit(index, row) { //编辑任务
				this.dialogVisible2 = true;
				this.plan = row;
			},
			handleDelete(index, row) {
				this.$confirm('此操作将删除任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axioss({
						method: "post",
						url: this.HOST + "/deletePlan",
						crossDomain: true,
						params: {
							planId: row.planid,
						}
					}).then(response => {
						if (response.data.code == "200") {
							this.$store.commit("planchange", 1); //更新任务列表
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			getTodayPlan() { //获取用户今天的任务
				var planDate = new Date();
				this.$axioss({
					method: "post",
					url: this.HOST + "/getPlanByDay",
					crossDomain: true,
					data: {
						username: this.username,
						planDay: planDate //date类型无法当参数直接传过去，要当json传
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.tableData1 = response.data.data;
						this.tableData1.sort(this.compareTime); //对开始时间排序
					}
				})
			},
			getAllPlan() { //获取用户所有的任务
				this.$axioss({
					method: "get",
					url: this.HOST + "/getUserAllPlan",
					crossDomain: true,
					params: {
						user: this.username,
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.tableData2 = response.data.data;
						this.tableData2.sort(this.compareDay); //对计划日期排序
					}
				})
			}
		},
		mounted() {
			this.$store.commit("editTitle","");
			this.getTodayPlan();
			this.getAllPlan();

		},
		watch: {
			planchange(newval, oldval) {
				this.getTodayPlan();
				this.getAllPlan();
			}
		}
	}
</script>
<style>
	.task-contain {
		position: absolute;
		top: 14%;
		height: 100%;
		width: 90%;
		left: 13%;
	}

	.btn1 {
		margin-right: -6px;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border: 0;
		margin-top: 5px;
		margin-left: 6px;
		color: #404040;
	}

	.btn2 {
		border: 2px solid #d9d9d9;
		border: 0;
		background: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		color: #404040;
	}

	.btn2.active {
		background: #409EFF;
	}

	.btn1.active {
		background: #409EFF;
	}
</style>
