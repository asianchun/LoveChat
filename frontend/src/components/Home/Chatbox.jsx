import { useState, useEffect } from "react"
import { useAuth } from "../../firebase/AuthContext"
import axios from "axios"
import { IoMdSend } from "react-icons/io"

const ChatBox = ({ conversation, update, socket }) => {
  const { currentUser } = useAuth()
  const [otherUser, setOtherUser] = useState({})
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  //Update the current conversation of a chatBox
  useEffect(() => {
    if (conversation !== null && conversation) {
      setText("")
      if (conversation.messages.length !== 0) {
        const data = conversation.messages.slice().sort((a, b) => {
          const dateA = new Date(a.updatedAt)
          const dateB = new Date(b.updatedAt)

          // Compare the Date objects for sorting
          return dateB - dateA
        })

        setMessages(data)
      } else {
        setMessages([])
      }

      conversation.participants.map((participant) => {
        if (participant.fireID !== currentUser.uid) {
          setOtherUser(participant)
        }
      })
    }
  }, [conversation])

  const sendMessage = async () => {
    if (text !== "") {
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
    <section className="col-span-4 ml-3 font-montserrat bg-slate-100 p-4 rounded-xl border-slate-200 border flex flex-col justify-between">
      {conversation ? (
        <>
          <div className="h-full">
            <h1 className="font-bold text-xl mb-4 border-b-2 border-green-300 px-2">
              {otherUser.firstName} {otherUser.lastName}
            </h1>
            <div className="flex flex-col-reverse justify-between px-2 max-h-[288px] overflow-y-auto scrollbar scrollbar-6">
              {messages.length === 0 ? (
                <div>No messages</div>
              ) : (
                messages.map((message) => (
                  <div key={message._id} className="my-1">
                    {message.senderID === currentUser.uid ? (
                      <h4 className="font-bold text-pink">
                        You{" "}
                        <span className="text-[10px] text-slate-500">
                          {new Date(message.createdAt)
                            .toLocaleString("en-AU", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace(/,/, "")}
                        </span>
                      </h4>
                    ) : (
                      <h4 className="font-bold text-slate-700">
                        {otherUser.firstName} {otherUser.lastName}{" "}
                        <span className="text-[10px] text-slate-500">
                          {new Date(message.createdAt)
                            .toLocaleString("en-AU", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace(/,/, "")}
                        </span>
                      </h4>
                    )}
                    <p>{message.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Type a Message"
              value={text}
              disabled={loading}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage()
                }
              }}
              className="input w-full font-montserrat pr-10"
            />
            <button
              className="absolute right-2 top-[6px] slate text-green-400 font-palanquin disabled:text-slate-500 hover:text-pink"
              onClick={sendMessage}
              disabled={loading}
            >
              <IoMdSend size={25} />
            </button>
          </div>
        </>
      ) : (
        <h1 className="font-bold text-xl">
          Welcome, are you ready to chat? :)
        </h1>
      )}
    </section>
  )
}

export default ChatBox
