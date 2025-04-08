<template>
  <div class="login_container">
    <div class="login_card">
      <h2 class="title">欢迎登录</h2>

      <el-form class="login_form" :model="form" :rules="rules" ref="loginForms">
        <el-form-item class="form_group" prop="username">
          <el-input v-model="form.username" placeholder="请输入电话号" :prefix-icon="User" class="custom_input" />
        </el-form-item>

        <el-form-item class="form_group" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password
            class="custom_input" />
        </el-form-item>

        <div class="button_container">
          <el-button :loading="loading" class="action_btn submit_btn" @click="handleSubmit">
            <span class="btn_text">立即登录</span>
            <span class="btn_wave"></span>
          </el-button>
          <el-button class="action_btn register_btn" @click="goToRegister">
            <span class="btn_text">注册账号</span>
            <span class="btn_wave"></span>
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';

//引入表单数据类型
import type { LoginForm } from "@/api/user/type.ts";

//引入用户相关小仓库
import useUserStore from '@/store/modules/user.ts';

import { useRouter } from 'vue-router';

import { ElNotification } from 'element-plus'

//引入获取当前时间的函数
import { getTime } from "@/utils/times.ts";

const router = useRouter(); // 添加对 useRouter 的使用，创建 router 实例

const userStore = useUserStore();

const loginForms = ref();

const form = reactive<LoginForm>({
  username: '',
  password: ''
});

//定义表单对象校验配置
const rules = {
  teleohone: [
    { required: true, message: '请输入电话号', trigger: 'blur' },
    { min: 11, max: 12, message: '长度为11个数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' }
  ]
}

//控制按钮加载效果
let loading = ref(false);

const handleSubmit = async () => {
  // 表单验证逻辑
  // 提交登录逻辑
  try {
    //在这里失败请求直接发不出去，不会有message的值
    await loginForms.value?.validate();
  } catch (error) {
    // ElNotification({
    //   title: '登录失败',
    //   message: "表单校验失败",
    //   type: 'warning',
    // })
  }
  try {
    //开始加载
    loading.value = true;
    await userStore.userLogin(form);
    router.push('/layout');
    //停止加载
    loading.value = false;
    //登陆成功提示信息
    ElNotification({
      message: `登录成功,${getTime()}`,
      type: 'success',
      duration: 2000
    })
  } catch (error: any) {
    //加载停止
    loading.value = false;
    //登录失败提示
    ElNotification({
      title: '登录失败',
      message: "账号或密码错误",
      type: 'warning',
    })
  }
};

const goToRegister = () => {
  // 跳转到注册页面的逻辑
  console.log('跳转到注册页面');
};
</script>

<style scoped>
.login_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login_card {
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login_card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.form_group {
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

/* 按钮容器样式 */
.button_container {
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

/* 按钮基础样式 */
.action_btn {
  position: relative;
  flex: 1;
  padding: 12px 0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

/* 登录按钮样式 */
.submit_btn {
  background: #2980b9;
  color: white;
  border: 1px solid #2980b9;
}

.submit_btn:hover {
  background: #3498db;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
}

/* 注册按钮样式 */
.register_btn {
  background: transparent;
  color: #2980b9;
  border: 1px solid #2980b9;
}

.register_btn:hover {
  background: rgba(41, 128, 185, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(41, 128, 185, 0.2);
}

/* 波浪动画效果 */
.btn_wave {
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.4) 50%,
      transparent);
  transform: translateX(-100%);
  transition: none;
  pointer-events: none;
}

.action_btn:hover .btn_wave {
  animation: wave 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes wave {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* 按钮文字样式 */
.btn_text {
  position: relative;
  z-index: 1;
}
</style>