import React from "react"
import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"

//Pass a destination to the class, / is the default
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="text-green-300 transform scale-100 hover:scale-150 transition-transform ease-in-out duration-200"
      >
        <BsArrowLeft />
      </Link>
    </div>
  )
}

export default BackButton
