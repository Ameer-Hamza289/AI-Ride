import { emptySplitApi } from './emptySplitApi'

export interface LoginArgs {
  username: string
  password: string
}

export interface SignUpArgs {
  username: string
  password: string
  firstName: string
  lastName: string
  address:string
  state:string 
  city:string 
}

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<any, SignUpArgs>({
      query: ({ username, password, firstName, lastName, address, state, city }) => {
        return {
          method: "POST",
          url: "/auth/register",
          body: {
            username,
            password,
            firstName,
            lastName ,
            address,
            state ,
            city
          },
        };
      },
      invalidatesTags: ["Profile"],
    }),

    login: builder.mutation<any, LoginArgs>({
      query: ({ username, password }) => ({
        method: "POST",
        url: "/auth/login",
        body: {
          username,
          password,
        },
      }),
      invalidatesTags:["Profile"]
    }),
   
    getMyProfile: builder.query<any, void>({
      query: () => `/auth/profile`,
      providesTags: ["Profile"],
    }),

    getUserById: builder.query<any, string>({
      query: (userId) => `auth/user/${userId}`,
      providesTags: ["USER_BY_ID"],
    }),
   
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useGetUserByIdQuery

} = userApi
