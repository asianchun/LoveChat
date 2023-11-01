import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const toggleShow = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  //Login the user
  const handleClick = async (event) => {
    event.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email, password)
      navigate("/")
    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.log(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen">
      <div className="px-7 py-5 border rounded-xl w-[370px] shadow-xl">
        <h2 className="text-left text-3xl font-semibold font-montserrat">
          Sign In
        </h2>
        <p className="mb-7 font-montserrat">Continue your connection journey</p>
        {error && <div>Email or password is incorrect! Please try again!</div>}
        <form>
          <div className="flex flex-col">
            <input
              className="bg-white border-black border rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-2 relative">
            <input
              className="bg-white border border-black rounded-md px-2 py-1.5 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-2 top-[7px] slate text-green-400 font-palanquin"
              onClick={toggleShow}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          <div className="mt-9 text-center mb-4">
            <button
              onClick={handleClick}
              disabled={loading}
              className="border rounded-3xl py-2 w-full text-[#04364A] bg-green-300 hover:bg-green-400 font-montserrat"
            >
              Login
            </button>
          </div>
        </form>
        <button
          onClick={() => navigate("/signup")}
          className="text-center border rounded-3xl py-2 mb-2 w-full border-black text-slate-500 hover:bg-slate-100 hover:cursor-pointer font-montserrat"
        >
          Sign up
        </button>
      </div>
      {loading && <Spinner />}
    </div>
  )
}

export default Login
