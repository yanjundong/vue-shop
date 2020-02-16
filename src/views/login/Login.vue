<template>
  <div class="login-container">
    <div class="login-box">
      <!--头像区域-->
      <div class="avator-box">
        <img src="~@/assets/img/logo.png" alt="">
      </div>
      <!--登陆表单区域-->
      <el-form :model="userInfo" :rules="loginRules" ref="loginFormRef" label-width="0px">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="userInfo.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="userInfo.password" show-password></el-input>
        </el-form-item>
        <!--按钮-->
        <div class="btns">
          <el-button type="primary" @click="loginBtn">登陆</el-button>
          <el-button type="info" @click="resetBtn">取消</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
  import {checkLogin} from "@/network/login";

  export default {
    name: "Login",
    data() {
      return {
        /*用户的登陆信息*/
        userInfo: {
          username: 'admin',
          password: '123456'
        },
        /*表单验证*/
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      /*登陆请求*/
      loginBtn() {
        const that = this;
        //对整个表单进行校验
        that.$refs.loginFormRef.validate(valid => {
          if(valid) {
            //校验成功，发起网络请求
            checkLogin(that.userInfo)
              .then(res => {
                //登陆成功
                if(res.meta.status == 200){
                  that.$message.success(res.meta.msg);
                  /*1、将登陆成功之后的数据保存到客户端的sessionStorage中
                  *   1.1 项目中登陆之外的其他API接口，必须登录之后才能访问
                  *   1.2 token 只能在当前网站打开期间生效，所以将 token 保存在sessionStorage中
                  * */
                  window.sessionStorage.setItem('token', res.data.token);
                  //跳转到主页
                  that.$router.replace('/home');
                }else{
                  //登陆失败
                  that.$message.error(res.meta.msg);
                }
              })
              .catch(() => {

              })
          }else {
            //校验失败
          }
        })

      },
      /*表单重置按钮*/
      resetBtn() {
        const that = this;
        that.$refs.loginFormRef.resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .avator-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }

  .avator-box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }

  .el-form {
    position: absolute;
    bottom: 30px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

</style>