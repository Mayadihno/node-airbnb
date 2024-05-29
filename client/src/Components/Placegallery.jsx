/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiPhotoAlbum } from "react-icons/bi";

const Placegallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen bg-black">
        <div className="mt-6 px-9 fixed z-40">
          <button
            className="flex gap-2 bg-gray-500 py-2 px-4 rounded-2xl text-white shadow-md shadow-gray"
            onClick={() => setShowAllPhotos(false)}
          >
            <AiOutlineClose className="mt-1" /> Close Photos
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-16 p-8">
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => {
              return (
                <div className="" key={photo}>
                  <img
                    className=""
                    src={"http://localhost:4000/uploads/" + photo}
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="">
            {place?.photos?.[0] && (
              <div className="">
                <img
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                  className=" aspect-square object-cover lg:h-[400px] w-[850px]"
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place?.photos?.[1] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
                className=" aspect-square object-cover lg:h-[200px] w-[600px]"
                onClick={() => setShowAllPhotos(true)}
              />
            )}
            <div className=" overflow-hidden">
              {place?.photos?.[2] && (
                <img
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                  className=" aspect-square object-cover relative top-2 lg:h-[200px] w-[600px]"
                  onClick={() => setShowAllPhotos(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500"
        >
          <BiPhotoAlbum className="mt-1" /> Show more photos
        </button>
      </div>
    </React.Fragment>
  );
};

export default Placegallery;
