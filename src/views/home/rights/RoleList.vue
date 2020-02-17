<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box-card" shadow="never">
      <!--添加区域-->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!--角色列表显示区域-->
      <el-table :data="tableData"
                border
                stripe
                style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="distributeRightBtn(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--分配权限对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="disRightdialogVisible"
      width="50%">
      <el-tree
        :data="rightTree"
        show-checkbox
        node-key="id"
        ref="rightTreeRef"
        :default-checked-keys="defaultKeys"
        :props="defaultProps"
        default-expand-all>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disRightdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRightBtn">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getRoles, getTree, allowRights} from "@/network/roles";

  export default {
    name: "RoleList",
    data() {
      return {
        /*角色列表显示内容*/
        tableData: [],
        /*分配角色对话框是否显示*/
        disRightdialogVisible: false,
        /*权限树*/
        rightTree: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        /*权限树的展开节点*/
        defaultKeys: [],
        /*分配权限的id*/
        roleId: '',
      }
    },
    created() {
      this.getRoles();
    },
    methods: {
      //获取角色列表
      getRoles() {
        const that = this;
        getRoles()
          .then(res => {
            if(res.meta.status === 200){
              //获取成功
              that.tableData = res.data;
            }else {
              that.$message(res.meta.msg);
            }
          })
      },
      /*分配权限 按钮的监听*/
      distributeRightBtn(row) {
        const that = this;
        that.roleId = row.id;
        getTree() //获取权限树
          .then(res => {
            if(res.meta.status === 200){
              that.rightTree = res.data;
              that.defaultKeys = []; // 清空权限id数组
              that.getLeafKeys(row, that.defaultKeys);
              that.disRightdialogVisible = true;
            }
          })
      },
      /*通过递归获得所有三级权限的id，并把放到arr数组中*/
      getLeafKeys(node, arr) {
        //三级节点
        if(!node.children) {
          return arr.push(node.id);
        }
        node.children.forEach(item => {
          this.getLeafKeys(item, arr);
        })
      },
      /*分配权限确定按钮*/
      allotRightBtn() {
        const that = this;
        const keys = [
          ...this.$refs.rightTreeRef.getCheckedKeys(),
          ...this.$refs.rightTreeRef.getHalfCheckedKeys()
        ];
        const keysStr = keys.join(',');
        //网络请求分配权限
        allowRights({
          id: that.roleId, data: keysStr
        }).then(res => {
          if (res.meta.status === 200) {
            that.$message.success('分配权限成功！');
            that.disRightdialogVisible = false;
          }else{
            that.$message.error('分配权限失败！')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>