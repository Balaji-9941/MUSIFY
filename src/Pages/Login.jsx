import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { _Auth } from "../Backend/Firebase";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  let navigator = useNavigate();
  let [eye, setEye] = useState(false);
  let [data, setData] = useState({
    useremail: "",
    userpassword: "",
  });
  let { useremail, userpassword } = data;
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let userdata = await signInWithEmailAndPassword(
        _Auth,
        useremail,
        userpassword
      );
      if (userdata.user.emailVerified) {
        window.location.assign("/");
        toast.success("Login Successfull");
      } else {
        toast.error("E-mail is not verified");
      }
    } catch (error) {
      toast.error(error.code);
    }
  }
  return (
    <>
      <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col items-center ">
        <header>
          <h1 className="mt-8 text-3xl text-purple-300 font-bold tracking-wider">
            Login
          </h1>
        </header>
        <main>
          <form
            className="w-[400px] bg-slate-900 border-b-2 mt-4 p-5"
            onSubmit={handleSubmit}
          >
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
                type={eye ? "text" : "password"}
                className="focus:outline-0 placeholder-white w-full border-1 border-white rounded-md text-white p-2"
                placeholder="Enter your password"
                name="userpassword"
                value={userpassword}
                onChange={handleChange}
              />
              <span
                onClick={() => setEye(!eye)}
                className="absolute top-11 right-2"
              >
                {eye ? (
                  <IoMdEye className="text-white" />
                ) : (
                  <IoMdEyeOff className="text-white" />
                )}
              </span>
            </div>
            <div className="text-white flex justify-between gap-3 my-2">
              <h1>Forgot Password?</h1>
              <NavLink
                to="/resetpassword"
                className="hover:text-blue-400 underline"
              >
                Reset password
              </NavLink>
            </div>
            <div>
              <button className="w-full bg-purple-600 p-2 mt-2 text-white">
                Login
              </button>
            </div>
            <div className="text-white flex justify-center gap-2 my-2">
              <h1>New to MusiFY</h1>
              <NavLink to="/register" className="text-blue-400 underline">
                Register Now
              </NavLink>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};

export default Login;
