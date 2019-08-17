const mutation = {
  addChatMsg (state, obj) {
    console.log(obj.model)
    state.chatMsgList.push({ userInput: obj.msg, chatModel: obj.model })
  }
}
export default mutation
