import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"




export const flightApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getFlights:builder.query({
            query:()=>({
                url:'/flights',
                method:'GET',
            })
        ,
        
        providesTags: (result, error, arg) => {
            if (result?.ids) {
                return [
                    { type: 'Flight', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Note', id }))
                ]
            } else return [{ type: 'Flight', id: 'LIST' }]
        }
    }),

        addFlight:builder.mutation({
            query:(flightdetail)=>({
                url:'/flights',
                method:'POST',
                body:{...flightdetail,}
            }),
            invalidatesTags:[
                {type:'Flight',id:"LIST"}
            ]
        }),
        bookFlight:builder.mutation({
            query:(flightdetail)=>({
                url:'/flights/book',
                method:'POST',
                body:{...flightdetail,}
            }),
            invalidatesTags:[
                {type:'Flight',id:"LIST"}
            ]
        }),
        updateFlight:builder.mutation({
            query:(updateddetails)=>({
                url:'/flights',
                method:'PATCH',
                body:{...updateddetails,}
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Flight', id: arg.id }
            ]
           
        }),
        deleteFlight: builder.mutation({
            query: ({id}) => ({
                url: '/flights',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Flight', id: arg.id }
            ]
        }),
    })
})
export const{
    useGetFlightsQuery,
    useAddFlightMutation,
    useUpdateFlightMutation,
    useDeleteFlightMutation,
    useBookFlightMutation,
}=flightApiSlice



//getSelectors creates these selectors and we rename them with aliases using destructuring
