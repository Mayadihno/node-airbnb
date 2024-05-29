/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";
import { BsFillStarFill, BsTrash3 } from "react-icons/bs";
import { BiStar } from "react-icons/bi";
const PhotoUploader = ({ addedPhoto, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  const handleAddedPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const handleUploadPhotoFromFolder = (e) => {
    const file = e.target.files;
    const data = new FormData();
    for (let index = 0; index < file.length; index++) {
      data.append("photos", file[index]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        onChange((prev) => {
          return [...prev, ...filename];
        });
      });
  };

  const handleRemove = (e, filename) => {
    e.preventDefault();
    onChange([...addedPhoto.filter((photos) => photos != filename)]);
  };
  const handleSelectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    const addedPhotoWithoutSelected = addedPhoto.filter(
      (photos) => photos != filename
    );
    const newAddedPhoto = [filename, ...addedPhotoWithoutSelected];
    onChange(newAddedPhoto);
  };
  return (
    <React.Fragment>
      <h2 className=" text-xl mt-4">Photo</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link....."
        />
        <button
          className=" bg-gray-200 grow px-4 rounded-2xl"
          onClick={handleAddedPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 gap-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhoto?.length > 0 &&
          addedPhoto.map((link) => {
            return (
              <div className="flex relative" key={link}>
                <img
                  src={"http://localhost:4000/uploads/" + link}
                  alt=""
                  className=" rounded-2xl h-40 w-full object-cover"
                />
                <button
                  onClick={(e) => handleRemove(e, link)}
                  className="absolute bottom-2 right-2 text-white bg-red-500 p-2 rounded-2xl cursor-pointer bg-opacity-70"
                >
                  <BsTrash3 />
                </button>
                <button
                  onClick={(e) => handleSelectAsMainPhoto(e, link)}
                  className="absolute bottom-2 left-2 text-white bg-black p-2 rounded-2xl cursor-pointer bg-opacity-70"
                >
                  {link === addedPhoto[0] ? <BsFillStarFill /> : <BiStar />}
                </button>
              </div>
            );
          })}
        <label className="flex h-40 items-center cursor-pointer justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-500">
          <FaFileUpload className="mt-1" />
          <input
            type={"file"}
            className=" hidden"
            multiple
            onChange={handleUploadPhotoFromFolder}
            accept=".jpg,.png,.jpeg"
          />
          Upload
        </label>
      </div>
    </React.Fragment>
  );
};

export default PhotoUploader;
