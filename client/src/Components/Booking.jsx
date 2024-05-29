/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";
const Booking = ({ place }) => {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleBookings = async (e) => {
    e.preventDefault();
    const formData = {
      checkIn,
      checkOut,
      maxGuest,
      name,
      mobile,
      place: place._id,
      price: numberOfDays * place.price,
    };
    const response = await axios.post("/bookings", formData);

    const bookingId = response.data._id;
    navigate(`/account/bookings/${bookingId}`);
  };
  return (
    <React.Fragment>
      <div className="grid mt-8 mb-4 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-4">
            <h2 className=" font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          max-Guests: {place.maxGuest}
        </div>
        <div className="">
          <div className="bg-white shadow p-4 rounded-2xl">
            <div className=" text-2xl text-center">
              price: ${place.price} / per night
            </div>
            <div className="mt-4 border rounded-2xl">
              <div className="flex">
                <div className=" px-4 py-3 ">
                  <label htmlFor="">Check-in: </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setcheckIn(e.target.value)}
                  />
                </div>
                <div className=" px-4 py-3 border-l">
                  <label htmlFor="">Check-out: </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setcheckOut(e.target.value)}
                  />
                </div>
              </div>
              <div className=" px-4 py-3 border-t">
                <label htmlFor="">Number of guests: </label>
                <input
                  type="number"
                  value={maxGuest}
                  onChange={(e) => setMaxGuest(e.target.value)}
                />
              </div>
              {numberOfDays > 0 && (
                <div className=" px-4 py-3 border-t">
                  <label htmlFor="">Your name: </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="">Phone number: </label>
                  <input
                    type="tel"
                    value={mobile}
                    placeholder="0123456789"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              )}
            </div>
            <button onClick={handleBookings} className="primary mt-3">
              Book this place
              {numberOfDays > 0 && <span> ${numberOfDays * place.price}</span>}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Booking;
