import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toastError } from "../features/message";
import {
  useBookRoomMutation,
  useLazyGetRoomDetailQuery,
} from "../features/room/roomApiSlice";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import {
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../utils/library";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import AuthWarning from "../components/AuthWarning";
import BookingModal from "../components/BookingModal";
import { toast } from "react-toastify";

const RoomDetail = () => {
  const user = useSelector(selectCurrentUser);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingRoom, setBookingRoom] = useState("");
  const { roomId, hotelId } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [fetchRoomDetail] = useLazyGetRoomDetailQuery();
  const [room, setRoom] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookRoom] = useBookRoomMutation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const room = searchParams.get("bookingRoom");
    if (room) {
      handleBookingOnClick(room);
    }
  }, [searchParams]);

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

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoomDetail({ hotelId, roomId }).unwrap();
        setRoom(data);
      } catch (err) {
        toastError(err);
      }
    };
    if (hotelId && roomId) {
      console.log(hotelId, roomId);

      fetchData();
    }
  }, [fetchRoomDetail, hotelId, roomId]);

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
      <div className="roomContainer flex flex-col items-center mt-5">
        {open && (
          <div className="slider sticky top-0 left-0 w-[99vw] h-screen bg-slate-200 z-[999] flex items-center">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close absolute top-5 right-5 text-3xl text-slate-700 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow m-5 text-5xl text-slate-700 cursor-pointer"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper w-full h-full flex justify-center items-center">
              <img
                src={room?.photos[slideNumber].src}
                alt=""
                className="sliderImg w-[75%] h-[75vh]"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow m-5 text-5xl text-slate-700 cursor-pointer"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="roomWrapper w-full max-w-5xl flex flex-col gap-[10px] relative">
          <h1 className="roomTitle text-2xl">
            {room?.room_name ? room.room_name : "N/A"}
          </h1>
          <div className="roomAddress text-sm flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faLocationDot} />
            <span> {room?.hotel?.address ? room?.hotel?.address : "N/A"}</span>
          </div>
          <div className="roomAddress text-sm flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faPhone} />
            <span>
              {" "}
              {room?.hotel?.phone_number ? room.hotel?.phone_number : "N/A"}
            </span>
          </div>
          {/* <span className="roomPriceHighlight text-[#008009] font-medium">
          Book a stay over $114 at this property and get a free airport taxi
        </span> */}
          <div className="roomImages flex flex-wrap justify-between">
            {room?.photos &&
              room.photos.map((photo, i) => (
                <div className="roomImgWrapper w-[33%] mt-1" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="roomImg w-full object-cover cursor-pointer"
                  />
                </div>
              ))}
          </div>
          <div className="roomDetails flex justify-between gap-5 mt-5">
            <div className="roomDetailsTexts flex-[3]">
              <p className="roomDesc text-sm mt-5">{room?.description}</p>
            </div>
            <div className="roomDetailsPrice flex-1 bg-[#ebf3ff] p-5 flex flex-col gap-5 items-start">
              <span className="text-sm">On sale!</span>
              <h2 className="font-light text-red-500">
                <b className="line-through mr-2 ">
                  From{" "}
                  {formatCurrency(
                    room?.current_price + room?.current_price * 0.2
                  )}
                </b>
                <b>(-20%)</b>
              </h2>
              <h2 className=" text-teal-600 font-bold">
                <b>From {formatCurrency(room?.current_price)}</b>
              </h2>

              <button
                onClick={() => handleBookingOnClick(roomId)}
                className="border-none px-5 py-[10px] bg-amber-500 text-white font-bold cursor-pointer rounded-md"
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <div className="mt-5"></div>
        <Footer />
      </div>
    </>
  );
};

export default RoomDetail;
