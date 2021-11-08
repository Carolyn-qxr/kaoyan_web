<template>
	<el-container>
		<el-header class="header">
			<homeheader></homeheader>
		</el-header>
		<el-main>
			<el-page-header @back="goBack" content="院校分类">
			</el-page-header>
			<br>
			<el-card class="box-card">
				<h3>地区 </h3>
				<div style="margin-left:5%">
					<el-radio-group v-model="radio" @change="getSchoolForm()">
						<el-radio-button v-for="(region,index) in location" :key="index" :label="region">{{region}}
						</el-radio-button>

					</el-radio-group>
				</div>

				<el-table :data="tableData" style="width: 100%;margin-top:2%">
					<el-table-column prop="schoolnum" label="院校编号" v-if="false" width="180">
					</el-table-column>
					<el-table-column prop="features" label="标签" width="180">
						<template slot-scope="scope">
							<el-tag :type="scope.row.features ==='一流大学' ? 'primary' :'success'"> {{scope.row.features}}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="schoolname" label="院校名称" width="180">
					</el-table-column>
					<el-table-column prop="location" label="所在地" width="180">
					</el-table-column>
					<el-table-column prop="isself" label="自划线院校">
						<template slot-scope="scope">
							<i class="el-icon-check" :v-show="scope.row.isself==='1'? 'true':'false'"></i>
						</template>
					</el-table-column>
					<el-table-column prop="ishave" label="研究生院">
						<template slot-scope="scope">
							<i class="el-icon-check" :v-show="scope.row.ishave==='1'? 'true':'false'"></i>
						</template>
					</el-table-column>
					<el-table-column prop="official" label="官网">
						<template slot-scope="scope">
							<el-link type="primary" :href="scope.row.official" target="_blank">进入</el-link>
						</template>
					</el-table-column>
					<el-table-column prop="information" label="详细信息">
						<template slot-scope="scope">
							<el-button type="text" @click="enterSchool(scope.row)">进入</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</el-main>
	</el-container>
</template>

<script>
	import homeheader from '../home/homeheader.vue'

	export default {
		computed:{
			schoolName() {
				return this.$store.state.title;
			}
		},
		data() {
			return {
				location: ["全部",
					"北京", "天津", "河北", "山西", "辽宁", "上海", "江苏", "广东", "重庆", "海南",
					"浙江", "山东", "河南", "湖北", "湖南", "西藏", "甘肃", "四川", "贵州", "安徽",
					"黑龙江", "内蒙古", "福建", "广西", "江西", "青海", "宁夏", "新疆", "香港", "澳门", "台湾", "西藏"
				],
				feature: [{
					text: "一流大学"
				}],
				// tableData:[{schoolName:"北京工业大学",
				// official: "https://element.eleme.io"}],
				tableData: [],
				radio: "全部",
			}

		},
		mounted() {
			if (this.schoolName == "")   //逻辑上还有问题
				this.getSchoolForm();
			else
			    this.getSchoolByName()
		},
		methods: {
			filterTag(value, row) {
				return row.features === value;
			},
			goBack() {
				this.$store.commit("editTitle", "");
				this.$router.push({
					path: '/home'
				});
			},
			enterSchool(row) {
				this.form = row;
				this.$router.push({
					path: '/schoolinformation',
					query: {
						schoolNum: this.form.schoolnum,
						schoolName: this.form.schoolname
					}
				});
			},
			getSchoolForm() {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getSchoolBylocation",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						location: this.radio
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.tableData = response.data.data.data;
					}
				})
			},
			getSchoolByName() {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getSchoolByName",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						schoolName: this.schoolName
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.tableData = response.data.data.data;
					}
				})
			}
		},
		watch: {
			schoolName(n, o) {
				this.getSchoolByName();
			}
		},
		components: {
			homeheader
		}
	}
</script>
<style scoped>
	.header {
		background: #FFFF;
		height: 200px !important;

	}

	.box-card {
		margin-left: 10%;
		margin-right: 10%;
	}
</style>
