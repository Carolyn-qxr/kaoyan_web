<template>
    <div>
    <el-card style="height:250px">
  <div slot="header" >
    <span>时间规划</span>
  </div>
    <h3>
        距离考研还剩{{day}}天
    </h3>
    <a>屋外阴雨连连，屋内学子莘莘，上天不负有心人！加油！</a>
    <br>
    <a>
        快去制定计划吧~
        <el-button type="text" style="margin-left:10%" @click="task()">前往</el-button>
    </a>
    </el-card>
    </div>
</template>

<script>
export default{
    data(){
        return{
            day: this.days,
        }
    },
	methods:{
		admin(){
			 this.$router.push({path: '/admin'});
		},
		task(){
			 this.$router.push({path: '/task/home'});
		}
	}
}
        
</script>
<style scoped>

</style>
