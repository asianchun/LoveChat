import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { useNavigate } from "react-router-dom"
import Snackbar from "../components/Snackbar"
import InputBox from "../components/InputBox"
import TopBar from "../components/TopBar"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  //Toggle show password
  const toggleShow = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  //Login the user
  const handleClick = async (event) => {
    if (email !== "" && password !== "") {
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
  }

  return (
    <div className="main-container">
      <div className="p-10 sm:border rounded-xl w-[400px] sm:shadow-xl mx-5">
        <h2 className="text-3xl font-semibold font-montserrat">Sign In</h2>
        <p className="mb-7 font-montserrat">Continue your connection journey</p>
        {error && (
          <Snackbar
            type="error"
            action={() => setError("")}
            text="Invalid email or password"
          />
        )}
        <form>
          <InputBox
            style="mb-4"
            type="email"
            placeholder="Email"
            disabled={loading}
            change={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="relative">
            <InputBox
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              disabled={loading}
              change={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="absolute right-2 top-[6px] slate text-green-400 font-palanquin disabled:text-slate-500"
              onClick={toggleShow}
              disabled={loading}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          <div className="mt-9 text-center mb-4">
            <button
              onClick={handleClick}
              disabled={loading}
              className="button btn-green"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => navigate("/signup")}
            disabled={loading}
            className="button btn-white mb-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
