import { useState, useEffect } from "react"
import { useAuth } from "../../firebase/AuthContext"
import axios from "axios"
import Spinner from "../Spinner"
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
      if (conversation.messages.length !== 0) {
        const data = conversation.messages.slice().sort((a, b) => {
          return a.createdAt - b.createdAt
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

  //Send a message
  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && text !== "") {
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
            <div className="flex flex-col justify-between px-2">
              {messages.length === 0 ? (
                <div>No messages</div>
              ) : (
                messages.map((message) => (
                  <div key={message._id} className="my-1">
                    {message.senderID === currentUser.uid ? (
                      <div>{message.message} right</div>
                    ) : (
                      <div>{message.message} left</div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          {loading && <Spinner />}
          <div className="relative">
            <input
              type="text"
              placeholder="Type a Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="input w-full font-montserrat"
            />
            <button className="absolute right-2 top-[6px] slate text-green-400 font-palanquin disabled:text-slate-500 hover:text-pink">
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
