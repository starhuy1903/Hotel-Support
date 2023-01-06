import { useCallback } from "react";
import { useEffect } from "react";
import { toastError } from "../../features/message";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetHistoryQuery } from "../../features/auth/authApiSlice";
import { selectCurrentHistory, setHistory } from "../../features/auth/authSlice";


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
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-start">
        <div>{hotelName}</div>
        <div>{roomName}</div>
        <div>{startDate}</div>
        <div>{totalPrice}</div>
        <div>{discountPercent}</div>
      </div>
      {[BookingStatus.CANCEL, BookingStatus.END].includes(statusName) && 
        (<button className="bg-rose-300" onClick={() => null}>Cancel</button>) 
      }
    </div>
  )
}

const BookingHistory = () => {
  const dispatch = useDispatch();
  const [getHistoryData] = useLazyGetHistoryQuery();
  const history = useSelector(selectCurrentHistory);

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
  }, []);

  // console.log(history)

  return (
    <div className="mt-8">
      <div className="px-4 text-2xl">Booking history</div>
    </div>
  )
}

export default BookingHistory;