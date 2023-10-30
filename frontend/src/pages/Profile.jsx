import React from "react"
import axios from "axios"
import Spinner from "../components/Spinner"
import { useAuth } from "../firebase/AuthContext"

const Profile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    setLoading(true)

    axios
      .get(`http://localhost:5555/users/${currentUser.uid}`)
      .then((response) => {
        setUser(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return <div>Profile</div>
}

export default Profile
