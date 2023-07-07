import React, { useEffect, useState } from 'react'
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FaSave, FaTrash } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
const EditNoteForm = ({ note, users }) => {
    const { isManager, isAdmin } = useAuth()
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()
    const [deleteNote, {
        isLoading: isDelLoading,
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delError
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dashboard/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })
    const errClass = (isError || isDelError) ? "errmsg p-1.5 text-center rounded-md" : "hide"
    const validTitleClass = !title ? 'border-2 rounded-md border-rose-500 outline outline-rose-500' : ''
    const validTextClass = !text ? 'border-2 rounded-md border-rose-500 outline outline-rose-500' : ''

    const errContent = (error?.data?.message || delError?.data?.message) ?? ''

    let DeleteButton = null
    if (isAdmin || isManager) {
        DeleteButton = (
            <button
                className="bg-rose-600 p-2  text-white rounded-md "
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <p className='flex text-lg justify-center'>
                    Delete&nbsp;

                    <FaTrash className='text-2xl' />
                </p>
            </button>
        )
    }
    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="flex flex-col gap-2 flex-nowrap p-4" onSubmit={e => e.preventDefault()}>

                <h2 className='text-xl text-center'>Edit Note</h2>

                <label className="" htmlFor="title">
                    Title:</label>
                <input
                    className={` p-1 text-black rounded-md border border-cyan-500 ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label className="" htmlFor="text">
                    Text:</label>
                <textarea
                    className={` p-1 text-black rounded-md border border-cyan-500 ${validTextClass}`}
                    id="text"
                    name="text"
                    type="text"
                    autoComplete="off"
                    value={text}
                    onChange={onTextChanged}
                />
                <label className="form__label form__checkbox-container" htmlFor="note-completed">
                    WORK COMPLETE:
                    <input
                        className="form__checkbox mr-2"
                        id="note-completed"
                        name="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={onCompletedChanged}
                    />
                </label>
                <label className="" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className={`text-black form__select `}


                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
                <div>
                    <p>Note Created : {created}</p>
                    <p>Note Updated : {updated}</p>
                </div>
                <div className="pt-4 flex justify-around">
                    <button
                        className="bg-lime-500 p-2  text-white rounded-md "
                        title="Save"
                        onClick={onSaveNoteClicked}
                        disabled={!canSave}
                    >
                        <p className='flex text-lg justify-center'>
                            Save&nbsp;
                            <FaSave className='text-2xl ' />
                        </p>
                    </button>
                   
                    {DeleteButton}
                </div>

            </form>
        </>
    )

    return content
}

export default EditNoteForm