import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../firebase/AuthContext"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import Snackbar from "../components/Snackbar"

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
                <Snackbar
                  type="error"
                  action={() => setError("")}
                  text="Something went wrong"
                />
              )}
              {success && (
                <Snackbar
                  type="success"
                  action={() => setSuccess("")}
                  text={`${success}!`}
                />
              )}
              <form>
                <div className="flex flex-col mb-4">
                  <label className="font-palanquin">First Name</label>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    placeholder="John"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value.replace(/[^a-zA-Z\s]+/g, ""))
                    }
                    className="input"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="font-palanquin">Last Name</label>
                  <input
                    type="text"
                    required
                    disabled={loading}
                    placeholder="Smith"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value.replace(/[^a-zA-Z\s]+/g, ""))
                    }
                    className="input"
                  />
                </div>
                <div className="flex flex-col mb-9">
                  <label className="font-palanquin">Phone Number</label>
                  <input
                    type="text"
                    maxLength="10"
                    required
                    disabled={loading}
                    placeholder="0423353253"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^0-9]/g, ""))
                    }}
                    className="input"
                  />
                </div>
                <div className="text-center mb-2">
                  <button
                    onClick={handleClick}
                    disabled={loading}
                    className="button text-[#04364A] bg-green-300 hover:bg-green-400"
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
