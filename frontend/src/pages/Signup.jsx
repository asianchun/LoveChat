import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleClick = async (event) => {
    event.preventDefault()

    try {
      setError("")
      setLoading(true)
      await signup(email, password)
      navigate("/")
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <main>
      <section>
        <div>
          <h2>Sign Up Page</h2>
          {error && <div>Sign Up unsuccessful, please try again!</div>}
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
                Sign Up
              </button>
            </div>
          </form>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </section>
      {loading && <Spinner />}
    </main>
  )
}

export default Signup
