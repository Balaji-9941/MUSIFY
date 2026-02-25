import React from "react";
import { Outlet } from "react-router-dom";

const ProfileContent = () => {
  return (
    <>
      <section className="basis-[82%] bg-slate-800">
        <Outlet />
      </section>
    </>
  );
};

export default ProfileContent;
