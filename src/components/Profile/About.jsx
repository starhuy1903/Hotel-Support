import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastError } from '../../features/message';
import { useLazyGetProfileQuery, useUpdateProfileMutation } from '../../features/auth/authApiSlice';
import { setToken, setUser } from '../../features/auth/authSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useFormik } from 'formik';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Info = () => {
  const dispatch = useDispatch();
  const [getProfile] = useLazyGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const profile = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      destroyUserData();
      navigate('/');
    }
  })

  const destroyUserData = useCallback(() => {
    dispatch(setToken({ token: null }));
    dispatch(setUser({ user: null }));
  }, [dispatch]);

  const fetchProfileData = useCallback(
    async () => {
      try {
        const data = await getProfile().unwrap();
        if (!data) {
          destroyUserData();
        } else {
          dispatch(setUser({ user: data }));
        }
      }
      catch (err) {
        if (err?.message === "jwt expired") {
          destroyUserData();
        }
        toastError(err);
      }
    },
    [destroyUserData, dispatch, getProfile],
  )

  const handleSubmit = useCallback(async (userProfile) => {
    try {
      // Remove password field
      if (typeof userProfile?.password === "string" && userProfile?.password === "") {
        delete userProfile.password;
      };
      const data = await updateProfile(userProfile).unwrap();
      toast.success(data.message);
      await fetchProfileData();
    } catch (err) {
      toastError(err);
    }
  }, [fetchProfileData, updateProfile]);

  const schema = yup.object().shape({
    "first_name": yup.string().required("This field is required"),
    "last_name": yup.string().required("This field is required"),
    "phoneNumber": yup.number().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      "first_name": profile?.first_name || "123",
      "last_name": profile?.last_name,
      "phoneNumber": profile?.phoneNumber,
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  if (!profile) {
    return (
      <div>
        No data
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl justify-center items-center font-bold flex w-full h-36 text-teal-500">
        {profile['first_name']}
        {" "}
        {profile['last_name']}
      </h1>
      <div>
        <form onSubmit={formik.handleSubmit} className="mt-8 px-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              First name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-red-700">{formik.errors.first_name}</div>)
            }
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="last_name"
                className="text-sm text-gray-600 dark:text-gray-200"
              >
                Last name
              </label>
            </div>
            <input
              type="text" 
              name="last_name"
              id="last_name"
              placeholder="Last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-red-700">{formik.errors.last_name}</div>)
            }
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="phoneNumber"
                className="text-sm text-gray-600 dark:text-gray-200"
              >
                Phone number
              </label>
            </div>
            <input
              type="text" inputMode='numeric'
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-700">{formik.errors.phoneNumber}</div>)
            }
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-400 focus:outline-none focus:bg-teal-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Info;