<template>
      <el-container>
        <el-main>
            <h1>公告</h1>
            <el-divider></el-divider>
             <el-page-header @back="goBack" >
                 </el-page-header>
                <el-card class="box-card">
                     <h1 >{{notice.title}}</h1>
                     <el-row :gutter="20">
                            <el-col :span="3">    <i class="el-icon-view"><span>{{notice.views}}</span></i> </el-col>
                            <!-- <el-col :span="4">    <span>科目分类：{{courseName}}</span> </el-col>
                            <el-col :span="4">    <span>专业编号：{{subjectNum}}</span> </el-col> -->
                            <el-col :span="4">    <span>上传时间：{{notice.upload}}</span> </el-col>
                    </el-row>
                    <br>
                    <span style="margin-left:4%">{{notice.content}}</span>
                    <br><br>
                </el-card>

        </el-main>
    
      </el-container>
</template>

<script>


export default {
    data() {
        return{
			notice:{
				
			},
        }
    },
    mounted(){
        this.getTestInformation();
    },
    methods:{
        getTestInformation(){
			this.$axioss({
			    method:"get",
			    url:this.HOST+"/getNoticeById",
			    crossDomain:true,
			    params:{
					noticeId:this.$route.query.noticeid
			    }
			}).then(response=>{
			    if(response.data.code=="200"){
			        this.notice=response.data.data;  
					
			    }
			})
        },
         goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.box-card{
    margin-top: 2%;
    margin-bottom: 6%
}
</style>
