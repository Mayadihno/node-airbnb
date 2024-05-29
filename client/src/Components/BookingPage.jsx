import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Placegallery from "./Placegallery";
import { BiCalendar } from "react-icons/bi";
import { differenceInCalendarDays, format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <React.Fragment>
      <div className="my-8">
        <h2 className=" text-3xl">{booking?.place.title}</h2>
        <a
          target="_blank"
          href={"https://maps.google.com/?q=" + booking?.place.address}
          rel="noreferrer"
          className=" flex gap-1 items-center font-semibold underline my-2"
        >
          <FaLocationArrow />
          {booking?.place.address}
        </a>
        <div className="bg-gray-200 p-4 my-6 rounded-2xl flex items-center justify-between">
          <div className="">
            <h2 className=" text-2xl mb-4">Your booking information:</h2>
            <div className="flex gap-2">
              <div className="flex">
                <BiCalendar className="mt-1" />
                {format(new Date(booking.checkIn), "yyyy-MM-dd")}
              </div>
              &rarr;
              <div className="flex">
                <BiCalendar className="mt-1" />
                {format(new Date(booking.checkOut), "yyyy-MM-dd")}
              </div>
            </div>
            <div className=" text-xl">
              {differenceInCalendarDays(
                new Date(booking.checkOut),
                new Date(booking.checkIn)
              )}
              nights | Total price: ${booking.price}
            </div>
          </div>
          <div className=" bg-primary text-white p-6 rounded-2xl">
            <div className="">Total Price</div>
            <div className=" text-3xl">${booking.price}</div>
          </div>
        </div>
        <Placegallery place={booking.place} />
      </div>
    </React.Fragment>
  );
};

export default BookingPage;
