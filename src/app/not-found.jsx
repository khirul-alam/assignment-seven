import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-amber-50">
      <h1 className="text-9xl font-extrabold text-green-800 opacity-">404</h1>
      <div className="">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Oops! Page Not Found</h2>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-full hover:bg-green-900 transition"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}