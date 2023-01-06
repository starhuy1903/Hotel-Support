import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (info) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...info },
      }),
    }),
    getProfile: builder.query({
      query: () => "user/me"
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: `user/me`,
        method: "PUT",
        body: { ...profile },
      })
    }),
    getHistory: builder.query({
      query: () => "user/history",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "DELETE"
      })
    })
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLazyGetProfileQuery, 
  useUpdateProfileMutation, 
  useLazyGetHistoryQuery,
  useLogoutMutation } = authApiSlice;
