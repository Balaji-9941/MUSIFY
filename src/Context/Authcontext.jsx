import React, { Children, createContext, useState } from "react";
import { _Auth } from "../Backend/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
export let MyGarage = createContext();
const Authcontext = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  let [authUser, setAuthUser] = useState(null);
  onAuthStateChanged(_Auth, (userinfo) => {
    if (userinfo.emailVerified === true) {
      setAuthUser(userinfo);
    } else {
      setAuthUser(null);
    }
  });
  async function logout() {
    await signOut(_Auth);
    setAuthUser(null);
    toast.success("Log out successfull");
    console.log("logout");
    window.location.assign("/");
  }
  return (
    <MyGarage.Provider
      value={{
        authUser,
        logout,
        songs,
        setSongs,
        isPlaying,
        setIsPlaying,
        currentSongIndex,
        setCurrentSongIndex,
      }}
    >
      {children}
    </MyGarage.Provider>
  );
};
export default Authcontext;
