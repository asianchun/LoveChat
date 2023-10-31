import Popup from "reactjs-popup"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../firebase/AuthContext"

const SearchPopup = () => {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const { currentUser } = useAuth()

  const createConversation = (e) => {
    console.log("Created")
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/all/${currentUser.uid}`)
      .then((response) => {
        setUsers(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (search === "") {
      setFilteredUsers([])
    } else {
      setFilteredUsers(
        users.filter((user) => {
          return user.email.includes(search)
        })
      )
    }
  }, [search])

  return (
    <Popup trigger={<button> Add conversation</button>} modal>
      <input
        type="text"
        placeholder="Search for user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredUsers.map((user) => (
        <div key={user._id} onClick={createConversation}>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.email}</p>
        </div>
      ))}
    </Popup>
  )
}

export default SearchPopup
