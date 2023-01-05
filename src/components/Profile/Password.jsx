import React, { useCallback } from "react";
import { toastError } from "../../features/message";
import { useUpdateProfileMutation } from "../../features/auth/authApiSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const Password = () => {
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = useCallback(
    async ({ oldPassword, newPassword }) => {
      try {
        const data = await updateProfile({ oldPassword, newPassword }).unwrap();
        console.log(data);
        toast.success(data.message);
      } catch (err) {
        toastError(err);
      }
    },
    [updateProfile]
  );
  const schema = yup.object().shape({
    oldPassword: yup.string().required("This field is required"),
    newPassword: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      if (
        formik.touched.newPassword &&
        values.oldPassword &&
        values.oldPassword === values.newPassword
      ) {
        errors.newPassword = "New password must be different from old password";
      }
      return errors;
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  return (
    <div>
      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="oldPassword"
                className="text-sm text-gray-600 dark:text-gray-200"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Old password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <div className="text-red-700">{formik.errors.oldPassword}</div>
            )}
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm text-gray-600 dark:text-gray-200"
              >
                New password
              </label>
            </div>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-700">{formik.errors.newPassword}</div>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-400 focus:outline-none focus:bg-teal-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
