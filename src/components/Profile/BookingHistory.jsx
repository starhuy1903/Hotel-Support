import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { toastError } from "../../features/message";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetHistoryQuery } from "../../features/auth/authApiSlice";
import { selectCurrentHistory, setHistory } from "../../features/auth/authSlice";
import { useState } from "react";


const BookingStatus = {
  PENDING: 'pending',
  SUCCESS: 'success',
  CANCEL: 'cancel',
  END: 'end',
}

const BookingItem = ({
  hotelName,
  roomName,
  startDate,
  statusName,
  totalPrice,
  discountPercent,
}) => {
  const [bookingStatus, setBookingStatus] = useState(statusName);
  const priceFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format;
  const cancelBtnProps = useMemo(() => 
    bookingStatus === BookingStatus.PENDING ? ({
      className: "w-36 rounded-sm py-1 text-white bg-rose-300 cursor-pointer",
      onClick: () => setBookingStatus(false),
    }) : ({
      className: "w-36 rounded-sm py-1 text-gray-600 bg-gray-300 cursor-default",
      onClick: null,
    }), [bookingStatus]);

  return (
    <div className="flex flex-col px-4 mb-6 border-t border-gray-300">
      <div className="flex flex-col justify-start">
        <div className="text-lg mt-4 font-semibold">Hotel: {hotelName}</div>
        <div className="text-gray-600 mt-2">
          <div className="text-sm mt-1">Room: {roomName}</div>
          <div className="text-sm mt-1">Start date: {startDate}</div>
          <div className="text-sm mt-1">Price: {priceFormatter(totalPrice)}</div>
          <div className="text-sm mt-1">{discountPercent} off</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button {...cancelBtnProps}>Cancel</button>
      </div>
    </div>
  )
}

const BookingHistory = () => {
  const dispatch = useDispatch();
  const [getHistoryData] = useLazyGetHistoryQuery();
  const histories = useSelector(selectCurrentHistory);

  const fetchBookingHistory = useCallback(async () => {
    try {
      const data = await getHistoryData().unwrap(); 
      dispatch(setHistory({ history: data }));
    } catch (err) {
      toastError(err);
    }
  }, [dispatch, getHistoryData]);

  useEffect(() => {
    fetchBookingHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(histories)

  return (
    <div className="mt-8">
      <div className="px-4 text-2xl">Booking history</div>
      <div className="flex flex-col my-8 h-full overflow-y-scroll">
        {!histories && (
          <div className="flex justify-center items-center grow">
            No booking history found 🥲
          </div>
        )}
        {histories && histories.map((history) => (
          <BookingItem {...history} />
        ))}
      </div>
    </div>
  )
}

export default BookingHistory;