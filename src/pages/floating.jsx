import React from "react";
import { Link, useLocation } from "react-router-dom";
import gif from "../../public/img/event.gif";

const Floating = () => {
  const { pathname } = useLocation();

  if (pathname === "/interest" || pathname.startsWith("/business-profile/")) {
    return null;
  }

  return (
    <div className="fixed bottom-10 left-8 z-[99]">
      <Link to="/interest">
        <img
          src={gif}
          alt="Floating gif"
          className="w-[100px] transition-transform duration-300 ease-in-out hover:scale-110 md:w-[150px]"
        />
      </Link>
    </div>
  );
};

export default Floating;
