import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

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
    <main>
      <section>
        <div>
          {error && (
            <div>Email or password is incorrect! Please try again!</div>
          )}
          <h2>Login Page</h2>
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleClick} disabled={loading}>
                Login
              </button>
            </div>
          </form>
          <p>
            No account yet? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
      {loading && <Spinner />}
    </main>
  )
}

export default Login
