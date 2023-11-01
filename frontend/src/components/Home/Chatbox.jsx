import { useState, useEffect } from "react"
import { useAuth } from "../../firebase/AuthContext"
import axios from "axios"
import Spinner from "../Spinner"

const ChatBox = ({ conversation, update, socket }) => {
  const { currentUser } = useAuth()
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  //Update the current conversation of a chatBox
  useEffect(() => {
    if (conversation !== null && conversation) {
      if (conversation.messages.length !== 0) {
        const data = conversation.messages.slice().sort((a, b) => {
          return a.createdAt - b.createdAt
        })

        setMessages(data)
      } else {
        setMessages([])
      }
    }
  }, [conversation])

  //Send a message
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      setLoading(true)

      const message = {
        message: text,
        senderID: currentUser.uid,
      }

      //Create a new message
      const response = await axios.post(
        "http://localhost:5555/messages",
        message
      )

      const data = {
        message: response.data,
      }

      //Add a message into a conversation
      const result = await axios.put(
        `http://localhost:5555/conversations/${conversation._id}`,
        data
      )

      //Send message to web socket server
      socket.emit("message", result.data)

      setText("")
      setMessages(result.data.messages)
      setLoading(false)
      update(result.data)
    }
  }

  return (
    <section>
      <div>The chat</div>
      {messages.length === 0 ? (
        <div>No messages</div>
      ) : (
        messages.map((message) => (
          <div key={message._id}>
            {message.senderID === currentUser.uid ? (
              <div>{message.message} right</div>
            ) : (
              <div>{message.message} left</div>
            )}
          </div>
        ))
      )}
      {loading && <Spinner />}
      <input
        type="text"
        placeholder="Type a Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </section>
  )
}

export default ChatBox
