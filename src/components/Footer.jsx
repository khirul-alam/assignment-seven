import Link from "next/link";
import { Github, Twitter, Linkedin, Users } from "lucide-react";
import {
  FaInstagramSquare,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b8e6d] border-gray-100 pt-16 pb-8">
      <div className="">
        <h2>KeenKeeper</h2>
        <p>
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
      </div>
      <div className="">
        <p>Social Links</p>
        <div className="">
          <FaInstagramSquare
            size={24}
            className="text-pink-600 hover:text-pink-800 transition"
          />

          <FaGithub size={24} />
          <FaTwitter size={24} />
          <FaLinkedin size={24} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
