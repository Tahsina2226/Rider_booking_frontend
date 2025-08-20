import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#ECEEDF] shadow-inner mt-10 py-10 text-gray-800">
      <div className="gap-8 grid md:grid-cols-3 mx-auto md:text-left text-center container">
        <div>
          <h2 className="mb-2 font-bold text-gray-900 text-2xl">RideFlow</h2>
          <p className="text-gray-700 text-sm">
            Professional ride management platform delivering safe and reliable
            transportation.
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 text-lg">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-gray-900 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-gray-900 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/features"
                className="hover:text-gray-900 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-900 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 text-lg">
            Connect With Me
          </h3>
          <div className="flex justify-center md:justify-start gap-4 mb-2">
            <a
              href="https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-300 hover:bg-gray-400 p-2 rounded-full transition-colors"
            >
              <FaLinkedinIn className="text-gray-800" />
            </a>
            <a
              href="https://github.com/Tahsina2226"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-300 hover:bg-gray-400 p-2 rounded-full transition-colors"
            >
              <FaGithub className="text-gray-800" />
            </a>
          </div>
          <p className="text-gray-700 text-sm">
            Developed with ❤️ by Tahsina Tanvin
          </p>
        </div>
      </div>

      <div className="mt-8 text-gray-700 text-sm text-center">
        &copy; {new Date().getFullYear()} RideNow. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
