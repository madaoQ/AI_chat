<template>
  <div class="chat-container">
    <!-- Chat messages area -->
    <div class="chat-messages" ref="messagesContainer">
      <el-scrollbar height="calc(100vh - 130px)" always>
        <div v-if="messages.length === 0" class="empty-state">
          <div class="empty-content">
            <el-icon class="empty-icon"><ChatDotRound /></el-icon>
            <h2>开始一段新的对话</h2>
            <p>AI 助手可以回答问题、提供信息或帮助完成任务</p>
            <el-button type="primary" @click="focusInput" class="start-button">开始对话</el-button>
          </div>
        </div>

        <template v-else>
          <div class="messages-list">
            <div v-for="(message, index) in messages" :key="index" :class="['message-wrapper', message.role]">
              <!-- AI Message -->
              <div v-if="message.role === 'assistant'" class="message-item">
                <div class="message-avatar">
                  <el-avatar :size="36" :icon="Service" class="ai-avatar" />
                </div>
                <div class="message-bubble">
                  <div class="message-content">
                    <div class="message-text" v-html="formatMessage(message.content)"></div>
                    <div class="message-time">{{ message.time }}</div>
                  </div>
                </div>
              </div>
              
              <!-- User Message -->
              <div v-else class="message-item">
                <div class="message-bubble">
                  <div class="message-content">
                    <div class="message-text" v-html="formatMessage(message.content)"></div>
                    <div class="message-time">{{ message.time }}</div>
                  </div>
                </div>
                <div class="message-avatar">
                  <el-avatar :size="36" :icon="User" class="user-avatar" />
                </div>
              </div>
            </div>
            
            <!-- Typing indicator when loading -->
            <div v-if="isLoading" class="message-wrapper assistant">
              <div class="message-item">
                <div class="message-avatar">
                  <el-avatar :size="36" :icon="Service" class="ai-avatar" />
                </div>
                <div class="message-bubble typing-bubble">
                  <div class="typing-indicator">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-scrollbar>
    </div>

    <!-- Chat input area - fixed at bottom -->
    <div class="chat-input-container" :class="{fold:layoutSettingStore.fold?true:false}">
      <div class="chat-input">
        <el-input
          v-model="inputMessage"
          type="textarea"
          :rows="1"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="发送消息给 AI Assistant..."
          @keyup.enter.prevent="handleEnterKey"
          ref="inputField"
        >
          <template #append>
            <el-button
              type="primary"
              :icon="isLoading ? Loading : Position"
              :disabled="!inputMessage.trim() || isLoading"
              @click="sendMessage"
              class="send-button"
            />
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { ChatDotRound, User, Service, Position, Loading } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
//获取layout小仓库
import useLayoutStore from '@/store/modules/setting'

const layoutSettingStore = useLayoutStore()

// Configure marked with highlight.js for code syntax highlighting
const renderer = new marked.Renderer();

// 自定义代码块渲染逻辑
renderer.code = function ({ text, lang, escaped }) {
  const code = escaped ? text : hljs.highlightAuto(text).value;
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  return `<pre><code class="hljs ${language}">${
    hljs.highlight(code, { language }).value
  }</code></pre>`;
};

// 设置 marked 的选项
marked.setOptions({
  renderer: renderer,
  breaks: true, // 将换行符转换为 <br>
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const messages = ref<Message[]>([]);
const inputMessage = ref('');
const isLoading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);
const inputField = ref<HTMLElement | null>(null);

// Format message with markdown
const formatMessage = (content: string): string => {
  const html = marked.parse(content) as string;
  return DOMPurify.sanitize(html);
};

// Get formatted time
const getFormattedTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

// Handle Enter key (send on Enter, new line on Shift+Enter)
const handleEnterKey = (e: KeyboardEvent) => {
  if (!e.shiftKey && inputMessage.value.trim()) {
    sendMessage();
  }
};

// Focus the input field
const focusInput = () => {
  if (inputField.value) {
    const input = inputField.value as any;
    if (input.focus) {
      input.focus();
    } else if (input.$el && input.$el.querySelector('textarea')) {
      input.$el.querySelector('textarea').focus();
    }
  }
};

// Scroll to bottom of messages
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    const scrollbar = messagesContainer.value.querySelector('.el-scrollbar__wrap');
    if (scrollbar) {
      scrollbar.scrollTop = scrollbar.scrollHeight;
    }
  }
};

// Watch for changes in messages to scroll to bottom
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// Send message and get AI response
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return;
  
  // Add user message
  const userMessage = inputMessage.value.trim();
  messages.value.push({
    role: 'user',
    content: userMessage,
    time: getFormattedTime()
  });
  
  // Clear input
  inputMessage.value = '';
  
  await scrollToBottom();
  
  // Set loading state
  isLoading.value = true;
  
  try {
    // Simulate streaming response (in a real app, you would use an API call here)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For this demo, we'll simulate a response
    const aiResponse = `我是一个 AI 助手，使用 Vue 3、TypeScript 和 Element Plus 构建。这是一个模拟的流式响应。

以下是这个界面的一些特点：
- Markdown 支持 **粗体** 和 *斜体* 文本
- 代码块支持语法高亮
\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`
- 响应式设计
- 输入框自动调整大小
- 用户消息在右侧显示，头像在文字右侧
- AI 回复在左侧显示，头像在文字左侧`;
    
    // Add AI response
    messages.value.push({
      role: 'assistant',
      content: aiResponse,
      time: getFormattedTime()
    });
    
    await scrollToBottom();
  } catch (error) {
    console.error('Error getting AI response:', error);
    ElMessage.error('获取 AI 响应时出错');
    messages.value.push({
      role: 'assistant',
      content: '抱歉，处理您的请求时遇到了错误。',
      time: getFormattedTime()
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  focusInput();
});
</script>

<style lang="less">
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); // Adjust based on your top navbar height
  background-color: #f9fafb;
  position: relative;


  .chat-messages {
    flex: 1;
    overflow: hidden;
    padding: 0;
    margin-bottom: 70px; // Space for fixed input
    
    .empty-state {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 20px;
      
      .empty-content {
        text-align: center;
        max-width: 400px;
        
        .empty-icon {
          font-size: 48px;
          color: #67c23a;
          background-color: rgba(103, 194, 58, 0.1);
          padding: 16px;
          border-radius: 50%;
          margin: 0 auto 20px;
        }
        
        h2 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #303133;
        }
        
        p {
          color: #606266;
          margin-bottom: 24px;
        }
        
        .start-button {
          padding: 12px 24px;
          font-size: 16px;
        }
      }
    }
    
    .messages-list {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .message-wrapper {
      display: flex;

      &.user {
        justify-content: flex-end;
        
        .message-item {
          .message-bubble {
            background-color: #e9d8fd; // Light purple like in the image
            color: #4a5568;
            border-radius: 16px 16px 0 16px;
            margin-right: 12px;
            
            pre {
              background-color: rgba(0, 0, 0, 0.1);
            }
            
            code {
              background-color: rgba(0, 0, 0, 0.1);
            }
            
            .message-time {
              color: rgba(74, 85, 104, 0.7);
              text-align: right;
              margin-top: -15px;
            }
          }
          
          .user-avatar {
            background-color: #805ad5;
            color: white;
          }
        }
      }
      
      &.assistant {
        justify-content: flex-start;
        
        .message-item {
          .message-bubble {
            background-color: white;
            border-radius: 16px 16px 16px 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            margin-left: 12px;
          }
        }
        
        .ai-avatar {
          background-color: #805ad5; // Purple to match the theme
          color: white;
        }
      }
    }
    
    .message-item {
      display: flex;
      align-items: flex-start;
      max-width: 85%;
      
      .message-avatar {
        flex-shrink: 0;
      }
      
      .message-bubble {
        padding: 12px 16px;
        
        .message-content {
          .message-text {
            line-height: 1.6;
            font-size: 14px;
            white-space: pre-wrap;
            word-break: break-word;
            
            p {
              margin: 8px 0;
              
              &:first-child {
                margin-top: 0;
              }
              
              &:last-child {
                margin-bottom: 0;
              }
            }
            
            code {
              font-family: Consolas, Monaco, 'Andale Mono', monospace;
              background-color: #f5f7fa;
              padding: 2px 4px;
              border-radius: 3px;
              font-size: 13px;
            }
            
            pre {
              background-color: #2b2b2b;
              color: #f8f8f2;
              padding: 12px;
              border-radius: 4px;
              overflow-x: auto;
              margin: 12px 0;
              
              code {
                background-color: transparent;
                padding: 0;
                color: inherit;
                font-size: 13px;
              }
            }
          }
          
          .message-time {
            font-size: 11px;
            color: #a0aec0;
            margin-top: 4px;
            opacity: 0.7;
          }
        }
      }
      
      .typing-bubble {
        padding: 12px 16px;
        min-width: 60px;
        
        .typing-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          
          .dot {
            width: 8px;
            height: 8px;
            background-color: #805ad5;
            border-radius: 50%;
            margin: 0 3px;
            animation: bounce 1.4s infinite ease-in-out;
            
            &:nth-child(1) {
              animation-delay: 0s;
            }
            
            &:nth-child(2) {
              animation-delay: 0.2s;
            }
            
            &:nth-child(3) {
              animation-delay: 0.4s;
            }
          }
        }
      }
    }
  }
  
  .chat-input-container {
    position: fixed;
    width: calc(100% - @menu-width);
    bottom: 0;
    left: @menu-width;
    background-color: #ffffff;
    border-top: 1px solid #ebeef5;
    z-index: 999;
    padding: 16px 20px;
    transition: all 0.2s ease-in-out;

    &.fold {
      width: calc(100% - @menu-fold-width);
      left: @menu-fold-width;
    }
    
    .chat-input {
      max-width: calc(100% - 40px);
      margin: 0 auto;
      
      .el-textarea {
        .el-input__wrapper {
          padding-right: 0;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition: box-shadow 0.3s;
          
          &:hover, &:focus-within {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          }
        }
        
        .el-input-group__append {
          padding: 0;
        }
        
        textarea {
          padding: 12px;
          font-size: 14px;
        }
      }
      
      .send-button {
        height: 100%;
        border-radius: 0 8px 8px 0;
        width: 50px;
        
        &:not(:disabled) {
          background-color: #805ad5; // Purple to match the theme
          border-color: #805ad5;
          
          &:hover {
            background-color: #6b46c1;
            border-color: #6b46c1;
          }
        }
      }
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .chat-container {
    .chat-messages {
      .message-item {
        max-width: 95%;
      }
    }
    
    .chat-input-container {
      left: 0;
      padding: 12px;
    }
  }
}
</style>