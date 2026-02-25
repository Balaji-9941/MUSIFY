import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { _Auth } from "../Backend/Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const Register = () => {
  let navigator = useNavigate();
  let [eye1, setEye1] = useState(false);
  let [eye2, setEye2] = useState(false);
  let [data, setData] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    userconfirmpassword: "",
  });
  let { username, useremail, userpassword, userconfirmpassword } = data;
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (userpassword === userconfirmpassword) {
        let userData = await createUserWithEmailAndPassword(
          _Auth,
          useremail,
          userpassword
        );
        await sendEmailVerification(userData.user);
        toast.success("Verification mail sent to  " + useremail);
        updateProfile(userData.user, {
          displayName: username,
          photoURL: "https://cdn-icons-png.freepik.com/512/5580/5580909.png",
        });
        navigator("/login");
      } else {
        toast.error("Password not matched");
      }
    } catch (error) {
      toast.error("Error: " + error.code);
    }
  }
  return (
    <>
      <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col items-center ">
        <header>
          <h1 className="mt-8 text-3xl text-purple-300 font-bold tracking-wider">
            Register
          </h1>
        </header>
        <main>
          <form
            className="w-[400px] bg-slate-900 border-b-2 mt-4 p-5"
            onSubmit={handleSubmit}
          >
            <div className="py-2">
              <label
                htmlFor="username"
                className="text-white font-bold tracking-widest"
              >
                Username:
              </label>
              <input
                id="username"
                type="text"
                className="focus:outline-0 placeholder-gray-400 w-full border-1 border-white rounded-md text-white p-2 "
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="py-2">
              <label
                htmlFor="mailid"
                className="text-white font-bold tracking-widest"
              >
                E-Mail
              </label>
              <input
                id="mailid"
                type="email"
                className="focus:outline-0 placeholder-white w-full border-1 border-white rounded-md text-white p-2"
                placeholder="Enter your mail id"
                name="useremail"
                value={useremail}
                onChange={handleChange}
              />
            </div>
            <div className="py-2 relative">
              <label
                htmlFor="password"
                className="text-white font-bold tracking-widest"
              >
                Password:
              </label>
              <input
                id="password"
                type={eye1 ? "text" : "password"}
                className="focus:outline-0 placeholder-white w-full border-1 border-white rounded-md text-white p-2"
                placeholder="Enter your password"
                name="userpassword"
                value={userpassword}
                onChange={handleChange}
              />
              <span
                onClick={() => setEye1(!eye1)}
                className="absolute top-11 right-2"
              >
                {eye1 ? (
                  <IoMdEye className="text-white" />
                ) : (
                  <IoMdEyeOff className="text-white" />
                )}
              </span>
            </div>
            <div className="py-2 relative">
              <label
                htmlFor="cpassword"
                className="text-white font-bold tracking-widest"
              >
                Confirm Password:
              </label>
              <input
                id="cpassword"
                type={eye2 ? "text" : "password"}
                className="focus:outline-0 placeholder-white w-full border-1 border-white rounded-md text-white p-2"
                placeholder="Re-Enter your password"
                name="userconfirmpassword"
                value={userconfirmpassword}
                onChange={handleChange}
              />
              <span
                onClick={() => setEye2(!eye2)}
                className="absolute top-11 right-2"
              >
                {eye2 ? (
                  <IoMdEye className="text-white" />
                ) : (
                  <IoMdEyeOff className="text-white" />
                )}
              </span>
            </div>
            <div className="text-white flex justify-between gap-3 my-2">
              <h1>Already have an account</h1>
              <NavLink to="/login" className="hover:text-blue-400 underline">
                Login
              </NavLink>
            </div>
            <div>
              <button className="w-full bg-purple-600 p-2 mt-2 text-white">
                Register
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default Register;
