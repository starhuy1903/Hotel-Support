import React, { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";
import { toastError } from "../features/message";
import {
  useBookRoomMutation,
  useLazyGetAllRoomsQuery,
} from "../features/room/roomApiSlice";
import RoomItem from "../components/RoomItem";
import AuthWarning from "../components/AuthWarning";
import BookingModal from "../components/BookingModal";
import { toast } from "react-toastify";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingRoom, setBookingRoom] = useState("");
  const [fetchRooms, { isLoading }] = useLazyGetAllRoomsQuery();
  const { hotelId } = useParams();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [bookRoom] = useBookRoomMutation();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchRooms(hotelId).unwrap();
      setRooms(data.rooms);
    } catch (err) {
      toastError(err);
    }
  }, [fetchRooms, hotelId]);

  const booking = async (startDate, endDate) => {
    try {
      await bookRoom({
        roomId: bookingRoom,
        endDate,
        startDate,
      });
      toast.success("Booking successfully");
      setTimeout(() => navigate("/"));
    } catch (err) {
      toastError(err);
    }
  };

  const handleBookingOnClick = async (id) => {
    setIsBooking(true);
    setBookingRoom(id);
  };

  const closeModal = () => {
    setIsBooking(false);
    setBookingRoom("");
  };

  const AuthWarningSubmit = () => {
    navigate("/login", {
      state: { from: `${location.pathname}?bookingRoom=${bookingRoom}` },
    });
  };

  useEffect(() => {
    const room = searchParams.get("bookingRoom");
    if (room) {
      handleBookingOnClick(room);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {});

  return (
    <>
      {isBooking && !user && bookingRoom && (
        <AuthWarning
          closeModal={closeModal}
          confirmHandle={AuthWarningSubmit}
        />
      )}

      {isBooking && user && bookingRoom && (
        <BookingModal confirmHandle={booking} closeModal={closeModal} />
      )}
      <div>
        <div className="listContainer flex justify-center mt-5">
          <div className="listWrapper grid grid-cols-12 w-full max-w-5xl gap-5">
            <div className="listResult col-span-12">
              {isLoading && "Loading..."}
              {!isLoading && rooms.length === 0 && "No Data"}
              {!isLoading &&
                rooms.length > 0 &&
                rooms.map((room) => (
                  <RoomItem
                    key={room._id}
                    room={room}
                    handleBookingOnClick={handleBookingOnClick}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomList;