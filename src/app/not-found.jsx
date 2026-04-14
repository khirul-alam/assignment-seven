import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-green-800 opacity-20">404</h1>
      <div className="absolute">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
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