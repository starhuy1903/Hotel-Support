import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="relative mx-auto">
      {/* navbar */}
      <nav className="flex justify-between bg-teal-600 text-white w-screen">
        <div className="px-5 xl:px-12 py-5 flex w-full items-center">
          <Link className="text-3xl font-bold font-heading" to="/">
            <img
              class="h-9"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTzfG0hXnuSd2LB8q0fZ2dcJvfJ21DAbOIDkf_QO3xyT3NiQR578H8SraTnjmS7-HqxI&usqp=CAU"
              alt="logo"
            />
          </Link>
          {/* Nav Links */}
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <Link className="hover:text-gray-200" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="/">
                Stays
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="/">
                Fights
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="/">
                Car rentals
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="/">
                Airport taxis
              </Link>
            </li>
          </ul>
          {/* Header Icons */}
          <div className="hidden xl:flex items-center space-x-5">
            {/* Sign In / Register      */}
            <Link className="flex items-center hover:text-gray-200" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
        {/* Responsive navbar */}
        <Link className="navbar-burger self-center mr-12 xl:hidden" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Link>
      </nav>
    </section>
  );
};

export default Navbar;
