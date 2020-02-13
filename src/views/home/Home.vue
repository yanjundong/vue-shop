<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="~assets/img/heima.png" alt="">
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
      /*模拟数据*/
      const res = {"data":[{"id":"1","atuthName":"用户管理","order":"1","path":"","child":[{"id":"1-1","atuthName":"用户列表","order":"1","path":"/user","child":[]}]},{"id":"2","atuthName":"权限管理","order":"1","path":"","child":[{"id":"2-1","atuthName":"角色列表","order":"1","path":"/role","child":[]},{"id":"2-2","atuthName":"权限列表","order":"1","path":"","child":[]}]},{"id":"3","atuthName":"商品管理","order":"1","path":"","child":[{"id":"3-1","atuthName":"商品列表","order":"1","path":"","child":[]},{"id":"3-2","atuthName":"分类参数","order":"1","path":"","child":[]},{"id":"3-3","atuthName":"商品分类","order":"1","path":"","child":[]}]},{"id":"4","atuthName":"订单管理","order":"1","path":"","child":[{"id":"3-1","atuthName":"商品列表","order":"1","path":"","child":[]},{"id":"3-2","atuthName":"分类参数","order":"1","path":"","child":[]},{"id":"3-3","atuthName":"商品分类","order":"1","path":"","child":[]}]},{"id":"5","atuthName":"数据统计","order":"1","path":"","child":[{"id":"4-1","atuthName":"数据报表","order":"1","path":"","child":[]}]}],"meta":{"msg":"success","status":"200"}};
      this.menuList = res.data;
    },
    components: {
      SiderMenu
    },
    methods: {
      logout() {
        console.log('退出');
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