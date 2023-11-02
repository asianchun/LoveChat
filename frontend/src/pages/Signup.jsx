import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import axios from "axios"
import Snackbar from "../components/Snackbar"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  //Toggle show password
  const toggleShow = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  //Create new user
  const handleClick = async (event) => {
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      phoneNumber !== ""
    ) {
      event.preventDefault()

      try {
        setError("")
        setLoading(true)
        const userCred = await signup(email, password)
        const user = userCred.user
        const fireID = user.uid

        const data = {
          email,
          firstName,
          lastName,
          phoneNumber,
          fireID,
        }

        await axios.post("http://localhost:5555/users", data)
        navigate("/")
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }
  }

  return (
    <main className="relative">
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h2 className="text-3xl font-semibold font-montserrat mb-5">
          Create the best connections
        </h2>
        <div className="px-7 py-5 border rounded-xl w-[370px] shadow-xl">
          {error && (
            <Snackbar
              type="error"
              action={() => setError("")}
              text="Email already exists"
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
            <div className="flex flex-col mb-4">
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
            <div className="flex flex-col mb-4">
              <label className="font-palanquin">Email</label>
              <input
                type="email"
                required
                disabled={loading}
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <div className="flex flex-col mb-9 relative">
              <label className="font-palanquin">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
              <button
                className="absolute right-2 top-[30px] slate text-green-400 font-palanquin disabled:text-slate-500"
                onClick={toggleShow}
                disabled={loading}
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
            <div className="text-center mb-2">
              <button
                onClick={handleClick}
                disabled={loading}
                className="button btn-green"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center font-montserrat">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-300 hover:underline"
              onClick={(e) => {
                if (loading) {
                  e.preventDefault()
                }
              }}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Signup
