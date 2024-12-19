import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-sm mb-2 md:mb-0">© 2024. All Rights Reserved</div>

        <div className="text-sm mb-2 md:mb-0">by Sulthoni Akbar</div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/SulthoniAkbar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-950 text-white p-2 rounded-full hover:bg-green-600 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-sulthoni-akbar/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-950 text-white p-2 rounded-full hover:bg-green-600 transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/muhammadsultoni71/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-950 text-white p-2 rounded-full hover:bg-green-600 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
