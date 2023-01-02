import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";

const BookingModal = ({ confirmHandle, closeModal }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-10 bg-black/20">
      <div className="p-3   bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between">
        <FontAwesomeIcon
          icon={faClose}
          className="absolute top-3 right-3 cursor-pointer"
          onClick={closeModal}
        />

        <h1 className="text-center font-bold text-lg mb-6">Choose Date</h1>
        <span>
          <DateRange
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            ranges={date}
            moveRangeOnFirstSelection={false}
          />
        </span>
        <div className="flex ml-auto gap-3 mt-6 ">
          <button
            onClick={closeModal}
            className="px-2 py-2 text-gray-600 border-gray-300 border border-solid rounded-md "
          >
            Cancel
          </button>
          <button
            onClick={() => {
              confirmHandle(date[0].startDate, date[0].endDate);
            }}
            className="px-4 py-2 text-white bg-teal-600 border border-solid rounded-md "
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
