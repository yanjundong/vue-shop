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
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot:default="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editUser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
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
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagesize"
        layout="sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog title="添加用户"
               :visible="addUserDialogVisible" @close="cancelAddUserBtn">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUserBtn">取 消</el-button>
        <el-button type="primary" @click="addUserBtn">确 定</el-button>
      </div>
    </el-dialog>
    <!--更新用户的对话框-->
    <el-dialog title="修改用户"
               :visible="editUserDialogVisible" @close="cancelEditUserBtn">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditUserBtn">取 消</el-button>
        <el-button type="primary" @click="editUserBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUsers, addUser, editState, editUser, deleteUser} from "@/network/home";

  export default {
    name: "UserList",
    data() {
      //验证邮箱的规则
      let checkEmail = (rule, value, callback) => {
        const emailRule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(emailRule.test(value)){
          //合法的邮箱
          return callback();
        }
        //错误的邮箱
        callback(new Error('邮箱错误'))
      };

      //验证手机号的规则
      let checkPhone = (rule, value, callback) => {
        const phoneRule = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(phoneRule.test(value)){
          //合法的邮箱
          return callback();
        }
        //错误的手机
        callback(new Error('手机错误'))
      };
      return {
        //查询信息
        queryInfo: {
          query: '',  //查询参数
          pagenum: 1, //当前的页数
          pagesize: 4 //每页显示多少条数据
        },
        //用户数据
        tableData: [],
        //用户总数据条数
        total: null,
        //添加用户的对话框是否显示
        addUserDialogVisible: false,
        //添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //添加用户的表单验证
        addFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名的长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '密码的长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
        },
        //修改用户的表单数据
        editForm: {
          username: '',
          email: '',
          mobile: ''
        },
        //修改用户的对话框是否显示
        editUserDialogVisible: false,

      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      /*网络请求数据*/
      getUserList() {
        const that = this;
        //请求用户数据
        getUsers(this.queryInfo)
          .then(res => {
            if(res.meta.status == 200) {
              //请求成功
              that.tableData = res.data.users;
              that.total = res.data.total;
              that.queryInfo.pagenum = res.data.pagenum;
            }else {
              //请求失败
              that.$message.error(res.meta.msg);
            }
          })
      },
      /*页面大小改变时触发*/
      handleSizeChange(newPageSize) {
        this.queryInfo.pagesize = newPageSize;
        //重新请求数据
        this.getUserList();
      },
      /*监听 页码值 的改变*/
      handleCurrentChange(toPage) {
        this.queryInfo.pagenum = toPage;
        //重新请求数据
        this.getUserList();
      },
      /*监听Switch状态变换*/
      changeStatus(row) {
        console.log(row);
        const that = this;
        //发起网络请求修改用户状态
        editState({uId: row.id, type: row.mg_state})
          .then(res => {
            if(res.meta.status === 200) {
              //修改成功
              that.$message.success(res.meta.msg);
            }else {
              //添加失败
              that.$message.error(res.meta.msg);
            }
          })
      },
      /*取消添加用户*/
      cancelAddUserBtn() {
        this.$refs.addFormRef.resetFields();
      },
      /*确定添加用户*/
      addUserBtn() {
        const that = this;
        that.$refs.addFormRef.validate(valid => {
          if(valid){
            //验证通过，可以发起添加用户的网络请求
            addUser(that.addForm)
              .then(res => {
                if(res.meta.status === 201) {
                  //添加成功
                  that.$message.success(res.meta.msg);
                  //重新请求用户列表，关闭对话框
                  that.addUserDialogVisible = false;
                  that.getUserList();
                }else {
                  //添加失败
                  that.$message.error(res.meta.msg);
                }
              })

          }
        })
      },
      /*修改用户*/
      editUser(row) {
        this.addForm = row;
        this.editUserDialogVisible = true;
      },
      /*确定修改用户*/
      editUserBtn() {
        const that = this;
        console.log(that.editForm);
        that.$refs.editFormRef.validate(valid => {
          if(valid) {
            //网络请求修改用户
            editUser(that.editForm)
              .then(res => {
                if(res.meta.status === 200) {
                  //修改成功
                  that.$message.success(res.meta.msg);
                  that.editUserDialogVisible = false;
                  //重新请求数据
                  that.getUserList();
                }else {
                  //修改失败
                  that.$message.error(res.meta.msg);
                }
              })
          }
        })


      },
      /*取消修改用户*/
      cancelEditUserBtn() {
        this.editUserDialogVisible = false;
      },
      /*删除用户*/
      deleteUser(row) {
        const that= this;
        that.$messageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row);
          deleteUser(row.id)
            .then(res => {
              if(res.meta.status === 200) {
                //删除成功
                that.$message.success(res.meta.msg);
                //重新请求数据
                that.getUserList();
              }else {
                //删除失败
                that.$message.error(res.meta.msg);
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    },
    components: {
    }
  }
</script>

<style scoped>

</style>