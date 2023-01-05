import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { MIN_PRICE, MAX_PRICE } from "../constant/price";
import HotelItem from "../components/HotelItem";
import { useLazyGetHotelWithFilterQuery } from "../features/hotel/hotelApiSlice";
import { toastError } from "../features/message";
import { generateLaterDate } from "../utils/library";
import { LATER_DATE } from "../constant/date";
import { useCallback } from "react";

const HotelList = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    numPeople: 1,
  });
  const [fetchHotelWithFilter, { isLoading }] =
    useLazyGetHotelWithFilterQuery();
  const navigate = useNavigate();

  const searchHandle = useCallback(() => {
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

  useEffect(() => {
    const startDate = location.state
      ? location.state.date[0].startDate
      : new Date();
    const endDate = location.state
      ? location.state.date[0].endDate
      : generateLaterDate(LATER_DATE);
    const destination = location.state
      ? location.state.destination
      : "Ho Chi Minh";

    setDestination(destination);
    setDate([{ startDate, endDate }]);
    location.state &&
      location.state?.options &&
      setOptions(location.state.options);

    const fetchData = async () => {
      try {
        const data = await fetchHotelWithFilter({
          city: destination,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          numPeople: location.state.options.numPeople,
          minPrice: location.state.options.minPrice,
          maxPrice: location.state.options.maxPrice,
        }).unwrap();

        setHotels(data.hotels);
      } catch (err) {
        toastError(err);
      }
    };
    fetchData();
  }, [location, fetchHotelWithFilter]);

  return (
    <div>
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper grid grid-cols-12 w-full max-w-5xl gap-5">
          <div className="listSearch col-span-3  bg-teal-500 flex-1 p-[10px] rounded-xl stick top-3 h-max sticky">
            <h1 className="lsTitle text-xl mb-3 text-slate-700 font-bold">
              Search
            </h1>
            <div className="lsItem flex flex-col gap-1 mb-3">
              <label className="text-sm font-semibold">Destination</label>
              <input
                value={destination}
                type="text"
                className="h-[30px] border-none p-1"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label className="text-sm font-semibold">Check-in Date</label>
              <span
                className="h-[30px] p-1 bg-white flex items-center cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >
                {date &&
                  `${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                  moveRangeOnFirstSelection={false}
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
                  <input
                    type="number"
                    className="lsOptionInput w-14"
                    min={100000}
                    value={options.minPrice}
                    onChange={(e) => {
                      setOptions({ ...options, minPrice: e.target.value });
                    }}
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput w-14"
                    value={options.maxPrice}
                    min={100000}
                    onChange={(e) =>
                      setOptions({ ...options, maxPrice: e.target.value })
                    }
                  />
                </div>

                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">People</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput w-14"
                    value={options.numPeople}
                    onChange={(e) => {
                      setOptions({ ...options, numPeople: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              className="p-[10px] bg-amber-500 text-white border-none w-full font-medium cursor-pointer"
              onClick={() => {}}
            >
              Search
            </button>
          </div>
          <div className="listResult col-span-9">
            {isLoading && "Loading..."}
            {!isLoading && hotels.length === 0 && "No Data"}
            {!isLoading &&
              hotels.length > 0 &&
              hotels.map((hotel) => (
                <HotelItem key={hotel._id} hotel={hotel} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;