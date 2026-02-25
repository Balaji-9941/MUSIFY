import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminContent from "./AdminContent";

const AdminContainer = () => {
  return (
    <>
      <section className="flex">
        <AdminSideBar />
        <AdminContent />
      </section>
    </>
  );
};

export default AdminContainer;
