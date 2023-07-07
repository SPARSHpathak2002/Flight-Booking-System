import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAddNewUserMutation } from '../auth/authApiSlice'
import toast, { Toaster } from 'react-hot-toast';
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Signup = () => {
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [email,setEmail]=useState('')
  const [validPassword, setValidPassword] = useState(false)
  //console.log(roles)
  useEffect(() => {
    setValidUsername(USER_REGEX.test(name))
  }, [name])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setEmail('')
      toast.success(`Account Created for ${name}`)
      navigate('/login')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
  const  onEmailChanged=e=>setEmail(e.target.value)
 
    // const onRolesChanged = e => {
    //     const values = Array.from(
    //         e.target.selectedOptions, //HTMLCollection 
    //         (option) => option.value
    //     )
    //     setRoles(values)
    // }
  
    //const canSave = [validUsername, validPassword].every(Boolean) && !isLoading
    const onSaveUserClicked = async (e) => {
      e.preventDefault()
      
      // if (canSave) {
          console.log("clicked")
            await addNewUser({ username:name, email, password})
            navigate('/login')
        
    }

    //console.log(roles)
    if (isLoading) return (<div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
<span className="loading loading-spinner loading-lg"></span></div>)
    
    const errClass = isError ? "alert alert-error" : "hide"
    const validUserClass = !validUsername ? 'border-2 rounded-md border-rose-500 outline outline-rose-500' : 'outline-2 outline-lime-500'
    const validPwdClass = !validPassword ? 'border-2 rounded-md border-rose-500 outline outline-rose-500' : 'outline-2 outline-lime-500'
    


    const content = (
        <>
        <Toaster/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

           <div className={errClass}>
  
  <span>{error?.data?.message}</span>
</div>
           <form className='space-y-6' onSubmit={onSaveUserClicked}>
                
                   
                
                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
                    Name: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />
                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                    Email: </label>
                <input
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />
  
               


                <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
                    Password <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />


               
               
                <div className="pt-4 ">
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            title="Save"
                            // disabled={!canSave}
                            
                        >
                          <p className=''>
                            Save&nbsp;
                          
                          </p>
                        </button>
                    </div>
           </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Have an Account ?{' '}
            <Link to='/login' href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
          
        </>
    )

    return content
}

export default Signup