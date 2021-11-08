<template>
<el-container>
     <el-header class="header">
            <h1>{{schoolName}}</h1> 
            <a>计算机大类</a>
            <el-divider></el-divider>           
        </el-header>
        <el-container>
            <el-main >
                <el-page-header @back="goBack" >
                 </el-page-header>
                <el-card class="box-card">
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
                </el-card>
            </el-main>
        </el-container>
</el-container>
        
</template>

<script>

export default {
    data() {
        return{
            schoolName:"",
            tableData:[],
            form:[],
            schoolNum:""
        }   
    },
    created(){
        this.getSchoolInformation();
    },
    methods:{
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
    height: 100px !important;
}
.box-card{
    margin-left: 10%;
    margin-right: 10%;
}
</style>
