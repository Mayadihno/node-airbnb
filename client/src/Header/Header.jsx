import React, { useContext } from "react";
import { PiPaperPlaneRight } from "react-icons/pi";
import { BsSearch } from "react-icons/bs";
import { HiOutlineMenu, HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContext";
const Header = () => {
  const { user } = useContext(userContext);
  return (
    <React.Fragment>
      <div className="flex justify-between">
        <Link to={"/"} className="logo flex items-center gap-1">
          <i>
            <PiPaperPlaneRight className="-rotate-90" fontSize={20} />
          </i>
          <span className=" font-bold text-xl">airbnb</span>
        </Link>
        <div className="flex gap-2 shadow-md shadow-gray-300 border border-gray-500 py-2 px-4 rounded-full">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any year</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary text-white p-1 rounded-full">
            <BsSearch fontSize={15} />
          </button>
        </div>
        <div className="flex items-center gap-2 border border-gray-500 py-1 px-4 rounded-full">
          <Link to={"/login"}>
            <HiOutlineMenu fontSize={20} />
          </Link>
          <i>
            <HiOutlineUserCircle fontSize={20} />
          </i>
          {user && (
            <Link to={"/account"} className=" capitalize font-semibold">
              {user.name}
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
