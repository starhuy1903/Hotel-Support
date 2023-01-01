import { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "../components/Header";
import SearchItem from "../components/SearchItem";
import { useEffect } from "react";
import { useLazyGetRoomWithFilterQuery } from "../features/room/roomApiSlice";
import { toastError } from "../features/message";

const HotelList = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    min: 1000000,
    max: 1000000,
    adult: 1,
    children: 0,
    room: 1,
  });
  const [fetchRoomWithFilter, { isLoading }] = useLazyGetRoomWithFilterQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const startDate = location.state
      ? location.state.date[0].startDate
      : new Date();
    const endDate = location.state
      ? location.state.date[0].endDate
      : new Date(new Date().setDate(new Date().getDate() + 7));
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
        const data = await fetchRoomWithFilter({
          city: destination,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }).unwrap();

        setRooms(data.rooms);
      } catch (err) {
        toastError(err);
      }
    };
    fetchData();
  }, [location, fetchRoomWithFilter]);

  return (
    <div>
      <Header type="list" />
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper grid grid-cols-12 w-full max-w-5xl gap-5">
          <div className="listSearch col-span-3  bg-teal-500 flex-1 p-[10px] rounded-xl stick top-3 h-max">
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
                    value={options.min}
                    onChange={(e) =>
                      setOptions({ ...options, min: e.target.value })
                    }
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput w-14"
                    value={options.max}
                    min={100000}
                    onChange={(e) =>
                      setOptions({ ...options, max: e.target.value })
                    }
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput w-14"
                    value={options.adult}
                    onChange={(e) =>
                      setOptions({ ...options, adult: e.target.value })
                    }
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput w-14"
                    value={options.children}
                    onChange={(e) =>
                      setOptions({ ...options, children: e.target.target })
                    }
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-3 text-slate-600 text-sm">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="input"
                    min={1}
                    className="lsOptionInput w-14"
                    value={options.room}
                    onChange={(e) =>
                      setOptions({ ...options, room: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className="p-[10px] bg-amber-500 text-white border-none w-full font-medium cursor-pointer"
              onClick={() => {
                navigate("/hotels", { state: { destination, date, options } });
              }}
            >
              Search
            </button>
          </div>
          <div className="listResult col-span-9">
            {isLoading && "Loading..."}
            {!isLoading && rooms.length === 0 && "No Data"}
            {!isLoading &&
              rooms.length &&
              rooms.map((room) => <SearchItem key={room._id} room={room} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
