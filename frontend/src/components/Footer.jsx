import { footerLogo } from "../assets"
import { AiOutlineCopyrightCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full">
      <div className="flex items-center justify-center">
        <img src={footerLogo} alt="logo" width={100} height={100} />
        <span className="flex justify-center items-center relative right-6">
          <AiOutlineCopyrightCircle /> 2023
        </span>
      </div>
      <ul className="font-palanquin grid grid-cols-6 gap-2 mb-6 max-sm:mb-2 text-center max-sm:grid-cols-2 max-lg:grid-cols-3">
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
          <a href="#">Cookie Policy</a>
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
