import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import usePersist from '../../hooks/usePersist'
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist,setPersist]=usePersist();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, password])


  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const { accessToken } = await login({ email, password }).unwrap()
          dispatch(setCredentials({ accessToken }))
          setEmail('')
          setPassword('')
          navigate('/dashboard')
      } catch (err) {
          if (!err.status) {
              setErrMsg('No Server Response');
          } else if (err.status === 400) {
              setErrMsg('Missing email or Password');
          } else if (err.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg(err.data?.message);
          }
          errRef.current.focus();
      }
  }

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handlePersistToggle=(e)=>setPersist(prev=>!prev)
  const errClass=errMsg ? "errmsg p-1.5 text-center rounded-md mb-2" : "hide"
  
  
  if (isLoading) return <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
  <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
</div>



  let content = (
    // <form onSubmit={handleSubmit}>
    //     <input
    //     type="text"
    //     onChange={handleUserInput}
    //     value={email}
    //     ref={userRef}
    //     autoComplete='off'
    //     id="email"
    //     required
    //     />
    //     <input
    //     type="password"
    //     onChange={handlePwdInput}
    //     value={password}
    //     ref={userRef}
    //     autoComplete='off'
    //     id="password"
    //     required
    //     />
    // </form>
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <p className='text-5xl mb-10 text-center md:text-left'>Login</p>
        <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
        <form onSubmit={handleSubmit}>
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" autoComplete='off' value={email} onChange={handleUserInput} type="text" ref={userRef} placeholder='email' required/>
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded  mt-4" autoComplete='off' value={password} onChange={handlePwdInput} type="password" ref={userRef} placeholder='Password'required />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input 
            className="mr-1" 
            type="checkbox" 
            checked={persist}
            onChange={handlePersistToggle}
            />
            <span>Trust this Device</span>
          </label>
          {/* <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a> */}
        </div>
        <div className="text-center md:text-left">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
        </div>
        </form>
        <div className="mt-4 font-semibold text-md  text-slate-500 text-center md:text-left">
         <Link to='/'>Back To Home</Link>
        </div>
      </div>
    </section>
  )
  return content
}

export default Login