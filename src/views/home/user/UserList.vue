<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box-card" shadow="never">
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--用户表格显示区域-->
      <el-table :data="tableData"
                border
                stripe
                style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot:default="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--页码-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pageSize"
        layout=" sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="addUserDialogVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    name: "UserList",
    data() {
      return {
        queryInfo: {
          query: '',
          currentPage: 1, //当前的页数
          pageSize: 4 //每页显示多少条数据
        },
        tableData: [],
        total: 4,
        addUserDialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'

      }
    },
    created() {
      this.tableData = [
        {
          id: '1001',
          date: '2016-05-02',
          name: '王小虎',
          role: '超级管理员',
          status: true
        }, {
          id: '1002',
          date: '2016-05-04',
          name: '王小虎',
          role: '管理员',
          status: false
        }, {
          id: '1003',
          date: '2016-05-01',
          name: '王小虎',
          role: '测试角色1',
          status: true
        }, {
          id: '1004',
          date: '2016-05-03',
          name: '王小虎',
          role: '测试角色2',
          status: false
        }];
    },
    methods: {
      /*页面大小改变时触发*/
      handleSizeChange(newPageSize) {
        console.log(newPageSize);
        this.pageSize = newPageSize;
      },
      /*监听 页码值 的改变*/
      handleCurrentChange(toPage) {
        console.log(toPage);
      },
      /*监听Switch状态变换*/
      changeStatus(row) {
        console.log(row);
      }
    },
    components: {
    }
  }
</script>

<style scoped>

</style>