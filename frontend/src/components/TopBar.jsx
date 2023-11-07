import { useState } from "react"
import { useAuth } from "../firebase/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { logo } from "../assets"
import { RxHamburgerMenu } from "react-icons/rx"
import { AiOutlineClose } from "react-icons/ai"

const TopBar = () => {
  const [navOpen, setNavOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  const closeNav = () => {
    setNavOpen(false)
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
    <header className="w-full fixed py-2 sm:px-16 px-8">
      <nav className="flex justify-between items-center w-full mx-auto font-montserrat">
        <div onClick={() => navigate("/")} className="hover:cursor-pointer">
          <img src={logo} alt="logo" width={100} height={100} />
        </div>
        {currentUser && (
          <>
            <ul
              className={`${
                navOpen ? "top-[90%]" : "top-[-1000%]"
              } duration-500 md:static absolute max-md:shadow-xl bg-white md:min-h-fit min-h-[20vh] left-0 md:w-auto w-full flex px-5 md:flex-row flex-col items-start justify-center md:items-center md:gap-[4vw] gap-3`}
            >
              <li onClick={closeNav}>
                <Link to="/profile" className="hover:text-green-300">
                  My Profile
                </Link>
              </li>
              <li onClick={closeNav}>
                <button className="hover:text-green-300" onClick={logoutUser}>
                  Log Out
                </button>
              </li>
            </ul>
            <div className="flex items-center gap-6 md:hidden">
              <div
                className="hover:cursor-pointer hover:text-green-300"
                onClick={toggleNav}
              >
                {navOpen ? (
                  <AiOutlineClose size={32} />
                ) : (
                  <RxHamburgerMenu size={32} />
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default TopBar
