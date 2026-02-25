import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { RiAccountBoxFill, RiLockPasswordLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <>
      <section className="basis-[18%] bg-slate-600 text-white p-3 font-bold">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/admin/createalbumn"
                className="w-full hover:bg-slate-300 px-3 py-4 flex items-center gap-0.5 rounded"
              >
                <RiAccountBoxFill />
                Create Albumn
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default AdminSideBar;
