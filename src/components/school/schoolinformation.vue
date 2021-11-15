<template>
<el-container>
     <el-header class="header">
            <div class="title">
                <h1>{{schoolName}}</h1> 
                <a>计算机大类</a>       
            </div>
             <i class="el-icon-house" style="position:absolute;left:15%;top:12.3%;font-color:#909399;font-size:0.9em" @click="gohome">首页</i>
        </el-header>
       
         <div class="tiao">

        </div>
        <el-container>
            <el-main >
                <el-page-header @back="goBack" >
                 </el-page-header>
                 <!-- 学院招生信息 -->
                <div class="box-card">
                     <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="inforid" label="专业编号" width="180" v-if="false">  </el-table-column>
                        <el-table-column prop="exammethod" label="考试方式" width="180">  </el-table-column>
                        <el-table-column prop="subjectname" label="专业" width="180"></el-table-column>
                        <el-table-column prop="studymethod" label="学习方式"></el-table-column>
                        <el-table-column prop="direction" label="研究方向"></el-table-column>
                        <el-table-column prop="peoplenum" label="拟招人数"></el-table-column>
                        <el-table-column prop="subject" label="考试科目">
                             <template slot-scope="scope">
                            <el-button type="text" @click="gotosubjectinformation(scope.row)">详细</el-button>
                             </template>
                        </el-table-column>
                        </el-table>
                </div>
            </el-main>
        </el-container>
</el-container>
        
</template>

<script>

export default {
    data() {
        return{
            schoolName:'北工大',
            tableData:[{}],
            form:[],
            schoolNum:""
        }   
    },
    created(){
        //渲染招生信息
         this.getSchoolInformation();
    },
    methods:{
        gohome(){
				this.$router.push({
					path: '/home'
				});
			},
        //通过院校id从后台获取院校招生信息
        getSchoolInformation(){
            this.schoolNum=this.$route.query.schoolNum;
            this.schoolName=this.$route.query.schoolName;
            this.$axioss({
                method:"get",
                url:this.HOST+"/getInformationBySchoolNum",
                crossDomain:true,
                dataType:'jsonp',
                params:{
                    schoolNum:  this.schoolNum
                }
            }).then(response=>{
                if(response.data.code=="200"){
                    this.tableData=response.data.data.data;
                }
            })
        },
        //跳转考试科目页面
        gotosubjectinformation(row){
            this.form=row;
            this.$router.push({path:'/subject',query:{inforId: this.form.inforid}});
        },
         goBack(){
            this.$router.go(-1);
        }

    }
}
</script>
<style scoped>
.header{
    height: 120px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

}
.box-card{
    margin-left: 5%;
    margin-right: 5%;
}
.tiao{
    height: 10px;
    width:102%;
    margin-left:-10px;
    background-color:	#00aeef;
}
.title{
    position:absolute;top:2%
}
</style>
