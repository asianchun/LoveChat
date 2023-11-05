import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { logo } from "../assets"
import { RxHamburgerMenu } from "react-icons/rx"

const TopBar = () => {
  const [navOpen, setNavOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  //Logout the user
  const logoutUser = async (event) => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="sm:px-16 px-8 py-2 w-full absolute z-10">
      <nav className="flex items-center justify-between font-montserrat">
        <div
          className="flex justify-center items-center hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" width={100} height={100} />
        </div>
        {currentUser ? (
          <>
            <div className="flex gap-10 items-center justify-center max-lg:hidden">
              <Link to="/profile" className="hover:text-green-300">
                My Profile
              </Link>
              <button onClick={logoutUser} className="hover:text-green-300">
                Log Out
              </button>
            </div>
            <div
              className="hidden max-lg:block hover:cursor-pointer hover:text-green-300"
              onClick={toggleNav}
            >
              <RxHamburgerMenu size={32} />
            </div>
          </>
        ) : null}
      </nav>
    </header>
  )
}

export default TopBar
