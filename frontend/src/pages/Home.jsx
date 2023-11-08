import { useState, useEffect } from "react"
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
  const { currentUser } = useAuth()
  const [socket, setSocket] = useState(null)

  //Update the current conversation
  const setConversationMessages = (conversation) => {
    setCurrentConversation(conversation)
  }

  //Delete the conversation
  const deleteConversation = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/conversations/${id}`)

      const newConversations = conversations.filter(
        (conversation) => conversation._id !== id
      )

      setConversations(newConversations)
      setCurrentConversation(newConversations[0])
    } catch (error) {
      console.log(error)
    }
  }

  //Add a new conversation if it doesn't exist
  //Open the selected conversation
  const addConversation = (conversation) => {
    setCurrentConversation(conversation)

    const isExistingConversation = conversations.some(
      (convo) => convo._id === conversation._id
    )

    if (!isExistingConversation) {
      setConversations([...conversations, conversation])
    }
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
      //updateConversations(data)
    })

    //Get all the conversations of a user
    axios
      .get(`http://localhost:5555/conversations/${currentUser.uid}`)
      .then((response) => {
        setConversations(response.data.data)
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

  //Put new conversations on top
  useEffect(() => {
    if (conversations.length !== 0) {
      const filter = conversations.slice().sort((a, b) => {
        const dateA = new Date(a.updatedAt)
        const dateB = new Date(b.updatedAt)

        // Compare the Date objects for sorting
        return dateB - dateA
      })

      setCurrentConversation(filter[0])

      if (filter[0]._id !== conversations[0]._id) {
        setConversations(filter)
      }
    }
  }, [conversations])

  return (
    <div className="main-container">
      <div className="grid grid-cols-5 rounded-xl max-w-[1400px] w-full max-h-[480px] h-full lg:border lg:shadow-xl p-7 mx-5">
        <section>
          <SearchPopup addConversation={addConversation} />
          <div className="font-palanquin mt-2 mb-1">
            <h2 className="uppercase mb-2 font-semibold">Direct messages</h2>
            {loading ? (
              <Spinner />
            ) : (
              <Conversations
                currentConversation={currentConversation}
                conversations={conversations}
                selectConversation={setConversationMessages}
                deleteConversation={deleteConversation}
              />
            )}
          </div>
        </section>
        <ChatBox
          conversation={currentConversation}
          update={updateConversations}
          socket={socket}
        />
      </div>
    </div>
  )
}

export default Home
