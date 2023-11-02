import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../firebase/AuthContext"

const SearchPopup = ({ update }) => {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()

  const closeModal = (event) => {
    setShowModal(false)
    setSearch("")
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

  useEffect(() => {
    if (selectedUser !== null) {
      setShowModal(false)

      axios
        .get(
          `http://localhost:5555/conversations/check/${currentUser.uid}/${selectedUser.fireID}`
        )
        .then((res) => {
          if (res.data.data.length === 0) {
            axios
              .get(`http://localhost:5555/users/${currentUser.uid}`)
              .then((response) => {
                const data = {
                  messages: [],
                  participants: [response.data[0], selectedUser],
                }

                axios
                  .post("http://localhost:5555/conversations", data)
                  .then((response) => {
                    update(response.data)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            update(res.data.data[0])
          }
        })
        .catch((error) => {
          console.log(error)
        })

      setSelectedUser(null)
      setSearch("")
    }
  }, [selectedUser])

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add conversation
      </button>
      <div
        onClick={closeModal}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${
          showModal ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all ${
            showModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <input
              type="text"
              placeholder="Search for user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user)
              }}
            >
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchPopup
