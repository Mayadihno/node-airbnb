import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhotoUploader from "./PhotoUploader";
import Perks from "./Perks";
import AccountNav from "./AccountNav";

const PlaceFormData = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhoto(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckout(data.checkOut);
      setGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      addedPhoto,
      address,
      description,
      perks,
      checkIn,
      checkout,
      guests,
      extraInfo,
      price,
    };
    if (id) {
      //update
      await axios.put("/places/:id", {
        id,
        ...formData,
      });
      navigate("/account/places");
    } else {
      //newPlace
      await axios.post("/places", formData);
      navigate("/account/places");
    }
  };

  return (
    <React.Fragment>
      <AccountNav />
      <div className="">
        <form onSubmit={handleSubmit}>
          <h2 className=" text-xl mt-4">Title</h2>
          <input
            type="text"
            placeholder="title, for example: my lovely apartment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className=" text-xl mt-4">Address</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
          />
          <PhotoUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} />
          <h2 className=" text-xl mt-4">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Perks selected={perks} onChange={setPerks} />
          <h2 className=" text-xl mt-4">Extra Information</h2>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          <h2 className=" text-xl mt-4">
            Check in & Check out time, max guests
          </h2>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check-in time</h3>
              <input
                type="number"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check-out time</h3>
              <input
                type="number"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                placeholder="09:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PlaceFormData;
