import React, { useEffect } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import { useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings?.map((booking) => {
            return (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex bg-gray-200 rounded-2xl overflow-hidden gap-4"
                key={booking.id}
              >
                <div className=" w-48">
                  {booking?.place?.photos?.[0] && (
                    <div className="">
                      <img
                        src={
                          "http://localhost:4000/uploads/" +
                          booking?.place.photos[0]
                        }
                        alt=""
                        className=" aspect-square object-cover lg:h-[400px] w-[850px]"
                      />
                    </div>
                  )}
                </div>
                <div className="py-3 grow pr-3">
                  <h2 className=" text-xl">{booking.place.title}</h2>
                  <div className="flex gap-2 items-center border-t border-gray-300 mt-2 py-2">
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
              </Link>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default BookingsPage;
