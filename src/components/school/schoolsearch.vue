<template>
	<el-container>
		<!-- 导航栏 -->
		<el-header class="header">
			<homeheader></homeheader>
		</el-header>
		 <div class="tiao">

        </div>
		<el-main>
			<!-- 按地区分类 -->
			<el-page-header @back="goBack" content="院校分类">
			</el-page-header>
			<br>
			<div class="box-card">
				<h3>地区 </h3>
				<div style="margin-left:5%">
					<el-radio-group v-model="radio" @change="getSchoolForm(0,8)">
						<el-radio-button v-for="(region,index) in location" :key="index" :label="region">{{region}}
						</el-radio-button>

					</el-radio-group>
				</div>
				<!-- 院校信息 -->
				<el-table :data="tableData" style="width: 100%;margin-top:2%">
					<el-table-column prop="schoolnum" label="院校编号" v-if="false" width="180">
					</el-table-column>
					<el-table-column prop="features" label="标签" width="180">
						<template slot-scope="scope">
							<el-tag v-show="scope.row.features ===1"> 一流大学
							</el-tag>
							<el-tag v-show="scope.row.features ===2" type="success"> 一流学科
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
				<!-- 分页 -->
				<div class="block">
					<el-pagination layout="prev, pager, next" :total="this.pageAllSize*10"
						@current-change="PageChage">
					</el-pagination>
				</div>
			</div>
			
		</el-main>
	</el-container>
</template>

<script>
	import homeheader from '../home/homeheader.vue'

	export default {
		computed: {
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
				tableData:[{schoolName:"北京工业大学",
				official: "https://element.eleme.io"}],
				// tableData: [],
				radio: "全部",
				pageAllSize:0
			}

		},
		mounted() {
			if (this.schoolName == "") 
				this.getSchoolForm(0, 8);
			else
				this.getSchoolByName()
			
		},
		methods: {
			// 换页
			PageChage(x){
				this.getSchoolForm(x,8);
			},
			filterTag(value, row) {
				return row.features === value;
			},
			//返回首页
			goBack() {
				this.$store.commit("editTitle", "");
				this.$router.push({
					path: '/home'
				});
			},
			//点击具体院校的跳转
			enterSchool(row) {
				console.log(row);
				this.$router.push({
					path: '/schoolinformation',
					query: {
						schoolNum: row.schoolnum,
						schoolName: row.schoolname
					}
				});
			},
			//通过地区从后台获取院校信息
			getSchoolForm(pageNum, pageSize) {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getSchoolBylocation",
					crossDomain: true,
					dataType: 'jsonp',
					params: {
						location: this.radio,
						pageNum: pageNum,
						pageSize: pageSize
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.tableData = response.data.data.data;
			            this.pageAllSize=response.data.data.totalPages;
					}
				})
			},
			//搜索栏通过院校名称模糊查找院校
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
	
		width: 100%;
		height: 120px !important;
		margin-top: -10px;
		margin-left: -10px;
		margin-right: -10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)


	}

	.box-card {
		margin-left: 5%;
		margin-right: 5%;
		
	}
	.block{
		margin-left:50%;
		
		top:93%
	}
	.tiao{
    height: 10px;
    width:100%;
    margin-left:-10px;
    background-color:	#00aeef;
}
</style>
