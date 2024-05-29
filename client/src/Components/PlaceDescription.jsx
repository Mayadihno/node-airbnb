import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import Booking from "./Booking";
import Placegallery from "./Placegallery";

const PlaceDescription = () => {
  const { id } = useParams();
  const [place, setPlace] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  return (
    <React.Fragment>
      <div className="mt-4 pt-8 bg-gray-200 px-8 -mx-8">
        <h1 className=" text-2xl">{place?.title}</h1>
        <a
          target="_blank"
          href={"https://maps.google.com/?q=" + place.address}
          rel="noreferrer"
          className=" flex gap-1 items-center font-semibold underline my-2"
        >
          <FaLocationArrow />
          {place.address}
        </a>
        <Placegallery place={place} />
        <Booking place={place} />

        <div className=" bg-white px-8 py-8 -mx-8 border-t">
          <div className="">
            <h2 className=" font-semibold text-2xl">Extra Information: </h2>
          </div>
          <div className="my-4 leading-4 text-sm text-gray-700">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaceDescription;
