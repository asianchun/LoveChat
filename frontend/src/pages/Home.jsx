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
  const [unread, setUnread] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const { currentUser } = useAuth()
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)

  //Update the current conversation
  const setConversationMessages = (conversation) => {
    setCurrentConversation(conversation)
    readConversation(conversation)
  }

  //Read the conversation, update it in the database as well
  const readConversation = (conversation) => {
    if (unread.includes(conversation._id)) {
      setUnread(unread.filter((message) => message !== conversation._id))

      axios
        .put(
          `https://mern-chat-fnmn.onrender.com/users/read/${user._id}/${conversation._id}`
        )
        .then((response) => {
          console.log("success")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  //Delete the conversation
  const deleteConversation = async (id) => {
    try {
      await axios.delete(
        `https://mern-chat-fnmn.onrender.com/conversations/${id}`
      )

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
      setConversations([conversation, ...conversations])
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

    const filter = filterConversations(update)

    setConversations(filter)
  }

  //Add a new message to an unread array
  const receiveMessage = (newConversation) => {
    setUnread([...unread, newConversation._id])
    if (currentConversation._id === newConversation._id) {
      updateConversations(newConversation)
    } else {
      const update = conversations.map((conversation) => {
        if (conversation._id === newConversation._id) {
          return newConversation
        }
        return conversation
      })

      const filter = filterConversations(update)

      setConversations(filter)
    }
  }

  //Make sure the newest message is on top
  const filterConversations = (conversations) => {
    const filter = conversations.slice().sort((a, b) => {
      const dateA = new Date(a.updatedAt)
      const dateB = new Date(b.updatedAt)

      // Compare the Date objects for sorting
      return dateB - dateA
    })

    return filter
  }

  useEffect(() => {
    setLoading(true)

    //Get all the conversations of a user
    axios
      .get(
        `https://mern-chat-fnmn.onrender.com/conversations/${currentUser.uid}`
      )
      .then((response) => {
        const filter = filterConversations(response.data.data)

        setConversations(filter)
        setCurrentConversation(filter[0])
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })

    axios
      .get(`https://mern-chat-fnmn.onrender.com/users/${currentUser.uid}`)
      .then((response) => {
        setUser(response.data[0])
        setUnread(response.data[0].unread)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    //Connect to web socket server
    const socket = io("https://mern-chat-fnmn.onrender.com", {
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
      receiveMessage(data)
    })

    //Clean up on unmount
    return () => {
      socket.disconnect()
    }
  }, [currentConversation])

  return (
    <div className="main-container">
      <div className="grid grid-cols-5 rounded-xl max-w-[1400px] w-full max-h-[480px] h-full lg:border lg:shadow-xl p-7 mx-5">
        <section>
          <SearchPopup addConversation={addConversation} />
          <div className="font-palanquin mt-2 mb-1">
            <h2 className="uppercase mb-2 font-semibold">Chats</h2>
            {loading ? (
              <Spinner />
            ) : (
              <Conversations
                currentConversation={currentConversation}
                conversations={conversations}
                selectConversation={setConversationMessages}
                deleteConversation={deleteConversation}
                unread={unread}
              />
            )}
          </div>
        </section>
        <ChatBox
          conversation={currentConversation}
          update={updateConversations}
          socket={socket}
          selectConversation={readConversation}
        />
      </div>
    </div>
  )
}

export default Home
