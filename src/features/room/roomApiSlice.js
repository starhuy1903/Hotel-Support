import { apiSlice } from "../../app/api/apiSlice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (id) => ({
        url: `/hotel/${id}/room`,
      }),
    }),
  }),
});

export const { useLazyGetAllRoomsQuery } = roomApiSlice;
