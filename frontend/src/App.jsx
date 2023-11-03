import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import PrivateRoute from "./pages/PrivateRoute"
import { AuthProvider } from "./firebase/AuthContext"
import TopBar from "./components/TopBar"
import Footer from "./components/Footer"

const App = () => {
  return (
    <AuthProvider>
      <TopBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App
