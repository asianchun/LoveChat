import React from "react"
import { useAuth } from "../../firebase/AuthContext"

const ChatBox = ({ messages }) => {
  const { currentUser } = useAuth()

  return (
    <section>
      <div>The chat</div>
      {messages.length === 0 ? (
        <span>No messages</span>
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
    </section>
  )
}

export default ChatBox
