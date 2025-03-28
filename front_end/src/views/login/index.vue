<template>
  <div class="login_container">
    <div class="login_card">
      <h2 class="title">欢迎登录</h2>
      
      <form @submit.prevent="handleSubmit" class="login_form">
        <div class="form_group">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            class="custom_input"
          />
        </div>
        
        <div class="form_group">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
            class="custom_input"
          />
        </div>

        <div class="button_container">
          <button type="submit" class="action_btn submit_btn">
            <span class="btn_text">立即登录</span>
            <span class="btn_wave"></span>
          </button>
          <button type="button" class="action_btn register_btn" @click="goToRegister">
            <span class="btn_text">注册账号</span>
            <span class="btn_wave"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';

interface LoginForm {
  username: string;
  password: string;
}

const form = reactive<LoginForm>({
  username: '',
  password: ''
});

const handleSubmit = () => {
  // 表单验证逻辑
  if (!form.username.trim()) {
    alert('请输入账号');
    return;
  }
  if (form.password.length < 6) {
    alert('密码长度不能小于6位');
    return;
  }
  // 提交登录逻辑
  console.log('提交登录:', form);
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 400px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login_card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
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
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4) 50%,
    transparent
  );
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