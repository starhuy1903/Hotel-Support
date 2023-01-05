import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { useLazyGetHotelDetailQuery } from "../features/hotel/hotelApiSlice";
import { toastError } from "../features/message";
import { Link, useParams } from "react-router-dom";
import { formatCurrency } from "../utils/library";

const HotelDetail = () => {
  const [getHotelDetail] = useLazyGetHotelDetailQuery();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState();
  const { hotelId } = useParams();

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

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
        const data = await getHotelDetail(hotelId).unwrap();
        setHotel(data);
      } catch (err) {
        toastError(err);
      }
    };
    fetchData();
  }, [getHotelDetail, hotelId]);

  return (
    <div className="hotelContainer flex flex-col items-center mt-5">
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
              src={photos[slideNumber].src}
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
      <div className="hotelWrapper w-full max-w-5xl flex flex-col gap-[10px] relative">
        <h1 className="hotelTitle text-2xl">
          {hotel?.name ? hotel.name : "N/A"}
        </h1>
        <div className="hotelAddress text-sm flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faLocationDot} />
          <span> {hotel?.address ? hotel.address : "N/A"}</span>
        </div>
        <div className="hotelAddress text-sm flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faPhone} />
          <span> {hotel?.phone_number ? hotel.phone_number : "N/A"}</span>
        </div>
        {/* <span className="hotelPriceHighlight text-[#008009] font-medium">
          Book a stay over $114 at this property and get a free airport taxi
        </span> */}
        <div className="hotelImages flex flex-wrap justify-between">
          {hotel?.photos &&
            hotel.photos.map((photo, i) => (
              <div className="hotelImgWrapper w-[33%] mt-1" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg w-full object-cover cursor-pointer"
                />
              </div>
            ))}
        </div>
        <div className="hotelDetails flex justify-between gap-5 mt-5">
          <div className="hotelDetailsTexts flex-[3]">
            <p className="hotelDesc text-sm mt-5">{hotel?.description}</p>
          </div>
          <div className="hotelDetailsPrice flex-1 bg-[#ebf3ff] p-5 flex flex-col gap-5">
            <span className="text-sm">On sale!</span>
            <h2 className="font-light text-red-500">
              <b className="line-through mr-2 ">
                From{" "}
                {formatCurrency(
                  hotel?.cheapest_price + hotel?.cheapest_price * 0.2
                )}
              </b>
              <b>(-20%)</b>
            </h2>
            <h2 className=" text-teal-600 font-bold">
              <b>From {formatCurrency(hotel?.cheapest_price)}</b>
            </h2>

            <Link
              to={`/hotels/${hotel?._id}/rooms`}
              className="border-none px-5 py-[10px] bg-amber-500 text-white font-bold cursor-pointer rounded-md"
            >
              Reserve or Book Now!
            </Link>
          </div>
        </div>
      </div>
      <MailList />
      <div className="mt-5"></div>
      <Footer />
    </div>
  );
};

export default HotelDetail;