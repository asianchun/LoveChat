import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../firebase/AuthContext"

const Home = () => {
  const [error, setError] = useState()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleClick = async (event) => {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch (error) {
      setError(error)
    }
  }
  return (
    <main>
      Home
      {error && <div>{error}</div>}
      <section>
        <button onClick={handleClick}>Log Out</button>
      </section>
    </main>
  )
}

export default Home
