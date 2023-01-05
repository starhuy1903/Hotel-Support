import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut, selectCurrentToken, setToken } from "../features/auth/authSlice";
import { toastError } from "../features/message";

const Navbar = () => {
  const user = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const dropdownEventHandler = () => {
      setShowDropdown(false);
    };
    window.addEventListener("click", dropdownEventHandler);
    return () => {
      window.removeEventListener("click", dropdownEventHandler);
    };
  }, []);

  const logoutHandle = async (e) => {
    e.stopPropagation()
    try {
      await logout();
      dispatch(logOut());
      dispatch(setToken({ token: null }));
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <section className="relative mx-auto">
      {/* navbar */}
      <nav className="flex justify-between bg-teal-600 text-white">
        <div className="px-4 md:px-8 xl:px-12 py-5 flex w-full items-center">
          <Link className="text-3xl font-bold font-heading" to="/">
            <img
              className="h-9"
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
          <div className="relative xl:flex items-center space-x-5">
            {/* Sign In / Register      */}
            {user && (
              <>
                <button
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:text-gray-200 cursor-pointer"
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
                </button>

                {showDropdown && (
                  <div
                    id="dropdown"
                    className="absolute right-0 top-full z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefault"
                    >
                      <li className="cursor-pointer">
                        <Link
                          to="/me"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="cursor-pointer">
                        <span
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={logoutHandle}
                        >
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
