<template>
    <el-container>
        <el-header class="header">
            <homeheader></homeheader>               
        </el-header>
        <el-container>
            <el-aside class="leftaside">
                <leftaside></leftaside>
            </el-aside>
        <el-container>
            <el-main>
                <homemain></homemain>    
            </el-main>   
        <el-container>
             <el-aside class="rightaside">
                 <rightaside></rightaside>
             </el-aside>
        </el-container>
        </el-container>
        </el-container>
        <el-footer>
            <a style="color: orange;">powered by上岸组</a>
        </el-footer>
    </el-container>
</template>
<script>
import homeheader from './homeheader.vue'
import leftaside from './leftaside.vue'
import rightaside from './rightaside.vue'
import homemain from './homemain.vue'
export default {

    components:{
        homeheader,
        leftaside,
        rightaside,
        homemain

    }
}
</script>

<style scoped>
.header{
    background: #FFFF; 
    height: 200px !important;

}
.leftaside{
    width: 465px !important;
}
.rightaside{
    width: 465px !important;
}
.el-main{
    width: 930px !important;
}
.el-footer{
    margin-top: 5%;
    background: rgb(17, 0, 0); 
}
</style>