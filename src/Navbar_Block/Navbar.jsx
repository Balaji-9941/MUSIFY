import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between px-10 bg-slate-950 h-[70px] items-center sticky top-0">
        <Logo />
        <Menu />
      </nav>
    </>
  );
};

export default Navbar;
