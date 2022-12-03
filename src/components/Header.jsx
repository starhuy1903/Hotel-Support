import React, { useState } from "react";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import classNames from "classnames";

const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };
  return (
    // header
    <div className="text-white bg-teal-500 flex justify-center relative w-full">
      {/* headerContainer */}
      <div
        className={classNames("w-full max-w-5xl mt-5 mb-[100px]", {
          "ml-5 mt-0 mr-0 mb-0": type === "list",
        })}
      >
        {type !== "list" && (
          <>
            {/* headerTitle */}
            <h1 className="text-4xl font-semibold">
              {" "}
              A lifetime of discounts? It's Genius.
            </h1>
            {/* headerDesc */}
            <p className="my-5">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Hotel Reservation account
            </p>
            <Link to="/login">
              {/* headerBtn */}
              <button className="bg-amber-500 font-medium border-none p-[10px] px-6 cursor-pointer rounded-md">
                Sign in
              </button>
            </Link>
            {/* headerSearch */}
            <div className="h-[50px] bg-white border-2 border-solid border-[#febb02] flex items-center justify-around py-[10px] rounded-md absolute -bottom-6  w-full max-w-5xl">
              {/* headerSearchItem */}
              <div className="flex items-center gap-[10px]">
                {/* headerIcon */}
                <FontAwesomeIcon icon={faBed} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none outline-none text-black"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              {/* headerSearchItem */}
              <div className="flex items-center gap-[10px]">
                {/* headerIcon */}
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-slate-500"
                />
                {/* headerSearchText */}
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-slate-500 cursor-pointer"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="absolute top-[50px] z-[2]"
                    minDate={new Date()}
                  />
                )}
              </div>
              {/* headerSearchItem */}
              <div className="flex items-center gap-[10px]">
                {/* headerIcon */}
                <FontAwesomeIcon icon={faPerson} className="text-slate-500" />
                {/* headerSearchText */}
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="text-slate-500 cursor-pointer"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="z-[2] absolute top-[50px] bg-white text-gray-500 rounded-md shadow-[0px 0px 10px -5px rgba(0, 0, 0, 0.4)]">
                    {/* optionItem */}
                    <div className="w-[200px] flex justify-between m-[10px]">
                      {/* optionText */}
                      <span className="optionText">Adult</span>
                      {/* optionCounter */}
                      <div className="flex items-center gap-[10px] text-xs text-black">
                        {/* optionCounterButton */}
                        <button
                          disabled={options.adult <= 1}
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">Children</span>
                      <div className="flex items-center gap-[10px] text-xs text-black">
                        <button
                          disabled={options.children <= 0}
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">Room</span>
                      <div className="flex items-center gap-[10px] text-xs text-black">
                        <button
                          disabled={options.room <= 1}
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-[10px]">
                {/* headerBtn */}
                <button
                  className="bg-amber-500 font-medium border-none p-[10px] cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
