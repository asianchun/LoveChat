import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import axios from "axios"
import Snackbar from "../components/Snackbar"
import InputBox from "../components/InputBox"

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
      <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
        <h2 className="text-3xl font-semibold font-montserrat max-sm:mb-0 mb-5">
          Create the best connections
        </h2>
        <div className="p-10 sm:border rounded-xl w-[400px] sm:shadow-xl mx-5">
          {error && (
            <Snackbar
              type="error"
              action={() => setError("")}
              text="Email already exists"
            />
          )}
          <form>
            <InputBox
              style="mb-4"
              label="First Name"
              type="text"
              placeholder="John"
              disabled={loading}
              change={(e) =>
                setFirstName(e.target.value.replace(/[^a-zA-Z\s]+/g, ""))
              }
              value={firstName}
            />
            <InputBox
              style="mb-4"
              label="Last Name"
              type="text"
              placeholder="Smith"
              disabled={loading}
              change={(e) =>
                setLastName(e.target.value.replace(/[^a-zA-Z\s]+/g, ""))
              }
              value={lastName}
            />
            <InputBox
              style="mb-4"
              label="Phone Number"
              type="text"
              maxLength="10"
              placeholder="0423353253"
              disabled={loading}
              change={(e) => {
                setPhone(e.target.value.replace(/[^0-9]/g, ""))
              }}
              value={phoneNumber}
            />
            <InputBox
              style="mb-4"
              label="Email"
              type="email"
              placeholder="example@email.com"
              disabled={loading}
              change={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="relative">
              <InputBox
                style="mb-9"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                disabled={loading}
                change={(e) => setPassword(e.target.value)}
                value={password}
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
