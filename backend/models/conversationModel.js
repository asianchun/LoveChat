import mongoose from "mongoose"

const conversationSchema = mongoose.Schema(
  {
    messages: {
      type: Array,
      required: false,
    },
    participants: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Conversation = mongoose.model("Conversation", conversationSchema)
