import React from 'react'
import { useGetNotesQuery } from '../notes/notesApiSlice'
import { useNavigate } from 'react-router-dom'
import Note from './Note'
import useAuth from '../../hooks/useAuth'
const NotesList = () => {
  const {
    data:notes,
    isLoading,
    isError,
    isSuccess,
    error
  }=useGetNotesQuery('notesList',{
    pollingInterval:15000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true})
  const {username,isManager,isAdmin}=useAuth()
  let content
  const navigate=useNavigate();
    
  const goToCreateNote=()=>navigate('new')
  let controlBox=(
    <div className='bg-gray-200 w-full rounded-md  md:fixed right-6 custom-top p-1.5 md:h-60 md:w-1/5'>
        <button
          className='text-black text-lg bg-yellow-400 w-full h-8 rounded-md'
          onClick={goToCreateNote}
        >New Note</button>
    </div>
  )
  if(isLoading) content=<p>Loading....</p>
  if(isError) content=<p>{error?.data?.message}</p>
  if(isSuccess){
    const {ids,entities}=notes
    console.log(notes)
    let filterId;
    if(isAdmin || isManager){
      filterId=[...ids]
    }
    else{
      filterId=ids.filter(noteId => entities[noteId].username === username);
    }
    const tableContent=ids?.length && filterId.map(noteId=><Note key={noteId} noteId={noteId}/> )

    content=(
      <>
      {controlBox}
      <table className='table-auto w-full border border-teal-500 p-1.5 text-left'>
        <thead>
          <tr>
            <th className='border border-teal-500 p-1.5 text-center'>Status</th>
            <th className=' border border-teal-500 p-1.5 text-left max-w-screen-md:hidden'>Created</th>
            <th className='max-w-screen-md:hidden border border-teal-500 p-1.5 text-left'>Updated</th>
            <th className='border border-teal-500 p-1.5 text-center'>Title</th>
            <th className='max-w-screen-md:hidden border border-teal-500 p-1.5 text-left'>Text</th>
            <th className='border border-teal-500 p-1.5 text-center'>Owner</th>
            <th className='border border-teal-500 p-1.5 text-center'>Edit</th>
          </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
      </table>
      </>
    )
  }
  return (
    <div className='pt-8'>{content}</div>
  )
}

export default NotesList