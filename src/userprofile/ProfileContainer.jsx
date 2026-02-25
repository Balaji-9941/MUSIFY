import React from "react";
import ProfileContent from "./ProfileContent";
import ProfileSidebar from "./ProfileSidebar";

const ProfileContainer = () => {
  return (
    <>
      <section className="w-[100vw] h-[calc(100vh-70px)] flex">
        <ProfileSidebar />
        <ProfileContent />
        
      </section>
    </>
  );
};

export default ProfileContainer;
