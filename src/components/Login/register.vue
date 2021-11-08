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
                        <el-form-item prop="userName">
                            <el-input  v-model="form.userName" placeholder="用户名" clearable size="medium" ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" placeholder="密码" type="password" clearable size="medium"></el-input>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-model="form.phone" placeholder="手机号"  clearable size="medium"></el-input>
                        </el-form-item>

                    </el-form>
                    <br>

                    <el-button class="b_button" @click="register('loginFormRef')" >注册</el-button>
                </div>
            </div>
            <div class="small-box" >
                <div class="small-contain">
                    <div class="s_title">Welcome！</div>
                    <p class="s_content">与我们保持联系，请登录你的账户</p>
                    <el-button class="s_button" @click="login">登录</el-button><br>
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
                    userName:'',
                    password:'',
                    phone: '',
                },
                //验证对象
                login_rules:{
                    userName:[
                        {required: true,message:'用户密码为必填项',trigger: 'blur'},//必填项验证
                        {min :3,max :12,message: '长度在3到12个字符',trigger: 'blur'}//长度验证
                    ],
                    password:[
                        {required: true, message:'用户密码为必填项',trigger: 'blur'},//必填项验证
                        {min :6,max :10,message: '长度在6到10个字符',trigger: 'blur'}//长度验证
                    ],
                    phone:[
                        {required: true, message:'用户手机号为必填项',trigger: 'blur'},//必填项验证
                        {min :11,max :11,message: '长度为11位',trigger: 'blur'}//长度验证
                    ],
                },
            }
        },

        methods:{
            login(){
                this.$router.push({path: '/login'})
            },
            register(formName){
                this.$refs[formName].validate((valid=>{
                    if(valid){
                        this.$axioss({
                            method:"post",
                            url:this.HOST+"/register",
                            crossDomain:true,
                            dataType: 'jsonp',
                            params:{
                                userName:this.form.userName,
                                password: this.form.password,
                                phone: this.form.phone
                            }
                        }).then(response=>{
                            if(response.data.code=="200"){
                                this.$message.success("注册成功")
                                this.$router.push({path: '/login'});  //注册成功返回登录界面
                            }else{
                                this.$message.error("注册失败")
                            }
                        })
                    }else{
                        this.$message.error("信息填写错误，请重新填写！")
                    }
                }))
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
        left: 30%;
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
        left: 5%;
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
