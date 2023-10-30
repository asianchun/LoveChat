import React from "react"
import { Link } from "react-router-dom"

//Pass a destination to the class, / is the default
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        Back
      </Link>
    </div>
  )
}

export default BackButton
