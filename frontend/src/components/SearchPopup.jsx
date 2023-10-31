import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../firebase/AuthContext"

const SearchPopup = ({ update }) => {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()

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
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <input
                    type="text"
                    placeholder="Search for user"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default SearchPopup
