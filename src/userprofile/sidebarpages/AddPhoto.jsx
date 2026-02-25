import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { ToastBar } from "react-hot-toast";
import { ImGift } from "react-icons/im";
import { updateProfile } from "firebase/auth";
import { MyGarage } from "../../Context/Authcontext";

const AddPhoto = () => {
  let [photo, setPhoto] = useState();
  let [photopreview, setPhotoPreview] = useState();
  let { authUser } = useContext(MyGarage);
  function handleChange(e) {
    let file = e.target.files[0];
    setPhoto(file);
    console.log(file);
    let data = URL.createObjectURL(file);
    setPhotoPreview(data);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(authUser);
    let data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "Music_Musify");
    data.append("cloud_name", "djpxfxwtr");
    let response = await fetch(
      "https://api.cloudinary.com/v1_1/djpxfxwtr/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    let result = await response.json();
    let imageUrl = result.url;
    console.log(imageUrl);
    await updateProfile(authUser, {
      photoURL: imageUrl,
    });
    toast.success("Profile photo Updated");
    window.location.assign("/profile/myaccount");
  }
  return (
    <>
      <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col items-center ">
        <header>
          <h1 className="mt-8 text-3xl text-purple-300 font-bold tracking-wider">
            Add Photo
          </h1>
        </header>
        <main>
          <form
            className="w-[400px] bg-slate-900 border-b-2 mt-4 p-5"
            onSubmit={handleSubmit}
          >
            <div className="py-2 flex flex-col items-center">
              <label
                htmlFor="photo"
                className="text-white font-bold tracking-widest"
              >
                Photo
              </label>
              {photopreview && (
                <img
                  src={photopreview}
                  alt="Preview"
                  className="rounded-full w-[150px] h-[150px] my-2"
                />
              )}
              <input
                id="photo"
                type="file"
                className="file:border file:rounded-md file:px-3 file:py-2 file:bg-slate-500 focus:outline-0 placeholder-white w-full border-1 border-white rounded-md text-white p-2"
                name="photo"
                onChange={handleChange}
              />
            </div>

            <div>
              <button className="w-full bg-purple-600 p-2 mt-2 text-white">
                Add Photo
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default AddPhoto;
