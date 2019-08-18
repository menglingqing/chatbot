<template>
  <div class="chatMsg">
    <div class="user">
      <span class="chatbotmsg-content">{{userInput}}</span>
      <!-- <Avatar :src="chatbotAvatar" /> -->
    </div>
    <div class="chatbot">
      <Avatar :src="chatbotAvatar" />
      <span class="chatbotmsg-content" v-if="chatModel.name === 'chat'">你好</span>
      <span class="chatbotmsg-content" v-else-if="chatModel.name === 'auto_completion'">
          <AutoComplete></AutoComplete>
      </span>
      <span class="chatbotmsg-content" v-else-if="chatModel.name === 'upload'">
          <tableUpload></tableUpload>
      </span>
      <span class="chatbotmsg-content" v-else-if="chatModel.name === 'duty'">日历</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import chatbotAvatar from "@/assets/logo.png";
import AutoComplete from "./AutoComplete";
import tableUpload from './tableUpload'
export default {
  data() {
    return {
      chatbotAvatar
    };
  },
  components: {
    AutoComplete,
    tableUpload
  },
  props: {
    userInput: {
      type: String
    },
    chatModel: {
      type: Object
    }
  },
  updated() {
    this.$nextTick(() => {
      console.log(this.$refs);
    });
  },
  created() {}
};
</script>

<style scoped>
/* 机器人消息列表 */
.user {
  display: flex;
  justify-content: flex-end;
}
.chatbot {
  display: flex;
  justify-content: flex-start;
}
.chatMsg {
  margin: 5vh 2vw;
}
.ivu-avatar {
  vertical-align: sub;
}
.user .chatbotmsg-content {
  display: inline-block;
  margin: 1em;
  padding: 1em 2em;
  background: #097fe0;
  border-radius: 1em 5px 1em 1em;
  color: #fff;
}
.chatbot .chatbotmsg-content {
  display: inline-block;
  margin: 1em;
  padding: 1em 2em;
  background: #eee;
  border-radius: 5px 1em 1em;
}
</style>