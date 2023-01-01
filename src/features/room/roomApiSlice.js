import { apiSlice } from "../../app/api/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomWithFilter: builder.query({
      query: (params) => ({
        url: "/room/filter",
        params: params
      }),
    }),

    getAllRooms:builder.query({
        query: () => ({
          url: "/room",
        }),
      }),
  }),
});

export const { useLazyGetRoomWithFilterQuery, useLazyGetAllRoomsQuery } = roomApiSlice;
