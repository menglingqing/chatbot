<template>
  <!-- eslint-disable -->
  <div class="layout">
    <Layout>
      <Layout>
        <Header :style="{padding: 0, minHeight: '10vh'}" class="layout-header-bar">
          <span class="chatbot-name">{{chatbotName}}</span>
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '0 20px'}"
            type="md-menu"
            size="24"
          ></Icon>
        </Header>
      </Layout>
      <Layout>
        <Layout>
          <Content
            :style="{margin: '20px', background: '#fff', height: '70vh', overflow: 'scroll'}"
            ref="chatContent"
          >
            <div class="chatMsg">
              <Avatar :src="chatbotAvatar" />
              <span class="chatbotmsg-content">{{initChatbotAnswer}}</span>
            </div>
            <ChatMsg
              v-for="(item, index) in chatMsgList"
              :key="index"
              :userInput="item.userInput"
              :chatModel="item.chatModel"
            ></ChatMsg>
          </Content>
          <Footer :style="{minHeight: '10vh', background: '#fff'}">
            <Input v-model="userInput" :placeholder="userInputPlaceholder" @on-enter="sendMsg">
              <Button type="primary" slot="suffix" @click="sendMsg">发 送</Button>
            </Input>
          </Footer>
        </Layout>
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu
            :active-name="chatModelIndex"
            theme="primary"
            width="auto"
            :class="menuitemClasses"
            @on-select="changeChatModel"
          >
            <MenuItem :name="`1-${index + 1}`" v-for="(item, index) in chatModelList" :key="index">
              <Icon :type="item.icon"></Icon>
              <span>{{item.cn}}</span>
            </MenuItem>
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  </div>
</template>
<script>
/* eslint-disable */
import chatbotAvatar from "@/assets/logo.png";
import ChatMsg from "./ChatMsg";
export default {
  data() {
    return {
      chatbotAvatar,
      isCollapsed: false,
      chatbotName: "自动回复助手",
      chatModelIndex: "1-2",
      initChatbotAnswer: "请问有什么可以帮助您的？",
      userInput: "",
      userInputPlaceholder: "请在此输入内容",
      chatModelList: [],
      chatModel: {}
    };
  },
  components: {
    ChatMsg
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    chatMsgList() {
      return this.$store.state.chatMsgList;
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    changeChatModel(val) {
      const index = val.split("-")[1];
      this.chatModelIndex = "1-" + index;
      this.chatModel = this.chatModelList[index - 1];
      if (this.chatModel.name !== "chat") {
        this.userInput = this.chatModel.cn;
        this.easySend();
      }
    },
    easySend() {
      const obj = {
        msg: this.userInput,
        model: this.chatModel
      };
      this.$store.commit("addChatMsg", obj);
      this.userInput = "";
    },
    sendMsg() {
      if (this.userInput === "") {
        this.userInputPlaceholder = "请和我说句话吧！";
      } else {
        const obj = {
          msg: this.userInput,
          model: this.chatModel
        };
        this.chatModelIndex = "1-1";
        this.changeChatModel(this.chatModelIndex);
        this.$store.commit("addChatMsg", obj);
        this.userInput = "";
      }
    }
  },
  updated() {
    this.$refs["chatContent"].$el.scrollTop = this.$refs[
      "chatContent"
    ].$el.scrollHeight;
  },
  created() {
    const time = new Date();
    this.chatModelIndex = "1-2";
    this.chatModelList = [
      { name: "chat", cn: "普通对话", icon: "ios-chatbubbles" },
      { name: "auto_completion", cn: "自动匹配", icon: "ios-search" },
      { name: "upload", cn: "上传文件", icon: "ios-cloud-upload" },
      { name: "duty", cn: "日历", icon: "ios-alarm" }
    ];
    this.changeChatModel(this.chatModelIndex);
    this.initChatbotAnswer =
      time.getHours <= 12
        ? "上午好～" + this.initChatbotAnswer
        : "下午好～" + this.initChatbotAnswer;
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #097fe0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color:#fff;
}
.ivu-layout-sider {
  background: #fff;
}
.chatbot-name{
  text-indent: 2em;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

/* 机器人消息列表 */
.chatMsg {
  margin: 5vh 2vw;
}
.ivu-avatar {
  vertical-align: sub;
}
.chatbotmsg-content {
  margin: 1em;
  padding: 1em 2em;
  background: #eee;
  border-radius: 5px 1em 1em;
}
</style>