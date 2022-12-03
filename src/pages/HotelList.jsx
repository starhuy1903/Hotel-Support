import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import Header from "../components/Header";
import SearchItem from "../components/SearchItem";


const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  return (
    <div>
      <Header type="list" />
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper w-full max-w-5xl flex gap-5">
          <div className="listSearch bg-teal-500 flex-1 p-[10px] rounded-xl stick top-3 h-max">
            <h1 className="lsTitle text-xl mb-3 text-slate-700 font-bold">
              Search
            </h1>
            <div className="lsItem flex flex-col gap-1 mb-3">
              <label className="text-sm font-semibold">Destination</label>
              <input
                placeholder={destination}
                type="text"
                className="h-[30px] border-none p-1"
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm font-semibold">Check-in Date</label>
              <span
                className="h-[30px] p-1 bg-white flex items-center cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm font-semibold">Options</label>
              <div className="lsOptions p-[10px]">
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput w-14" />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput w-14" />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-14"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput w-14"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-14"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button className="p-[10px] bg-amber-500 text-white border-none w-full font-medium cursor-pointer">
              Search
            </button>
          </div>
          <div className="listResult flex-3">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
