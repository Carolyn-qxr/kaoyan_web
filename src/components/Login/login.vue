<template>
    <div class="login-register">
        <div class="contain">
            <div class="big-box" >
                <div class="big-contain" >
                    <div class="b_title">Welcome-学海无涯！</div>
                    <el-form
                            ref="loginFormRef"
                            :rules="login_rules"
                            :model="form"
                            class="login_form">
                        <el-form-item prop="name">
                            <el-input  v-model="form.name" placeholder="用户名" clearable size="medium" prefix-icon="iconfont icon-denglu" ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" placeholder="密码" type="password" clearable size="medium" prefix-icon="iconfont icon-mimadenglu"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button class="b_button" @click="login" >登录</el-button>
                </div>
            </div>
            <div class="small-box" >
                <div class="small-contain">
                    <div class="s_title">Welcome！</div>
                    <p class="s_content">开始注册，和我们一起旅行</p>
                    <el-button class="s_button" @click="register">注册</el-button><br>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default{
        // eslint-disable-next-line vue/no-unused-component

        data(){
            return {
                form:{
                    name:'',
                    password:''
                },
                //验证对象
                login_rules:{
                    name:[
                        {required: true,message:'用户密码为必填项',trigger: 'blur'},//必填项验证
                        {min :3,max :12,message: '长度在3到12个字符',trigger: 'blur'}//长度验证
                    ],
                    password:[
                        {required: true, message:'用户密码为必填项',trigger: 'blur'},//必填项验证
                        {min :6,max :10,message: '长度在6到10个字符',trigger: 'blur'}//长度验证
                    ],
                },
            }
        },
        

        methods:{
            login(){
                this.$refs.loginFormRef.validate(async valid=>{
                    if(valid){
                        this.$axioss({
                            method:"post",
                            url:this.HOST+"/login",
                            crossDomain:true,
                            dataType: 'jsonp',
                            params:{
                                userName:this.form.name,
                                password: this.form.password,
                            }
                        }).then(response=>{
                            if(response.data.code=="200"){
                                this.$message.success("登录成功")
                                this.$store.commit("addUserName",response.data.data.username)
	                            this.$router.push({path: '/home'})   //登录后的跳转
                            }else{
                                this.$message.error("登录失败")
                            }
                        })
                    }else{
                        this.$message.error("信息填写错误，请重新填写！")
                    }

                })
            },
            register(){
                this.$router.push({path: '/register'})

            }
        }
    }
</script>

<style scoped="scoped">
    .login-register{
        background-image: url("../assets/img/background.jpg");
        width: 100%;
        height: 100%; /**宽高100%是为了图片铺满屏幕 */
        z-index: -1;
        position: absolute;
        top: 0px; /*这里是设置与顶部的距离*/
        left: 0px; /*这里是设置与左边的距离*/
        bottom: 0px;
        right: 0px;

    }
    .contain{
        width: 50%;
        height: 60%;
        top: 50%;
        position: relative;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        box-shadow: 0 0 3px #f0f0f0,
        0 0 6px #f0f0f0;
    }
    .big-box{
        width: 70%;
        height: 100%;
        position: absolute;
        top: 10%;
        transform: translateX(0%);
        transition: all 1s;
    }
    .big-contain{
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .b_title{
        margin-top: -300px;
        font-size: 1.5em;
        font-weight: bold;
        position: absolute;
        color: #fff;
        left: 20%;
    }
    .login_form{
        width: 50%;
        height: 28%;
        padding: 2em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .login_form input{
        width: 100%;
        border: none;
        outline: none;
        border-radius: 50px;
        padding-left: 2em;
        background-color: #f0f0f0;
    }

    .b_button{
        width: 40%;
        height: 40px;
        border-radius: 24px;
        border: 1px solid #fff;
        outline: none;
        background-color: transparent;
        color: #fff;
        font-size: 0.9em;
        cursor: pointer;
    }
    .small-box{
        width: 30%;
        height: 100%;
        background-color: rgba(255, 0, 0, 0);
        position: relative;
        top: 0%;
        left: 400px;
        transform: translateX(0%);
        transition: all 1s;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }
    .small-contain{
        width: 100%;
        height: 100%;
        top: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .s_title{
        font-size: 1.5em;
        font-weight: bold;
        color: #fff;
    }
    .s_content{
        font-size: 0.8em;
        color: #fff;
        text-align: center;
        padding: 2em 4em;
        line-height: 1.7em;
    }
    .s_button{
        width: 60%;
        height: 40px;
        border-radius: 24px;
        border: 1px solid #fff;
        outline: none;
        background-color: transparent;
        color: #fff;
        font-size: 0.9em;
        cursor: pointer;
    }
    .register_button{
        width: 60%;
        height: 40px;
        border-radius: 24px;
        border: 1px solid #fff;
        outline: none;
        background-color: rgb(57,167,176);
        color: #fff;
        font-size: 0.9em;
        cursor: pointer;
    }

    .big-box.active{
        left: 0;
        transition: all 0.5s;
    }
    .small-box.active{
        left: 100%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
        transform: translateX(-100%);
        transition: all 1s;
    }

</style>
