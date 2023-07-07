import React,{useEffect, useState} from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router'
import { FaSave } from 'react-icons/fa'
const NewNoteForm = ({users}) => {
  console.log(users)

  const [addNewNote,{
    isLoading,
    isSuccess,
    isError,
    error
  }]=useAddNewNoteMutation()

  const navigate=useNavigate()

  const [title,setTitle]=useState('');
  const [text,setText]=useState('');
  const [userID,setUserID]=useState(users[0].id)

  useEffect(()=>{
    if(isSuccess){
      setText('');
      setText('');
      setUserID('');
      navigate('/dashboard/notes')
    }
  },[isSuccess,navigate])

  const onTitleChanged=e=>setTitle(e.target.value)
  const onTextChanged=e=>setText(e.target.value)
  const onUserIdChanged = e => setUserID(e.target.value)

  const canSave = [title, text, userID].every(Boolean) && !isLoading

  const onSaveNoteClicked=async(e)=>{
    e.preventDefault();
    if(canSave){
      await addNewNote({user:userID,title,text})
    }
  }
  const options=users.map(user=>(
    <option
      key={user.id}
      value={user.id}
    >
      {user.username}
    </option>
  ))
  const errClass = isError ? "errmsg p-1.5 text-center rounded-md" : "hide"
  const validTitleClass = !title ? 'border-2 rounded-md border-rose-500 outline outline-rose-500' : 'outline-2 outline-lime-500'
  const validTextClass = !text ? 'border-2 rounded-md border-rose-500 outline outline-rose-500' : 'outline-2 outline-lime-500'
  return (
    <>
    <p className={errClass}>{error?.data?.message}</p>
           <form className='flex flex-col gap-2 flex-nowrap p-4' onSubmit={onSaveNoteClicked}>
                
                    <h2 className='text-xl text-center'>New Note</h2>
                    
                
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
                <label className="" htmlFor="username">
                    ASSIGNED TO:</label>
                    <select
                    id="username"
                    name="username"
                    className={`text-black form__select `}
                    
                    
                    value={userID}
                    onChange={onUserIdChanged}
                >
                  {options}
                </select>
                <div className="pt-4 ">
                        <button
                            className="bg-lime-500 p-2 w-full text-white rounded-md hover:border-2 border-lime-800"
                            title="Save"
                            disabled={!canSave}
                            
                        >
                          <p className='flex text-lg justify-center'>
                            Save&nbsp;
                          <FaSave className='text-2xl '/>
                          </p>
                        </button>
                    </div>
          </form>
    
    </>
  )
}

export default NewNoteForm