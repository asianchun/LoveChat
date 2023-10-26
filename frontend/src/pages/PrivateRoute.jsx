import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../firebase/AuthContext"

const PrivateRoute = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
