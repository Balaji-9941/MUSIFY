import React from "react";
import { NavLink } from "react-router-dom";

const AlbumSideBar = () => {
  return (
    <>
      <section className="basis-[18%] bg-slate-600 text-white p-3 font-bold">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className="w-full hover:bg-slate-300 px-3 py-4 flex items-center gap-0.5 rounded"
              >
                Albumns
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default AlbumSideBar;
