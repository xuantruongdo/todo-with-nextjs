"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <a href="#" className="hover:text-gray-600">
            About
          </a>

          <a href="#" className="hover:text-gray-600">
            Services
          </a>
          <a href="#" className="hover:text-gray-600">
            Contact
          </a>
        </nav>

        {session ? (
          <div className="relative inline-block">
            <div
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {session?.user.fullName.toLocaleUpperCase().charAt(0)}
            </div>

            {isHovered && (
              <div
                className="absolute top-11 right-0 mt-1 p-2 bg-white rounded shadow-md w-40"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button className="text-sm block w-full text-left p-3 hover:bg-gray-100 focus:outline-none">
                  My Account
                </button>
                <button
                  className="text-sm block w-full text-left p-3 hover:bg-gray-100 focus:outline-none"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              href={"/auth/signIn"}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
