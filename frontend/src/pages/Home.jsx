import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../firebase/AuthContext"
import axios from "axios"
import Spinner from "../components/Spinner"
import Conversations from "../components/Home/Conversations"
import ChatBox from "../components/Home/Chatbox"
import SearchPopup from "../components/Home/SearchPopup"
import { io } from "socket.io-client"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const { currentUser, logout } = useAuth()
  const [socket, setSocket] = useState(null)
  const navigate = useNavigate()

  //Update the current conversation
  const setConversationMessages = (conversation) => {
    setCurrentConversation(conversation)
  }

  //Add a new conversation if it doesn't exist
  //Open the selected conversation
  const addConversation = (conversation) => {
    const isExistingConversation = conversations.some(
      (convo) => convo._id === conversation._id
    )

    if (!isExistingConversation) {
      setConversations([...conversations, conversation])
    }

    setCurrentConversation(conversation)
  }

  //Update the conversation in the list of all conversations
  const updateConversations = (updated) => {
    const update = conversations.map((conversation) => {
      if (conversation._id === updated._id) {
        if (updated._id === currentConversation._id) {
          setCurrentConversation(updated)
        }
        return updated
      }
      return conversation
    })

    setConversations(update)
  }

  useEffect(() => {
    setLoading(true)

    //Connect to web socket server
    const socket = io("http://localhost:5555", {
      transports: ["websocket"],
    })
    setSocket(socket)

    //Set up event listeners for incoming messages
    socket.on("connect", () => {
      console.log("Connected to the socket")
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from the socket")
    })

    //Receiving web socket data
    socket.on("message", (data) => {
      console.log("Received")
      updateConversations(data)
    })

    //Get all the conversations of a user
    axios
      .get(`http://localhost:5555/conversations/${currentUser.uid}`)
      .then((response) => {
        setConversations(response.data.data)
        setCurrentConversation(
          response.data.data[response.data.data.length - 1]
        )
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })

    //Clean up on unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <main>
      <section>
        <SearchPopup update={addConversation} />
        <div>All conversations</div>
        {loading ? (
          <Spinner />
        ) : (
          <Conversations
            conversations={conversations}
            onHandleClick={setConversationMessages}
          />
        )}
      </section>
      <ChatBox
        conversation={currentConversation}
        update={updateConversations}
        socket={socket}
      />
    </main>
  )
}

export default Home
