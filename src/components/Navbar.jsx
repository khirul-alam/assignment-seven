"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, PieChart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const pathname = usePathname();

  // ✅ রাউটিং নিশ্চিত করতে href গুলো ছোট হাতের অক্ষরে রাখা হয়েছে
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Timeline", href: "/timeline", icon: <History size={18} /> },
    { name: "Stats", href: "/stats", icon: <PieChart size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-800 tracking-tight">
              KeenKeeper
            </span>
          </div>

          {/* ডেস্কটপ মেনু */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 text-xl font-bold transition-all duration-200 ${
                    isActive
                      ? "text-green-700 border-b-2 border-green-700"
                      : "text-gray-500 hover:text-green-600"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* মোবাইল মেনু বাটন */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        } bg-white border-t border-gray-100`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;