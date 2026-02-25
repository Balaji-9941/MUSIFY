import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { RiAccountBoxFill, RiLockPasswordLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <>
      <section className="basis-[18%] bg-slate-600 text-white p-3 font-bold">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/profile/myaccount"
                className="w-full hover:bg-slate-300 px-3 py-4 flex items-center gap-0.5 rounded"
              >
                <RiAccountBoxFill />
                My Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/addprofile"
                className="w-full hover:bg-slate-300 px-3 py-4 flex items-center gap-0.5 rounded"
              >
                <FaUserEdit /> Add Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="w-full hover:bg-slate-300 px-3 py-4  flex items-center gap-0.5 rounded">
                <RiLockPasswordLine />
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/addphoto"
                className="w-full hover:bg-slate-300 px-3 py-4 flex items-center gap-0.5 rounded"
              >
                <MdAddAPhoto />
                Upload Photo
              </NavLink>
            </li>
            <li>
              <NavLink className="w-full hover:bg-slate-300 px-3 py-4 flex items-center gap-0.5 rounded">
                <IoSettingsOutline />
                Setting
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default ProfileSidebar;
