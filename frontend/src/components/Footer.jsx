import { footerLogo } from "../assets"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 sm:px-16 px-8 py w-full">
      <ul className="flex justify-between items-center font-palanquin">
        <li>
          <a href="#">
            <img src={footerLogo} alt="logo" width={100} height={100} />
          </a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Cookie Policy</a>
        </li>
        <li>
          <a href="#">Copyright Policy</a>
        </li>
        <li>
          <a href="#">Community Guidelines</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
