import { apiSlice } from "../../app/api/apiSlice";
import { logout,setCredentials } from "./authSlice";


export const authApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:credentials=>({
                url:'/auth',
                method:'POST',
                body:{...credentials}
            })
        }),
        sendLogout:builder.mutation({
            query:()=>({
                url:'/auth/logout',
                method:'POST',
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){ //RTK query inBuild function
                try{
                    await queryFulfilled
                    dispatch(logout()); // action dispatched for logout
                    dispatch(apiSlice.util.resetApiState()) //clears all cache of data from apislice
                }catch(err){
                    console.log(err);
                }
            }

        }),
        refresh:builder.mutation({
            query:()=>({
                url:'/auth/refresh',
                method:'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    //console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
    })
})
export const{
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useAddNewUserMutation
}=authApiSlice

