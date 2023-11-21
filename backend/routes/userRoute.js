import express from "express"
import { User } from "../models/userModel.js"
import { Conversation } from "../models/conversationModel.js"

const router = express.Router()

//Get all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({})

    return res.status(200).json({
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Get all users, but the one selected
router.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params
    const users = await User.find({ fireID: { $ne: id } })

    return res.status(200).json({
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Get a particular user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.find({ fireID: { $eq: id } })

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Add a user
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.phoneNumber
    ) {
      return res.status(400).send({
        message: "Send all required fields!",
      })
    }

    const newUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      fireID: req.body.fireID,
    }

    const user = await User.create(newUser)

    return res.status(201).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message })
  }
})

//Update user profile
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.phoneNumber) {
      return res.status(400).send({
        message: "Send all required fields!",
      })
    }

    const { id } = req.params
    const result = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true }
    )

    await Conversation.updateMany(
      { "participants._id": id },
      {
        $set: {
          "participants.$.firstName": req.body.firstName,
          "participants.$.lastName": req.body.lastName,
          "participants.$.phoneNumber": req.body.phoneNumber,
        },
      }
    )

    if (!result) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(201).send(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

//Read a message
router.put("/read/:id/:conversation", async (req, res) => {
  try {
    const { id, conversation } = req.params
    const result = await User.findByIdAndUpdate(
      id,
      {
        $pull: {
          unread: conversation,
        },
      },
      { new: true }
    )

    if (!result) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(201).send(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

export default router
