/* eslint-disable react/prop-types */
import React from "react";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { GiSittingDog } from "react-icons/gi";
import { BsDoorOpen } from "react-icons/bs";
import { BiWifi, BiSolidCar, BiRadio } from "react-icons/bi";
const Perks = ({ selected, onChange }) => {
  const handleCbClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <React.Fragment>
      <h2 className=" text-xl mt-4">Perks</h2>
      <div className="grid mt-2 gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("wifi")}
            name="wifi"
            onChange={handleCbClick}
          />
          <BiWifi />
          <span>Wifi</span>
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("parking space")}
            name="parking space"
            onChange={handleCbClick}
          />
          <BiSolidCar />
          <span>Free parking space</span>
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="Tv"
            checked={selected.includes("Tv")}
            onChange={handleCbClick}
          />
          <PiTelevisionSimpleLight />
          <span>Tv</span>
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("radio")}
            name="radio"
            onChange={handleCbClick}
          />
          <BiRadio />
          <span>Radio</span>
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes("pets")}
            name="pets"
            onChange={handleCbClick}
          />
          <GiSittingDog />
          <span>Pets</span>
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            name="entrance"
            checked={selected.includes("entrance")}
            onChange={handleCbClick}
          />
          <BsDoorOpen />
          <span>Private entrance</span>
        </label>
      </div>
    </React.Fragment>
  );
};

export default Perks;
