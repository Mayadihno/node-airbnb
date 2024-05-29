import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="grid mt-8 gap-6 gap-y-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {places?.length > 0 &&
          places.map((place) => {
            return (
              <Link to={"/places/" + place._id} key={place._id}>
                <div className=" bg-gray-500 mb-2 rounded-2xl flex">
                  {place?.photos[0] && (
                    <img
                      src={"http://localhost:4000/uploads/" + place?.photos[0]}
                      alt=""
                      className="aspect-square object-cover rounded-2xl"
                    />
                  )}
                </div>
                <h2 className=" font-bold text-sm truncate leading-4">
                  {place.address}
                </h2>
                <h3 className="text-sm text-gray-500 leading-4">
                  {place?.title}
                </h3>
                <div className="mt-1">
                  <span className=" font-bold">${place.price}</span> per night
                </div>
              </Link>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Home;
