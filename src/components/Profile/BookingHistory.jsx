import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { toastError } from "../../features/message";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetHistoryQuery } from "../../features/auth/authApiSlice";
import { selectCurrentHistory, setHistory } from "../../features/auth/authSlice";
import { useState } from "react";
import { percentageFormatter, priceFormatter, timeFormatter } from "../../utils/intl";
import { toast } from "react-toastify";
import { useCancelReservationMutation } from '../../features/room/roomApiSlice';


const BookingStatus = {
  PENDING: 'pending',
  SUCCESS: 'success',
  CANCEL: 'cancel',
  END: 'end',
}

const BookingItem = ({
  _id,
  hotelName,
  roomName,
  startDate,
  endDate,
  createdAt,
  statusName,
  totalPrice,
  discountPercent,
}) => {
  const [bookingStatus, setBookingStatus] = useState(BookingStatus.PENDING); // TODO: remove mock
  const [cancelReversation] = useCancelReservationMutation();

  const handleCancelReversation = useCallback(async () => {
    try {
      const data = await cancelReversation(_id).unwrap();
      toast.success(data.message);
      setBookingStatus(BookingStatus.PENDING); // TODO: remove mock
    } catch (err) {
      toastError(err);
      setBookingStatus(BookingStatus.PENDING); // TODO: remove mock
    }
  }, [_id, cancelReversation]);
  
  const cancelBtnProps = useMemo(() => 
    bookingStatus === BookingStatus.PENDING ? ({
      className: "w-36 rounded-sm py-1 text-white bg-rose-300 cursor-pointer",
      onClick: () => handleCancelReversation()
    }) : ({
      className: "w-36 rounded-sm py-1 text-gray-600 bg-gray-300 cursor-default",
      onClick: null,
    }), [bookingStatus, handleCancelReversation]);

  return (
    <div className="flex flex-col px-4 mb-4 rounded-sm">
      <div className="flex flex-col justify-start">
        <div className="text-lg mt-4 font-semibold">{hotelName}</div>
        <table className="text-gray-600 mt-2 text-sm">
          <tr className="font-semibold">
            <td>Room</td>
            <td>Booked at</td>
            <td>From date</td>
            <td>To date</td>
            <td>Price</td>
            <td>Discount</td>
          </tr>
          <tr>
            <td width="10%">{roomName}</td>
            <td width="20%">{timeFormatter(createdAt)}</td>
            <td width="20%">{timeFormatter(startDate)}</td>
            <td width="20%">{timeFormatter(endDate)}</td>
            <td width="15%">{priceFormatter(totalPrice)}</td>
            <td>{percentageFormatter(discountPercent)}</td>
          </tr>
        </table>
      </div>
      <div className="flex justify-end my-4">
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