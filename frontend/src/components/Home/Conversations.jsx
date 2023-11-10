import { useAuth } from "../../firebase/AuthContext"
import { useState, useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { GoDotFill } from "react-icons/go"

const Conversations = ({
  conversations,
  selectConversation,
  currentConversation,
  deleteConversation,
  unread,
}) => {
  const { currentUser } = useAuth()
  const [focused, setFocused] = useState(currentConversation)

  useEffect(() => {
    setFocused(currentConversation)
  }, [currentConversation])

  return (
    <div className="max-h-[360px] overflow-y-scroll hover:scrollbar hover:scrollbar-4">
      {!focused ? (
        <p className="px-2">Add conversations above</p>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => {
              selectConversation(conversation)
            }}
            className={`px-2 py-2 rounded-md mr-1 hover:cursor-pointer ${
              focused._id === conversation._id && "bg-slate-300"
            } hover:bg-slate-200 flex justify-between items-center`}
          >
            {conversation.participants.map(
              (participant) =>
                participant.fireID !== currentUser.uid && (
                  <p key={participant._id}>
                    {participant.firstName}{" "}
                    <span className="max-sm:hidden">
                      {participant.lastName}
                    </span>
                  </p>
                )
            )}
            <GoDotFill
              className={`text-pink ${
                unread.includes(conversation._id) ? "block" : "hidden"
              }`}
            />
            <AiOutlineClose
              onClick={() => deleteConversation(conversation._id)}
              className={`hover:text-pink text-slate-700 ${
                focused._id === conversation._id ? "block" : "hidden"
              }`}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default Conversations
