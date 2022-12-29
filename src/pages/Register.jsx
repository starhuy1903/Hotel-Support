import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import classNames from "classnames";
import { setToken, setUser } from "../features/auth/authSlice";
import {
  useRegisterMutation,
  useLoginMutation,
  useLazyGetProfileQuery,
} from "../features/auth/authApiSlice";

import { toastError } from "../features/message";

const schema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
  phoneNumber: yup.string().required("This field is required"),
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
});

const Register = () => {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const { refetch: fetchUser } = useLazyGetProfileQuery();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (user) => {
    try {
      setIsLoading(true);
      await register(user).unwrap();
      const { accessToken } = await login(
        user.username,
        user.password
      ).unwrap();
      dispatch(setToken({ token: accessToken }));
      const data = await fetchUser();
      dispatch(setUser({ user: data }));
      navigate("/login");
    } catch (err) {
      toastError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      // address: "",
    },
    onSubmit: (user) => {
      handleSubmit(user);
    },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <div className="bg-white dark:bg-gray-900 pb-6">
      <div className="flex items-center w-full max-w-lg lg:max-w-xl px-10 md:px-6 mx-auto md:w-5/6 pt-10">
        <div className="flex-1">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
              Hotel Reservation
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-300">
              Sign up to access your account
            </p>
          </div>
          <div className="mt-8">
            <form onSubmit={formik.handleSubmit} className="md:flex flex-wrap">
              <div className="md:w-1/2">
                <label
                  htmlFor="username"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                {formik.touched.username && formik.errors.username && (
                  <span className="text-red-700 text-sm">
                    {formik.errors.username}
                  </span>
                )}
              </div>
              <div className="mt-6 md:mt-0 md:w-1/2 md:pl-2">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  autoComplete=""
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-700 text-sm">
                    {formik.errors.password}
                  </span>
                )}
              </div>
              <div className="mt-6 md:w-1/2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-700 text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div className="mt-6 md:w-1/2 md:pl-2">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <span className="text-red-700 text-sm">
                    {formik.errors.phoneNumber}
                  </span>
                )}
              </div>
              <div className="mt-6 md:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />

                {formik.touched.firstName && formik.errors.firstName && (
                  <span className="text-red-700 text-sm">
                    {formik.errors.firstName}
                  </span>
                )}
              </div>
              <div className="mt-6 md:w-1/2 md:pl-2">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <span className="text-red-700 text-sm">
                    {formik.errors.lastName}
                  </span>
                )}
              </div>
              {/* <div className="mt-6 md:w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Address
                </label>
                <input
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div> */}
              <div className="mt-6 w-full">
                <button
                  disabled={!formik.isValid || isLoading}
                  type="submit"
                  className={classNames(
                    "w-full px-4 py-2 tracking-wide flex items-center justify-center",
                    formik.isValid
                      ? " text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-400 focus:outline-none focus:bg-teal-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      : " text-black transition-colors duration-200 transform bg-gray-500  "
                  )}
                >
                  {!isLoading ? "Sign up" : <BeatLoader color="#000" />}
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-center text-gray-400">
              Login with existing account{" "}
              <Link
                to="/login"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Sign in
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
