import express from "express"
import { User } from "../models/UserModel.js"

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

export default router
