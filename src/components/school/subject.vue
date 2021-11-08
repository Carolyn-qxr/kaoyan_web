<template>
   <el-container>
     <el-header class="header">
            <h1>硕士专业目录</h1>     
        </el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
    <div class="box-card">
      <el-card>
          <el-row :gutter="20">
              <el-col :span="10"><h4>招生单位：{{schoolName}}</h4></el-col>
              <el-col :span="10"><h4>考试方式：{{examMethod}}</h4></el-col>
              <el-col :span="10"> <h4>专业：{{subjectName}}</h4></el-col>
              <el-col :span="10"><h4>学习方式：{{studyMethod}}</h4></el-col>
              <el-col :span="10"> <h4>研究方式：{{direction}}</h4></el-col>
              <el-col :span="10"><h4>拟招人数：{{peopleNum}}</h4></el-col>
            </el-row>
        </el-card>
        <el-card >
             <div slot="header" class="clearfix">
                 <h2>考试范围</h2>
             </div>
             <el-row :gutter="20">
              <el-col :span="6"><h4>政治</h4></el-col>
              <el-col :span="6"><h4>外语</h4></el-col>
              <el-col :span="6"> <h4>业务课一</h4></el-col>
              <el-col :span="6"><h4>业务课二</h4></el-col>
               <el-col :span="6"><h4>{{politics}}</h4></el-col>
              <el-col :span="6"><h4>{{english}}</h4></el-col>
              <el-col :span="6"> <h4>{{course1}}</h4></el-col>
              <el-col :span="6"><h4>{{course2}}</h4></el-col>
             <el-col :span="6"><el-button type="text" @click="gototestsearch(politics)">查看历年真题</el-button></el-col>
              <el-col :span="6"><el-button type="text" @click="gototestsearch(english)">查看历年真题</el-button></el-col>
              <el-col :span="6"> <el-button type="text" @click="gototestsearch(course1)">查看历年真题</el-button></el-col>
              <el-col :span="6"><el-button type="text" @click="gototestsearch(course2)">查看历年真题</el-button></el-col>
             
            </el-row>
             
        </el-card>
    </div>
</el-container>
</template>
<script>

export default {
    data() {
        return{
            inforId:"1",
            schoolName:"北京大学",
            examMethod:"统考",
            subjectName:"(专业学位)电子信息",
            peopleNum:"55",
            studyMethod:"全日制",
            direction:"(01)软件工程",
            politics:"思政(101)",
            english:"英一(201)",
            course1:"数一(301)",
            course2:"综合(408)"
        }  
    },
    created(){
        this.getsubjectinformation();
    },
    methods:{
        getsubjectinformation(){
            this.inforId=this.$route.query.inforId;
            this.$axioss({
                method:"get",
                url:this.HOST+"/getInformationById",
                crossDomain:true,
                dataType:'jsonp',
                params:{
                    inforId:  this.inforId
                }
            }).then(response=>{
                 if(response.data.code=="200"){
                    this.schoolName=response.data.data.schoolname;
                    this.examMethod=response.data.data.exammethod;
                    this.subjectName=response.data.data.subjectname;
                    this.peopleNum=response.data.data.peoplenum;
                    this.studymethod=response.data.data.studymethod;
                    this.politics=response.data.data.politics;
                    this.english=response.data.data.english;
                    this.course1=response.data.data.course1;
                    this.course2=response.data.data.course2;
                }
            })
        },
        goBack(){
            this.$router.go(-1);
        },
        gototestsearch(subject){
            this.$router.push({path:'/testsearch',query:{keyword: subject}});
        }
    }
}
</script>
<style scoped>
.box-card{
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
}
</style>
