//Use Contexts in order to be able to access the user + db functions anywhere in the app
//Also, Contexts are useful, because if we need to change the backend, we are only changing things here
import React, { useContext, useEffect, useState } from "react"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth" //Import firebase/auth functionality
import { auth } from "./firebase"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false) //Don't load content until there is a user
    })
  }, [])

  //Include this in order to have the ability to use these variables anywhere in the app
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
