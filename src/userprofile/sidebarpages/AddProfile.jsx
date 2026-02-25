import React, { useContext, useState } from "react";
import { MyGarage } from "../../Context/Authcontext";
import { doc, setDoc } from "firebase/firestore";
import { _DB } from "../../Backend/Firebase";

const Addprofile = () => {
  const { authUser } = useContext(MyGarage) || {};

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    age: "",
    address: "",
    language: "",
    state: "",
    phoneno: "",
    role: "user",
  });

  const {
    firstname,
    lastname,
    dob,
    gender,
    age,
    address,
    language,
    state,
    phoneno,
    role,
  } = data;

  // SAFE user values
  const uid = authUser?.uid;
  const email = authUser?.email;
  const photoURL = authUser?.photoURL;
  const displayName = authUser?.displayName;

  const obj = {
    firstname,
    lastname,
    dob,
    gender,
    age,
    address,
    language,
    state,
    phoneno,
    role,
  };

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handlesubmit(e) {
    e.preventDefault();

    // 🔴 Prevent Firestore crash if user not logged in
    if (!uid) {
      console.error("User not authenticated");
      alert("User not logged in. Please login first.");
      return;
    }

    try {
      const user_profile_collection = doc(_DB, "user_profile", uid);

      await setDoc(user_profile_collection, {
        uid,
        email,
        photoURL,
        displayName,
        ...obj,
      });

      alert("Profile saved successfully ✅");
      console.log("Profile added to Firestore");
    } catch (error) {
      console.error("Firestore Write Error:", error.message);
      alert("Error saving profile: " + error.message);
    }
  }

  return (
    <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col items-center">
      <header>
        <h1 className="mt-2 text-3xl text-purple-300 font-bold tracking-wider">
          Add Profile
        </h1>
      </header>

      <main>
        <form
          className="w-[600px] bg-slate-900 border-b-2 mt-4 p-5 rounded-3xl"
          onSubmit={handlesubmit}
        >
          {/* First & Last Name */}
          <div className="py-1 flex justify-between gap-4">
            <div className="bg-slate-800 rounded px-2 py-2">
              <label className="text-white font-bold tracking-widest">
                Firstname:
              </label>
              <input
                type="text"
                className="focus:outline-0 w-full border border-white rounded-md text-white p-2"
                placeholder="Enter your firstname"
                name="firstname"
                onChange={handleChange}
                value={firstname}
              />
            </div>

            <div className="bg-slate-800 rounded px-2 py-1">
              <label className="text-white font-bold tracking-widest">
                Lastname:
              </label>
              <input
                type="text"
                className="focus:outline-0 w-full border border-white rounded-md text-white p-2"
                placeholder="Enter your lastname"
                name="lastname"
                onChange={handleChange}
                value={lastname}
              />
            </div>
          </div>

          {/* DOB & Age */}
          <div className="flex items-center justify-center gap-10 py-1">
            <div className="bg-slate-800 rounded px-2 py-1">
              <label className="text-white font-bold tracking-widest">
                DOB:
              </label>
              <input
                type="date"
                className="focus:outline-0 w-full border border-white rounded-md text-white p-2"
                name="dob"
                onChange={handleChange}
                value={dob}
              />
            </div>

            <div className="bg-slate-800 rounded px-2 py-1">
              <label className="text-white font-bold tracking-widest">
                Age:
              </label>
              <input
                type="number"
                className="focus:outline-0 w-full border border-white rounded-md text-white p-2"
                placeholder="Enter your age"
                name="age"
                onChange={handleChange}
                value={age}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="py-2 flex justify-center">
            <div className="bg-slate-800 rounded px-2 py-2">
              <label className="text-white font-bold tracking-widest">
                Gender:
              </label>
              <div className="p-2 flex gap-4 text-white">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    checked={gender === "Male"}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    checked={gender === "Female"}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    onChange={handleChange}
                    checked={gender === "Others"}
                  />{" "}
                  Others
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-slate-800 rounded px-2 py-1">
            <label className="text-white font-bold tracking-widest">
              Address:
            </label>
            <input
              type="text"
              className="focus:outline-0 w-full border border-white rounded-md text-white p-2"
              placeholder="Enter your address"
              name="address"
              onChange={handleChange}
              value={address}
            />
          </div>

          {/* Other Fields */}
          <div className="py-2 flex justify-between gap-2">
            <input
              type="text"
              className="w-full border border-white rounded-md text-white p-2 bg-slate-800"
              placeholder="Language"
              name="language"
              onChange={handleChange}
              value={language}
            />
            <input
              type="text"
              className="w-full border border-white rounded-md text-white p-2 bg-slate-800"
              placeholder="State"
              name="state"
              onChange={handleChange}
              value={state}
            />
            <input
              type="number"
              className="w-full border border-white rounded-md text-white p-2 bg-slate-800"
              placeholder="Phone Number"
              name="phoneno"
              onChange={handleChange}
              value={phoneno}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 p-2 mt-2 text-white rounded-3xl cursor-pointer"
          >
            Submit
          </button>
        </form>
      </main>
    </section>
  );
};

export default Addprofile;
