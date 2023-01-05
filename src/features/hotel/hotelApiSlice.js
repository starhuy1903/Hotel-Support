import { apiSlice } from "../../app/api/apiSlice";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotelWithFilter: builder.query({
      query: (params) => ({
        url: "/hotel/filter",
        params: params,
      }),
    }),

    getAllHotels: builder.query({
      query: () => ({
        url: "/hotel",
      }),
    }),

    getHotelDetail: builder.query({
      query: (id) => ({
        url: `/hotel/${id}`,
      }),
    }),
  }),
});

export const {
  useLazyGetHotelWithFilterQuery,
  useLazyGetAllHotelsQuery,
  useLazyGetHotelDetailQuery,
} = hotelApiSlice;