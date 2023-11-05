import { footerLogo } from "../assets"
import { AiOutlineCopyrightCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full">
      <ul className="font-palanquin grid grid-cols-6 gap-2 auto-rows-fr text-center mb-3 max-lg:mb-1 max-sm:grid-cols-2 max-lg:grid-cols-3 justify-center items-center">
        <li className="px-6">
          <div className="flex gap-7 items-center justify-center">
            <img src={footerLogo} alt="logo" width={30} height={30} />
            <span className="flex justify-center items-center relative right-6">
              <AiOutlineCopyrightCircle /> 2023
            </span>
          </div>
        </li>
        <li className="footer-link">
          <a href="#">About</a>
        </li>
        <li className="footer-link">
          <a href="#">Accessibility</a>
        </li>
        <li className="footer-link">
          <a href="#">Privacy Policy</a>
        </li>
        <li className="footer-link">
          <a href="#">Copyright Policy</a>
        </li>
        <li className="footer-link">
          <a href="#">Community Guidelines</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
