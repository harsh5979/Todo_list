import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-slate-400 h-12 flex justify-between sticky top-0  ">
      <div className="flex justify-center">
        <h1 className="logo font-bold text-xl ml-7 mx-5 py-2">TODO-LIST </h1>
        <div className="m-auto">
          <img src="favicon.svg" alt="" className="w-6  " />
        </div>
      </div>
      <ul className="flex text-xl mx-7 py-2 gap-6">
        <li className="">
          <a href="/" className="font-mono">Home</a>
        </li>
        <li className="">
          <a href="#" className="font-mono">about</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
