import express from "express"
import { Message } from "../models/messageModel.js"

const router = express.Router()

//Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({})

    return res.status(200).json({
      count: messages.length,
      data: messages,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Add a new message
router.post("/", async (req, res) => {
  try {
    if (!req.body.message || !req.body.senderID) {
      return res.status(400).send({
        message: "Send all required fields!",
      })
    }
    const newMessage = {
      message: req.body.message,
      senderID: req.body.senderID,
    }

    const message = await Message.create(newMessage)

    return res.status(201).send(message)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

export default router
