import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { _Auth, _DB } from "../Backend/Firebase";
import toast from "react-hot-toast";
import { MyGarage } from "../Context/Authcontext";
import { doc, onSnapshot } from "firebase/firestore";

const Menu = () => {
  let { authUser, logout } = useContext(MyGarage);
  let [profile, setProfile] = useState();
  function fetchdata() {
    useEffect(() => {
      if (authUser?.uid) {
        let user_profile_collection = doc(_DB, "user_profile", authUser?.uid);
        onSnapshot(user_profile_collection, (userinfo) => {
          console.log(userinfo.data());
          if (userinfo.exists()) {
            setProfile(userinfo.data());
          } else {
            console.log(null);
          }
        });
      } else {
        console.log("Not fetched");
      }
    }, [authUser?.uid]);
  }
  fetchdata();
  function AuthenticateUser() {
    return (
      <>
        <li className="flex gap-0.5 items-center">
          <NavLink to="/profile" className="flex gap-0.5 items-center">
            <img
              src={authUser.photoURL}
              alt=""
              className="rounded-full w-[30px] h-[25px]"
            />
            <h1 className="tracking-wider">{authUser.displayName}</h1>
          </NavLink>
        </li>
        {profile?.role == "admin" && (
          <NavLink to="/admin/createalbumn" className="flex gap-0.5 items-center">
            <h1 className="tracking-wider">Admin</h1>
          </NavLink>
        )}
        <li>
          <button
            className="px-3 py-2 hover:bg-blue-500 rounded-md"
            onClick={logout}
          >
            log out
          </button>
        </li>
      </>
    );
  }
  function AnonymousUser() {
    return (
      <>
        <li className="flex items-center">
          <NavLink
            to="/login"
            className="px-3 py-2 hover:bg-blue-500 rounded-md"
          >
            Login
          </NavLink>
        </li>

        <li className="flex items-center">
          <NavLink
            to="/register"
            className="px-3 py-2 hover:bg-blue-500 rounded-md"
          >
            Register
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <>
      <ul className="flex text-white gap-5 text-[18px]">
        <li className="flex items-center">
          <NavLink to="/" className="px-3 py-2 hover:bg-blue-500 rounded-md">
            Home
          </NavLink>
        </li>

        {authUser ? <AuthenticateUser /> : <AnonymousUser />}
      </ul>
    </>
  );
};

export default Menu;
