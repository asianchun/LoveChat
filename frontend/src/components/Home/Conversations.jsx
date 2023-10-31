import { useAuth } from "../../firebase/AuthContext"

const Conversations = ({ conversations, onHandleClick }) => {
  const { currentUser } = useAuth()

  return (
    <div>
      {conversations.length === 0 ? (
        <span>Add more conversations by clicking the + button</span>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => {
              onHandleClick(conversation)
            }}
          >
            {conversation.participants.map((participant) =>
              participant.fireID !== currentUser.uid ? (
                <p key={participant._id}>
                  {participant.firstName} {participant.lastName}
                </p>
              ) : (
                ""
              )
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Conversations
