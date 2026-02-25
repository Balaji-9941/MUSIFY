import React, { useContext, useEffect, useState } from "react";
import { MyGarage } from "../../Context/Authcontext";
import { LuUserRoundX } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { _DB } from "../../Backend/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

const MyAccount = () => {
  let { authUser } = useContext(MyGarage) || "";
  let [profile, setProfile] = useState();
  function fetchdata() {
    useEffect(() => {
      if (authUser?.uid) {
        let user_profile_collection = doc(_DB, "user_profile", authUser?.uid);
        onSnapshot(user_profile_collection, (userinfo) => {
          console.log(userinfo.data());
          if (userinfo.exists()) {
            setProfile(userinfo.data());
          } else {
            console.log(null);
          }
        });
      } else {
        console.log("Not fetched");
      }
    }, [authUser?.uid]);
  }
  fetchdata();
  return (
    <>
      <section className="bg-slate-850 text-white h-full w-full flex flex-col items-center">
        <header className="bg-slate-900 h-38 w-[60%] mt-10 relative">
          <div>
            <div className="flex flex-col items-center ">
              <img
                src={authUser?.photoURL}
                alt="profile.img"
                className="rounded-full w-[130px] h-[120px] absolute top-[-35px]"
              />
              <div className="text-white mt-[110px] text-center leading-4">
                <h1>{authUser?.displayName}</h1>
                <h1>{authUser?.email}</h1>
              </div>
            </div>
          </div>
        </header>
        <main className="w-[60%] bg-slate-950">
          {profile ? (
            <>
              <section className="w-full p-5">
                <div className="flex gap-10 mt-5">
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">FullName: </h1>
                    </span>
                    <span className="text-[20px]">
                      <span>{profile?.firstname} </span>
                      <span>{profile?.lastname}</span>
                    </span>
                  </div>
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">DisplayName: </h1>
                    </span>
                    <span className="text-[18px]">
                      <span>{profile?.displayName}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-10 mt-7">
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">Gender: </h1>
                    </span>
                    <span className="text-[20px]">
                      <span>{profile?.gender}</span>
                    </span>
                  </div>
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">DOB: </h1>
                    </span>
                    <span className="text-[18px]">
                      <span>{profile?.dob}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-10 mt-7">
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">Age: </h1>
                    </span>
                    <span className="text-[20px]">
                      <span>{profile?.age}</span>
                    </span>
                  </div>
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">Email: </h1>
                    </span>
                    <span className="text-20px">
                      <span>{profile?.email}</span>
                    </span>
                  </div>
                </div>
                <div className="flex  gap-10 mt-7">
                  <div className="flex border px-3 py-3 rounded-md gap-2 items-center w-[100%]">
                    <span>
                      <h1 className="font-bold text-xl">Address: </h1>
                    </span>
                    <span className="text-[20px] ">
                      <span className="w-4">{profile?.address}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-10 mt-7">
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">Language: </h1>
                    </span>
                    <span className="text-[20px]">
                      <span>{profile?.language}</span>
                    </span>
                  </div>
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">PhoneNo: </h1>
                    </span>
                    <span className="text-20px">
                      <span>{profile?.phoneno}</span>
                    </span>
                  </div>
                  <div className="flex border w-[50%] px-3 py-3 rounded-md gap-2 items-center">
                    <span>
                      <h1 className="font-bold text-xl">State: </h1>
                    </span>
                    <span className="text-20px">
                      <span>{profile?.state}</span>
                    </span>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="flex items-center flex-col p-5">
                <h1 className="text-3xl font-bold">
                  User Information Not Found
                </h1>
                <div className="text-red-600 text-[200px]">
                  <LuUserRoundX />
                </div>
                <NavLink to="/profile/addprofile">
                  <button className="px-4 py-2 bg-green-400 mt-4 rounded-md">
                    Add Data
                  </button>
                </NavLink>
              </div>
            </>
          )}
        </main>
      </section>
    </>
  );
};

export default MyAccount;
