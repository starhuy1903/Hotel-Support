import React, { useEffect, useState, useCallback } from "react";
import {
  faBed,
  faCalendarDays,
  faPerson,
  faUsd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import classNames from "classnames";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../features/auth/authSlice";
import { formatCurrency, generateLaterDate } from "../utils/library";
import { LATER_DATE } from "../constant/date";
import { MIN_PRICE, MAX_PRICE } from "../constant/price";

const Header = ({ type }) => {
  const user = useSelector(selectCurrentUser);

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: generateLaterDate(LATER_DATE),
      key: "selection",
    },
  ]);
  const [openPriceOptions, setOpenPriceOptions] = useState(false);
  const [openPeopleOptions, setOpenPeopleOptions] = useState(false);

  const [options, setOptions] = useState({
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    numPeople: 1,
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

  const searchHandle = useCallback(() => {
    if (!destination) {
      toast.info("Please specify a destination");
      return;
    }

    navigate("/hotels", { state: { destination, date, options } });
  }, [date, destination, navigate, options]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        searchHandle();
      }
    };
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [searchHandle]);

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
            {!user && (
              <Link to="/login">
                {/* headerBtn */}
                <button className="bg-amber-500 font-medium border-none p-[10px] px-6 cursor-pointer rounded-md">
                  Sign in
                </button>
              </Link>
            )}
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
                  onClick={() => {
                    setOpenPriceOptions(!openPriceOptions);
                    setOpenPeopleOptions(false);
                  }}
                  className="text-slate-500 cursor-pointer"
                >{`People: ${options.numPeople}`}</span>
                {openPriceOptions && (
                  <div className="z-[2] absolute top-[50px] bg-white text-gray-500 rounded-md shadow-[0px 0px 10px -5px rgba(0, 0, 0, 0.4)]">
                    {/* optionItem */}

                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">People</span>
                      <div className="flex items-center gap-[10px] text-xs text-black">
                        <button
                          disabled={options.people <= 1}
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("numPeople", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.numPeople}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("numPeople", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-[10px]">
                {/* headerIcon */}
                <FontAwesomeIcon icon={faUsd} className="text-slate-500" />
                {/* headerSearchText */}
                <span
                  onClick={() => {
                    setOpenPeopleOptions(!openPeopleOptions);
                    setOpenPriceOptions(false);
                  }}
                  className="text-slate-500 cursor-pointer"
                >{`From  ${formatCurrency(
                  options.minPrice
                )} to ${formatCurrency(options.maxPrice)}`}</span>
                {openPeopleOptions && (
                  <div className="z-[2] absolute top-[50px] bg-white text-gray-500 rounded-md shadow-[0px 0px 10px -5px rgba(0, 0, 0, 0.4)]">
                    {/* optionItem */}
                    <div className="w-[200px] flex justify-between m-[10px]">
                      {/* optionText */}
                      <span className="optionText">Min price</span>
                      {/* optionCounter */}
                      <div className="flex items-center gap-[10px] text-xs text-black">
                        {/* optionCounterButton */}
                        <button
                          disabled={options.minPrice <= 1}
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("minPrice", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.minPrice}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("minPrice", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">Max price</span>
                      <div className="flex items-center gap-[10px] text-xs text-black">
                        <button
                          disabled={options.maxPrice <= 0}
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("maxPrice", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.maxPrice}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-solid border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("maxPrice", "i")}
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
                  onClick={searchHandle}
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
