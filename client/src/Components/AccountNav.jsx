import React from "react";
import { FaListUl, FaRegBuilding, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (pathname === "/account") {
    subpage = "profile";
  }
  function linkClass(type = null) {
    let defaults = "p-2 px-6 inline-flex gap-1 rounded-full";
    if (type === subpage) {
      defaults += " bg-primary text-white ";
    } else {
      defaults += " bg-gray-300";
    }
    return defaults;
  }
  return (
    <React.Fragment>
      <nav className="flex justify-center w-full mt-8 gap-4 mb-8">
        <Link className={linkClass("profile")} to={"/account"}>
          <FaRegUser className="mt-1" />
          My Profile
        </Link>
        <Link className={linkClass("bookings")} to={"/account/bookings"}>
          <FaListUl className="mt-1" />
          My Bookings
        </Link>
        <Link className={linkClass("places")} to={"/account/places"}>
          <FaRegBuilding className="mt-1" />
          My Accommodation
        </Link>
      </nav>
    </React.Fragment>
  );
};

export default AccountNav;
