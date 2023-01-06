import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NavItem = ({ name, path = "" } = {}) => (
  <NavLink 
    className={({ isActive }) => isActive ? "pl-24 py-4 text-teal-500 font-semibold" : "pl-24 py-4"}
    to={`/me${path}`}
    exact
  >
    {name}
  </NavLink>
)

const Profile = () => {
  return (
    <div className="flex bg-teal-50" style={{ height: "calc(100vh - 84px) "}}>
      <div className="flex flex-col w-96 mt-12">
        <NavItem path="/info" name="Profile" />
        <NavItem path="/password" name="Password" />
        <NavItem path="/history" name="History" />
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}

export default Profile;