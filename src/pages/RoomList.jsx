import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toastError } from "../features/message";
import { useLazyGetAllRoomsQuery } from "../features/room/roomApiSlice";
import RoomItem from "../components/RoomItem";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [fetchRooms, { isLoading }] = useLazyGetAllRoomsQuery();
  const { hotelId } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchRooms(hotelId).unwrap();
      setRooms(data.rooms);
    } catch (err) {
      toastError(err);
    }
  }, [fetchRooms, hotelId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div className="listContainer flex justify-center mt-5">
        <div className="listWrapper grid grid-cols-12 w-full max-w-5xl gap-5">
          <div className="listResult col-span-12">
            {isLoading && "Loading..."}
            {!isLoading && rooms.length === 0 && "No Data"}
            {!isLoading &&
              rooms.length > 0 &&
              rooms.map((room) => <RoomItem key={room._id} room={room} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
