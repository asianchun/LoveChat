import React from "react"

const Conversations = ({ conversations, onHandleClick }) => {
  return (
    <div>
      {conversations.length === 0 ? (
        <span>Add more conversations by clicking the + button</span>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => {
              const messages = conversation.messages.slice().sort((a, b) => {
                return a.createdAt - b.createdAt
              })

              onHandleClick(messages)
            }}
          >
            {conversation.createdAt}
          </div>
        ))
      )}
    </div>
  )
}

export default Conversations
