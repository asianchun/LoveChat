import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { useNavigate } from "react-router-dom"
import Snackbar from "../components/Snackbar"

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
    <main className="relative">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="px-7 py-5 border rounded-xl w-[370px] shadow-xl">
          <h2 className="text-3xl font-semibold font-montserrat">Sign In</h2>
          <p className="mb-7 font-montserrat">
            Continue your connection journey
          </p>
          {error && (
            <Snackbar
              type="error"
              action={() => setError("")}
              text="Invalid email or password"
            />
          )}
          <form>
            <div className="flex flex-col mb-4">
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col relative">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                disabled={loading}
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
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
                className="button text-[#04364A] bg-green-300 hover:bg-green-400"
              >
                Login
              </button>
            </div>
          </form>
          <button
            onClick={() => navigate("/signup")}
            disabled={loading}
            className="button border-black text-slate-500 hover:bg-slate-200 mb-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </main>
  )
}

export default Login
