import express from "express"
import { Conversation } from "../models/conversationModel.js"

const router = express.Router()

//Get all conversations
router.get("/", async (req, res) => {
  try {
    const conversations = await Conversation.find({})

    return res.status(200).json({
      count: conversations.length,
      data: conversations,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Get conversations of a user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const conversations = await Conversation.find({
      "participants.fireID": id,
    })

    return res.status(200).json({
      count: conversations.length,
      data: conversations,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Check if a conversation already exists
router.get("/check/:id/:another", async (req, res) => {
  try {
    const { id, another } = req.params

    const conversation = await Conversation.find({
      "participants.fireID": { $all: [id, another] },
    })

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" })
    }

    return res.status(200).json({
      data: conversation,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Add a new conversation
router.post("/", async (req, res) => {
  try {
    if (!req.body.messages || !req.body.participants) {
      return res.status(400).send({
        message: "Send all required fields!",
      })
    }
    const newConversation = {
      messages: req.body.messages,
      participants: req.body.participants,
    }

    const conversation = await Conversation.create(newConversation)

    return res.status(201).send(conversation)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Add a new message to the conversation
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).send({
        message: "Send all required fields!",
      })
    }

    const { id } = req.params
    const conversation = await Conversation.findById(id)
    const messages = conversation.messages
    const newMessage = req.body.message
    messages.push(newMessage)

    const result = await Conversation.findByIdAndUpdate(
      id,
      {
        $set: { messages: messages },
      },
      { new: true }
    )

    if (!result) {
      return res.status(404).json({ message: "Conversation not found" })
    }

    return res.status(201).send(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

//Delete conversations
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await Conversation.findByIdAndDelete(id) //Get data and delete straight away

    if (!result) {
      return res.status(404).json({ message: "Conversation not found" })
    }

    return res
      .status(200)
      .send({ message: "Conversation deleted successfully" })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

export default router
