import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import axios from "axios"

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
            <div
              className="bg-red-200 border border-red-400 text-slate-600 font-montserrat font-semibold text-center mb-2 rounded-md py-3 hover:cursor-pointer"
              onClick={() => setError("")}
            >
              Email already exists
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
            <div className="flex flex-col mb-2">
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
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={loading}
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-black border shadow-sm rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              />
            </div>
            <div className="flex flex-col mb-9 relative">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                disabled={loading}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-black border shadow-sm rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
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
                className="border rounded-3xl py-2 w-full text-[#04364A] bg-green-300 font-montserrat hover:bg-green-400"
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
