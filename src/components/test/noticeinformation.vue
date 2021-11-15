<template>
      <el-container>
          <el-header class="header">
                 <h1 style="position:absolute;top:4.2%">公告</h1>
          </el-header>
          <div class="tiao">

        </div>
        <el-main>
          
             <el-page-header @back="goBack" >
                 </el-page-header>
                <div class="box-card">
                     <h1 >{{notice.title}}</h1>
                     <el-row :gutter="20">
                            <el-col :span="3">    <i class="el-icon-view"><span>{{notice.views}}</span></i> </el-col>
                            <!-- <el-col :span="4">    <span>科目分类：{{courseName}}</span> </el-col>
                            <el-col :span="4">    <span>专业编号：{{subjectNum}}</span> </el-col> -->
                            <el-col :span="4">    <span>上传时间：{{dateFormat('YYYY-mm-dd',notice.upload)}}</span> </el-col>
                    </el-row>
                    <br>
                    <span style="margin-left:4%">{{notice.content}}</span>
                    <br><br>
                </div>

        </el-main>
    
      </el-container>
</template>

<script>


export default {
    data() {
        return{
            
			notice:{
            title:"aaaaaa",
		      views:1,
              upload:"2021-10-28T02:05:52.000+00:00"		
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
        },
        
        //时间格式化
        		dateFormat(fmt, date) {
				let ret="";
				date=new Date(date);
                 const opt = {
                'Y+': date.getFullYear().toString(), // 年
                'm+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString(), // 日
                // 'H+': date.getHours().toString(), // 时
                // 'M+': date.getMinutes().toString(), // 分
                // 'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
                }
                for (let k in opt) {
                    ret = new RegExp('(' + k + ')').exec(fmt)
                    if (ret) {
                    fmt = fmt.replace(
                    ret[1],
                    ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
                 return fmt
    }
    }
}
</script>

<style scoped>
.box-card{
    margin-top: 2%;
    margin-bottom: 6%;
    margin-left: 5%;
    margin-right: 5%;
}
.header {
		height: 120px !important;
		margin-top: -10px;
        margin-left: -10px;
        margin-right: -10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
    .tiao{
    height: 10px;
    width:102%;
    margin-left:-10px;
    background-color:	#00aeef;
	}
    
</style>
