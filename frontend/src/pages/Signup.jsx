import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <section>
      <label htmlFor="email"></label>
      <input type="text" name="email" />

      <label htmlFor="password"></label>
      <input type="password" name="password" />
    </section>
  )
}

export default Signup
