import { apiSlice } from "../../app/api/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (id) => ({
        url: `/hotel/${id}/room`,
      }),
    }),

    bookRoom: builder.mutation({
      query: (body) => ({
        url: "reservation",
        method: "POST",
        body,
      }),
    }),

    getRoomDetail: builder.query({
      query: ({ hotelId, roomId }) => ({
        url: `/hotel/${hotelId}/room/${roomId}`,
      }),
    }),
  }),
});

export const {
  useLazyGetAllRoomsQuery,
  useBookRoomMutation,
  useLazyGetRoomDetailQuery,
} = roomApiSlice;
