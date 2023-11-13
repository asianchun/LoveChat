import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    fireID: {
      type: String,
      required: true,
    },
    unread: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model("User", userSchema)
