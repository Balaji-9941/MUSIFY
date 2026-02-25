import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { _Auth } from "../Backend/Firebase";
import toast from "react-hot-toast";

export const Resetpassword = () => {
  let [email, setEmail] = useState("");
  function handleChange(e) {
    setEmail((email = e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    try {
      sendPasswordResetEmail(_Auth, email);
      toast.success(`Reset email sent to ${email}`);
    } catch (error) {
      console.log(error);
      toast.error(error.code);
    }
  }
  return (
    <>
      <section className="w-full h-[calc(100vh-70px)] bg-slate-800 flex flex-col items-center ">
        <header>
          <h1 className="mt-8 text-3xl text-purple-300 font-bold tracking-wider">
            Reset password
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
                value={email}
                onChange={handleChange}
              />
            </div>

            <div>
              <button className="w-full bg-purple-600 p-2 mt-2 text-white">
                Reset password
              </button>
            </div>
            <div className="text-white flex justify-center gap-2 my-2">
              <NavLink to="/login" className="hover:text-blue-400 underline">
                Back to login
              </NavLink>
            </div>
          </form>
        </main>
      </section>
    </>
  );
};
