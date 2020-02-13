<template>
  <el-menu
    unique-opened
    :collapse="collapse"
    :router="true"
    :collapse-transition="false"
    :default-active="activePath"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409eff">
    <!--一级菜单-->
    <el-submenu :index="item.id" v-for="(item, index) in menuList" :key="item.id">
      <!--一级菜单的模版区域-->
      <template slot="title">
        <!--图标-->
        <i :class="iconList[index]"></i>
        <!--文本-->
        <span>{{item.atuthName}}</span>
      </template>
      <!--二级菜单-->
      <el-menu-item :index="iitem.path" v-for="(iitem, iidex) in item.child" :key="iitem.id"
        @click="saveNavState(iitem.path)"
      >
        <template slot="title">
          <!--图标-->
          <i class="el-icon-menu"></i>
          <!--文本-->
          <span>{{iitem.atuthName}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "SiderMenu",
    data() {
      return {
        iconList: ['el-icon-user-solid', 'el-icon-data-analysis', 'el-icon-pie-chart', 'el-icon-reading', 'el-icon-data-board'],
        activePath: ''
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      },
      collapse: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      /*保存导航的激活状态*/
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath);
        this.activePath = activePath;
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    border-right: 0;
  }
</style>