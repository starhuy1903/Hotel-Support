import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetProfileQuery } from "../features/auth/authApiSlice";
import { selectCurrentToken, setToken, setUser } from "../features/auth/authSlice";
import { toastError } from "../features/message";

const Layout = () => {
  // Fetch user credentials & info
  const dispatch = useDispatch();
  const [getProfile] = useLazyGetProfileQuery();
  const token = useSelector(selectCurrentToken);

  const destroyUserData = useCallback(() => {
    dispatch(setToken({ token: null }));
    dispatch(setUser({ user: null }));
  }, [dispatch]);

  const fetchProfileData = useCallback(
    async () => {
      try {
        const data = await getProfile().unwrap();
        console.log(data)
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

  useEffect(() => {
    if (token) {
      fetchProfileData();
    }
  }, [fetchProfileData, token]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
