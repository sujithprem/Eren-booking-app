import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/Blurcircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const savedBookings =
    JSON.parse(localStorage.getItem("myBookings")) || [];

  setBookings(savedBookings);
  setIsLoading(false);
}, []);

  if (isLoading) return <Loading />;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div><BlurCircle bottom="0px" left="600px" /></div>
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

{bookings.map((item, index) => (
  <div key={index} className="flex flex-col md:flex-row justify-between bg-white/10 border border-gray-600/20 rounded-lg mt-4 p-2 max-w-3xl">
    <div className="flex flex-col md:flex-row">
      <img
        src={`${IMAGE_BASE_URL}${item.show.movie.poster_path}`}
        className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
      />

      <div className="flex flex-col p-4">
        <p className="text-lg font-semibold">
          {item.show.movie.title}
        </p>

        <p className="text-sm text-gray-400">
          {timeFormat(item.show.movie.runtime)}
        </p>

        <p className="text-sm mt-auto text-gray-400">
          {dateFormat(item.show.showDateTime)}
        </p>
      </div>
    </div>

    <div className="flex flex-col md:items-end md:text-right justify-between p-4">
      <div className="flex items-center gap-4">
      <p className="text-2xl font-semibold mb-3">
        ₹{item.amount}
      </p>
      {!item.isPaid && <button className="bg-red-500 px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">Pay Now</button>}
      </div>
      <div className="text-sm">
      <p> <span className="text-gray-400">
        Seats:</span>{item.bookedSeats.join(", ")}
      </p></div>
    </div>
  </div>
))}

    </div>
  );
};

export default MyBookings;
