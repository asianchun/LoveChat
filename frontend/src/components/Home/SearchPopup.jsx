import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../firebase/AuthContext"
import { AiOutlineSearch } from "react-icons/ai"

const SearchPopup = ({ addConversation }) => {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()

  const closeModal = () => {
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
          const name =
            user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()

          return (
            user.email.includes(search.toLowerCase()) ||
            name.includes(search.toLowerCase())
          )
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
                    addConversation(response.data)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            addConversation(res.data.data[0])
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
    <div>
      <button
        className=" text-black active:bg-pink-600 w-full font-bold text-sm border border-pink py-1 px-2 rounded-md shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 transform"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <AiOutlineSearch />
      </button>
      <div
        onClick={closeModal}
        className={`fixed inset-0 flex justify-center items-start transition-colors z-20 ${
          showModal ? "visible bg-black/20" : "invisible"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-[450px] rounded-xl shadow p-4 relative top-[20%] transition-all font-montserrat ${
            showModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search for users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 text-xl outline-none rounded-xl bg-slate-200 w-full"
          />
          {search !== "" && (
            <h3 className="pl-4 mt-6 mb-2 text-sm uppercase">
              {filteredUsers.length === 0 && "No users found"}
            </h3>
          )}
          <div className="max-h-[224px] overflow-y-scroll scrollbar scrollbar-8">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedUser(user)
                }}
                className="hover:cursor-pointer hover:bg-slate-200 rounded-md px-4 py-1 flex gap-2 items-center mr-1"
              >
                <h1 className="font-[400]">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-slate-400 text-[13px]">{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPopup
