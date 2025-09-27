/* eslint-disable no-unused-vars */
// import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { register } from '../redux/authSlice';
import { useNavigate } from "react-router-dom"
import { auth, googleProvider } from "../firebase.js"
import { signInWithPopup } from "firebase/auth"

function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    dispatch(register(formValue))
    setFormValue({
      email: "",
      password: ""
    });
    navigate("/login")
  }



  const handleSignWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      const response = await fetch("http://localhost:3500/user/signWithGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
        // credentials:"include"
      }
      )
      const userData = await response.json()
      if (response.ok) {
        navigate("/")
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="max-w-[400px] min-h-[460px] mx-auto my-10 px-10 py-10 bg-[#ecf0f3] rounded-[15px] shadow-[13px_13px_20px_#cbced1,-13px_-13px_20px_#fff]">
      {/* Logo */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Welcome</h3>
      </div>

      {/* Form */}
      <form className="mt-3" onSubmit={handleSignUp}>
        {/* Email */}
        <div className="flex items-center mb-4 p-0.5 pl-3 rounded-[20px] shadow-[inset_8px_8px_8px_#cbced1,inset_-8px_-8px_8px_#fff]">
          <span className="far fa-user text-gray-600 mr-2"></span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formValue.email}
            onChange={onChange}
            required
            className="w-full bg-transparent outline-none text-gray-600 text-base py-2 px-2"
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-4 p-0.5 pl-3 rounded-[20px] shadow-[inset_8px_8px_8px_#cbced1,inset_-8px_-8px_8px_#fff]">
          <span className="fas fa-key text-gray-600 mr-2"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={formValue.password}
            onChange={onChange}
            minLength="4"
            maxLength="20"
            required
            className="w-full bg-transparent outline-none text-gray-600 text-base py-2 px-2"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-10 mt-3 rounded-full bg-[#2e3577] text-white font-medium tracking-[1.3px] shadow-[3px_3px_3px_#b1b1b1,-3px_-3px_3px_#fff] hover:bg-[#1c5f81] transition-colors"
        >
          SignUp
        </button>
      </form>



      <div className="relative flex justify-center my-6 text-gray-400 z-10">
        <span className="relative inline-block bg-[#ecf0f3] px-3 z-10
    before:content-[''] before:absolute before:top-1/2 before:left-[-140px] before:w-[130px] before:h-px before:bg-gray-300 before:-z-10
    after:content-[''] after:absolute after:top-1/2 after:right-[-140px] after:w-[130px] after:h-px after:bg-gray-300 after:-z-10"
        >
          or
        </span>
      </div>

      <div
        onClick={handleSignWithGoogle}
        className="flex justify-center items-center h-[37px] rounded-md mx-auto mb-8 max-w-[300px] shadow-[3px_3px_3px_#b1b1b1,-3px_-3px_3px_#fff]"
      >
        <img
          src="/google.png"
          width="25"
          height="26"
          className="rounded-md mx-1"
          alt="Google"
        />
        <button
          className="px-5 py-2 text-black text-[15px] font-medium bg-transparent outline-none border-none"
        >
          Continue with Google
        </button>
      </div>

      <div className="text-center text-sm">
        <p >Already have account? </p> <a href="/login" className='text-[#03A9F4] hover:text-[#039BE5] text-sm'>Login</a>
      </div>
    </div>
  )
}

export default SignUp