import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import axios from "axios"
import Spinner from "../components/Spinner"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleClick = async (event) => {
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

  return (
    <main>
      <section>
        <div>
          {error && <div>Sign Up unsuccessful, please try again!</div>}
          <h2>Sign Up Page</h2>
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                required
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                required
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                maxLength="10"
                required
                placeholder="0423353253"
                value={phoneNumber}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                }}
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
                value={password}
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
