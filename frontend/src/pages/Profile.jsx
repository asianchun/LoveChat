import { useState, useEffect } from "react"
import axios from "axios"
import Spinner from "../components/Spinner"
import { useAuth } from "../firebase/AuthContext"
import BackButton from "../components/BackButton"

const Profile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    setLoading(true)

    axios
      .get(`http://localhost:5555/users/${currentUser.uid}`)
      .then((response) => {
        setUser(response.data[0])
        console.log(user)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      My Profile
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h3>Email:</h3>
          <span>{user.email}</span>
          <h3>Name:</h3>
          <span>
            {user.firstName} {user.lastName}
          </span>
          <h3>Phone Number:</h3>
          <span>{user.phoneNumber}</span>
        </div>
      )}
    </div>
  )
}

export default Profile
