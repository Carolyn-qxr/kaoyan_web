<template>
<div>
     <el-col class="block">
    <el-carousel height="300px">
      <el-carousel-item v-for="(img,index) in noticeimg" :key="index" type="card">
        <img :src="img.url" alt="图片丢失了" @click="gotoNoticeInformation(img.testId)"/>
      </el-carousel-item>
      
    </el-carousel>
     </el-col>
     <el-col class="notice">
     <el-card class="box-card">
  <div slot="header" >
    <span style="font-size:2em">公告</span>
  </div>
  <el-col v-for="(title,index) in notice" :key="index" >
      <el-col :span="18">
      <span  style="font-size:1.2em">{{title.title}}</span></el-col>
      <el-col :span="3"><i class="el-icon-view"> {{title.views}}</i></el-col>
      <el-col :span="3" ><el-button type="text" @click="gotoNoticeInformation(title.noticeid)">查看</el-button></el-col>
  </el-col>
</el-card>
     </el-col>
</div>
</template>
<script>

export default {
    data(){
        return{
            noticeimg:[{url:require("../assets/example.png")}],
            notice:[],
        }
    },
    methods:{
        gotoNoticeInformation(noticeid){
             this.$router.push({path:'/noticeinformation',query:{noticeid: noticeid}});      
        },
		getNotice(){  //获取前三名公告
			this.$axioss({
			    method:"get",
			    url:this.HOST+"/getNoticeTop",
			    crossDomain:true,
			    params:{
			    }
			}).then(response=>{
			    if(response.data.code=="200"){
			        this.notice=response.data.data;  
					
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
.block{
    width: 69%;
    margin-left: 10%;
}
.notice{
    margin-top: 5%;
}
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>