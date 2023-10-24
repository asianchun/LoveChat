import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"

const app = express()

//Connect the app to the database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database")
    //Creates a server for us to use
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
