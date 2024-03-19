import { emptySplitApi } from './emptySplitApi'

export const vehicleApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyVehicleList: builder.query<any, void>({
      query: () => {
        return {
          method: "GET",
          url: "/vehicles",
        };
      },
      providesTags: ["MY_VEHICLES"],
    }),

    addVehicle: builder.mutation<any,any>({
      query:({name})=>{
        return {
          method:"POST",
          url:"/add-vehicle",
          body:{
            name
            //other keys
          }
        }
      },
      invalidatesTags:["MY_VEHICLES"]
    })

  
   
  }),
});

export const {
 useGetMyVehicleListQuery

} = vehicleApi
