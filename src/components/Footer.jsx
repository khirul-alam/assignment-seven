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
    <footer className="bg-[#2b8e6d] border-gray-100 pt-7 pb-8  ">
      <div className="text-center">
        <h2 className="font-bold text-5xl">KeenKeeper</h2>
        <p className="pt-4">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
      </div>
      <div className="text-center">
        <p>Social Links</p>
        <div className="flex justify-center gap-1.5 pt-1.5">
          <FaInstagramSquare
            size={24}
            className="text-pink-600 hover:text-pink-800 transition"
          />

          <FaGithub size={24} />
          <FaTwitter size={24} />
          <FaLinkedin size={24} />
        </div>
      </div>
      <div className="divider container mx-auto"></div>
      <div className="flex justify-between container mx-auto ">
        <div className="">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
        </div>
        <div className="flex justify-between gap-3">
            <ul>Privacy Policy</ul>
            <ul>Terms of Service</ul>
            <ul>Cookies</ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
