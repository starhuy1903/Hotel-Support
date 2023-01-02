import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatCurrency } from "../utils/library";
import { MOCK_HOTEL_IMAGE_URL } from "../constant/image";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RoomItem = ({ room, handleBookingOnClick }) => {
  return (
    <>
      <div className=" searchItem border border-solid  border-slate-300 p-3 flex justify-between gap-5 mb-5 rounded-md">
        <div className="flex-grow-0 flex-shrink-0 w-[13rem] h-[13rem]">
          <img
            src={room?.photos ? room.photos[0] : MOCK_HOTEL_IMAGE_URL}
            alt=""
            className="siImg w-full h-full object-cover block"
            loading="lazy"
          />
        </div>
        <div className="siDesc flex flex-col gap-[10px] flex-auto justify-end">
          <Link
            to={`/rooms/${room?._id || room?.id}`}
            className="siTitle text-xl font-bold text-teal-600 flex justify-between items-start"
          >
            <span>{room ? room.room_name : "N/A"}</span>
            <button className="bg-teal-600 text-white p-[5px] font-bold border-none text-base">
              N/A
            </button>
          </Link>
          <span className="siTaxiOp text-sm bg-[#008009] text-white w-max p-2 rounded-md">
            {room?.hotel ? room.hotel.name : "N/A"}
          </span>
          <span className="siSubtitle text-sm font-bold">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
            <span>{room?.hotel?.address ? room.hotel.address : "N/A"}</span>
          </span>
          <span className="siCancelOp text-sm font-bold">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            <span>
              {room?.hotel?.phone_number ? room?.hotel?.phone_number : "N/A"}
            </span>
          </span>
          <span className="siFeatures text-sm line-clamp-3 ">
            {room?.description ? room.description : "N/A"}
          </span>

          <div className="siDetailText flex flex-col gap-[5px] text-[#008009] ">
            <span className="siPrice text-xl font-bold">
              {room?.current_price
                ? formatCurrency(room?.current_price)
                : "N/A"}{" "}
            </span>
            <span className="siTaxOp text-sm text-gray-400">
              Includes taxes and fees
            </span>
          </div>
          <button
            onClick={() => handleBookingOnClick(room?._id)}
            className="inline-block ml-auto siCheckButton bg-amber-500 text-white font-bold py-[10px] px-[5px] border-none cursor-pointer rounded-md"
          >
            Book now
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomItem;
