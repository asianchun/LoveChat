import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../firebase/AuthContext"
import axios from "axios"
import Spinner from "../components/Spinner"
import Conversations from "../components/Home/Conversations"
import ChatBox from "../components/Home/Chatbox"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const logoutUser = async (event) => {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch (error) {
      setError(error)
    }
  }

  const setConversationMessages = (messages) => {
    setMessages(messages)
  }

  useEffect(() => {
    setLoading(true)

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
  }, [])

  return (
    <main>
      Home Page
      <section className="flex gap-16">
        <Link to="/profile">My Profile</Link>
        <button onClick={logoutUser}>Log Out</button>
      </section>
      <section>
        Add conversation
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
      <ChatBox messages={messages} />
    </main>
  )
}

export default Home
