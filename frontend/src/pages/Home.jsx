import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
      Home Page
      {error && <div>{error}</div>}
      <section className="flex gap-16">
        <Link to="/profile">My Profile</Link>
        <button onClick={handleClick}>Log Out</button>
      </section>
    </main>
  )
}

export default Home
