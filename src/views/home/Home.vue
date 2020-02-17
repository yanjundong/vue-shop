<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="~assets/img/icon.jpg" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区-->
        <sider-menu :menu-list="menuList" :collapse="isCollapse"></sider-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {getMenuList} from "@/network/home";

  import SiderMenu from "./SiderMenu";

  export default {
    name: "Home",
    data() {
      return {
        /*左侧菜单数据*/
        menuList: [],
        /*菜单是否折叠*/
        isCollapse: false
      }
    },
    created() {
      const that = this;
      //网络请求菜单
      getMenuList().then(res => {
        if(res.meta.status == 200) {
          that.menuList = res.data;
        }else {

        }

      })
    },
    components: {
      SiderMenu
    },
    methods: {
      //退出登陆
      logout() {
        //清空token
        window.sessionStorage.clear();
        //跳转到登录页
        this.$router.replace('/login');
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div img {
    width: 56px;
    height: 56px;
    border-radius: 50px;
    margin-left: 15px;
  }

  .el-header div span {
    margin-left: 15px;
  }
  
  .el-aside {
    background-color: #333744;
  }
  
  .el-main {
    background-color: #eaedf1;
  }
  
  .toggle-button {
    background-color: #4A5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;  /*鼠标激活时变成小手*/
  }
</style>