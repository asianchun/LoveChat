import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { useNavigate } from "react-router-dom"
import Snackbar from "../components/Snackbar"
import InputBox from "../components/InputBox"

const Login = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  //Reset the password
  const handleClick = async (event) => {
    setLoading(true)
    setError("")

    try {
      await resetPassword(email)
      setLoading(false)
      navigate("/login", { state: { reset: true } })
    } catch (error) {
      console.log(error)
      setError("Invalid Email")
      setLoading(false)
    }
  }

  return (
    <div className="main-container">
      <div className="p-10 sm:border rounded-xl w-[400px] sm:shadow-xl mx-5">
        <h2 className="text-3xl font-semibold font-montserrat">
          Reset Password
        </h2>
        <p className="mb-7 font-montserrat">Enter your email</p>
        {error && (
          <Snackbar
            type="error"
            action={() => setError("")}
            text="Invalid email"
          />
        )}
        <div>
          <InputBox
            style="mb-4"
            type="email"
            placeholder="Email"
            disabled={loading}
            change={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="mt-9 text-center mb-4">
            <button
              onClick={handleClick}
              disabled={loading}
              className="button btn-green"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            disabled={loading}
            className="mb-2 text-pink hover:underline fotn-montserrat"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
