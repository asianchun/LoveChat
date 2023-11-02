import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../firebase/AuthContext"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"

const Profile = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [fullName, setFullName] = useState("")
  const [user, setUser] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  //Update the user profile
  const handleClick = async (event) => {
    if (firstName !== "" && lastName !== "" && phoneNumber !== "") {
      event.preventDefault()

      try {
        setError("")
        setLoading(true)

        const data = {
          firstName,
          lastName,
          phoneNumber,
        }

        const result = await axios.put(
          `http://localhost:5555/users/${user._id}`,
          data
        )

        setUser(result.data)
        setSuccess("Profile updated successfully")
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }
  }

  //Load the current user information
  useEffect(() => {
    axios
      .get(`http://localhost:5555/users/${currentUser.uid}`)
      .then((response) => {
        setUser(response.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  //Update the fields based on the current user
  useEffect(() => {
    if (user.firstName && user.lastName) {
      setFullName(`${user.firstName} ${user.lastName}`)
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setPhone(user.phoneNumber)
    }
  }, [user])

  return (
    <main className="relative">
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        {fullName !== "" ? (
          <>
            <h2 className="flex items-center justify-between text-3xl font-semibold font-montserrat mb-5 w-[370px]">
              <BackButton />
              Hey, {fullName}!
            </h2>
            <div className="px-7 py-5 border rounded-xl w-[370px] shadow-xl">
              {error && (
                <div
                  className="bg-red-200 border border-red-400 text-slate-600 font-semibold font-montserrat text-center mb-2 rounded-md py-3 hover:cursor-pointer"
                  onClick={() => setError("")}
                >
                  Something went wrong
                </div>
              )}
              {success && (
                <div
                  className="bg-green-200 border border-green-400 text-black font-montserrat text-center mb-2 rounded-md py-3 hover:cursor-pointer"
                  onClick={() => setSuccess("")}
                >
                  {success}!
                </div>
              )}
              <form>
                <div className="flex flex-col mb-2">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    required
                    disabled={loading}
                    placeholder="John"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value.replace(/[^a-zA-Z\s]+/g, ""))
                    }
                    className="bg-white border-black border shadow-sm rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    required
                    disabled={loading}
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value.replace(/[^a-zA-Z\s]+/g, ""))
                    }
                    className="bg-white border-black border shadow-sm rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  />
                </div>
                <div className="flex flex-col mb-9">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    maxLength="10"
                    required
                    disabled={loading}
                    placeholder="0423353253"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^0-9]/g, ""))
                    }}
                    className="bg-white border-black border shadow-sm rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                  />
                </div>
                <div className="text-center mb-2">
                  <button
                    onClick={handleClick}
                    disabled={loading}
                    className="border rounded-3xl py-2 w-full text-[#04364A] bg-green-300 font-montserrat hover:bg-green-400"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  )
}

export default Profile
