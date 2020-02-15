<template>
  <div>
    <!--添加用户的对话框-->
    <el-dialog title="添加用户"
               :visible="addUserDialogVisible"
               @close="closeDialog">
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
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getMenuList} from "@/network/home";

  export default {
    name: "AddUser",
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
        //添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          email: '',
          phone: ''
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
          phone: [
            { required: true, message: '请输入手机', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
        },
      }
    },
    props: {
      addUserDialogVisible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      //监听 Dialog 关闭
      closeDialog() {
        //重置表单
        this.$refs.addFormRef.resetFields();
        this.$emit('update:addUserDialogVisible', false);
      },
      //确定 添加用户
      addUser() {
        const that = this;
        that.$refs.addFormRef.validate(valid => {
          if(valid){
            //验证通过，可以发起添加用户的网络请求
            that.$message.success('添加用户成功');
            //重新请求用户列表

            //关闭对话框
            that.closeDialog();
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>