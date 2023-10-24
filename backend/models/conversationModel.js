import mongoose from "mongoose"

const conversationSchema = mongoose.Schema({
  messages: {
    type: Array,
    required: true,
  },
  participants: {
    type: Array,
    required: true,
  },
})

export const Conversation = mongoose.model("Conversation", conversationSchema)
