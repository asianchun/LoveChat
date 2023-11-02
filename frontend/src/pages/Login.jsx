import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { useNavigate } from "react-router-dom"

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
            <div
              className="bg-red-200 border border-red-400 text-slate-600 font-semibold text-center mb-2 rounded-md py-3 hover:cursor-pointer"
              onClick={() => setError(false)}
            >
              Invalid email or password
            </div>
          )}
          <form>
            <div className="flex flex-col">
              <input
                className="bg-white border-black border shadow-sm rounded-md px-2 py-1.5 mb-2 font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-2 relative">
              <input
                className="bg-white border border-black rounded-md px-2 py-1.5 shadow-sm font-palanquin focus:outline-none focus:border-green-300 focus:ring-1 focus:ring-green-300
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
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
                className="border rounded-3xl py-2 w-full text-[#04364A] bg-green-300 font-montserrat hover:bg-green-400"
              >
                Login
              </button>
            </div>
          </form>
          <button
            onClick={() => navigate("/signup")}
            disabled={loading}
            className="text-center border rounded-3xl py-2 mb-2 w-full border-black text-slate-500 font-montserrat hover:bg-slate-200"
          >
            Sign up
          </button>
        </div>
      </div>
    </main>
  )
}

export default Login
