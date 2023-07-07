import {
    createSelector,
    createEntityAdapter
}from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter=createEntityAdapter({})

const initialState=usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            
        })
        
})})
export const {
    useGetUsersQuery,
} = usersApiSlice
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()


const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data 
)


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)