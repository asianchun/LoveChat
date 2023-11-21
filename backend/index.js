import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import conversationRoute from "./routes/conversationRoute.js"
import messageRoute from "./routes/messageRoute.js"
import cors from "cors"
import { Server } from "socket.io"

const app = express()

//Middleware for parsing request body
app.use(express.json())

app.use(
  cors({
    origin: "https://mern-front-ep51.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
)

//Home Route
app.get("/", (req, res) => {
  console.log(req)
  return res.status(234).send("Hello World") //Return a result with status 234
})

app.use("/users", userRoute)
app.use("/conversations", conversationRoute)
app.use("/messages", messageRoute)

//Connect the app to the database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database")
    //Creates a server for us to use
    const server = app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })

    //Initialize web socket
    const io = new Server(server)

    io.on("connection", (socket) => {
      console.log("Connected")
      socket.on("message", (message) => {
        console.log(`Received message: ${message}`)
        socket.broadcast.emit("message", message)
      })
    })
  })
  .catch((error) => {
    console.log(error)
  })
