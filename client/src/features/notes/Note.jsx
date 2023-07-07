import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {selectNoteById}from './notesApiSlice'
import {FaRegEdit} from "react-icons/fa"
const Note=({noteId})=>{
    const note=useSelector(state=>selectNoteById(state,noteId))
    const navigate=useNavigate()

    if(note){
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dashboard/notes/${noteId}`)

        return (
            <tr className="">
                <td className="text-center border border-teal-500">
                    {note.completed
                        ? <span className="font-bold  text-green-600">Completed</span>
                        : <span className="font-bold  text-red-600">Open</span>
                    }
                </td>
                <td className="max-w-screen-md:hidden border border-teal-500 p-1.5 text-left">{created}</td>
                <td className="max-w-screen-md:hidden border border-teal-500 p-1.5 text-left">{updated}</td>
                <td className="border border-teal-500 p-1.5 text-left">{note.title}</td>
                <td className="max-w-screen-md:hidden border border-teal-500 p-1.5 text-left">{note.text}</td>
                <td className="border border-teal-500 p-1.5 text-left">{note.username}</td>

                <td className="border border-teal-500 p-1.5 text-center">
                    <button
                        onClick={handleEdit}
                    >
                        <FaRegEdit className='text-2xl'/>
                    </button>
                </td>
            </tr>
        )
    }else return null
}
 
export default Note