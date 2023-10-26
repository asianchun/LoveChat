import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../firebase/firebase"

const PrivateRoute = () => {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
