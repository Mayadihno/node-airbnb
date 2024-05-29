/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useEffect } from "react";
import AccountNav from "../Components/AccountNav";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <React.Fragment>
      <AccountNav />

      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className=" inline-flex gap-2 text-white bg-primary py-2 px-6 rounded-full"
        >
          <BiPlus fontSize={20} className="mt-0.5 text-white" />
          Add new place
        </Link>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {places.length > 0 &&
            places.map((place) => {
              return (
                <Link
                  to={`/account/places/${place._id}`}
                  className="flex gap-4 bg-gray-200 p-4 rounded-2xl cursor-pointer"
                  key={place._id}
                >
                  <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0">
                    {place?.photos?.length > 0 && (
                      <img
                        src={"http://localhost:4000/uploads/" + place.photos[0]}
                        alt=""
                        className=" object-cover w-full"
                      />
                    )}
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlacesPage;
