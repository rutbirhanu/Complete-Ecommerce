/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import "./auth.css"
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login} from '../redux/authSlice';
import { useNavigate } from "react-router-dom"
import { auth, googleProvider } from "../firebase.js"
import { signInWithPopup } from "firebase/auth"

function LogIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState({
    email: "",
    password:""
  })
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }


  const handleLogin =  async (e) => {
    e.preventDefault()
    dispatch(login(formValue))

    const response = await fetch("http://localhost:3500/product/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const userData = await response.json()
    console.log(userData.message.notification)
    navigate("/")
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
 
    <div className ="wrapper">
        <div className ="logo">
          <h3>Login</h3>
        </div>
       
        <form className ="p-3 mt-3" onSubmit={handleLogin}>
            <div className ="form-field d-flex align-items-center">
                <span className ="far fa-user"></span>
                <input type="email" name="email" id="email" placeholder="Email" onChange={onChange} value={formValue.email} required/>
            </div>
            <div className ="form-field d-flex align-items-center">
                <span className ="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" onChange={onChange} value={formValue.password} minLength="4" maxLength="20" required/>
            </div>
            <button className ="btn mt-3" type="submit">Continue</button>
      </form >
      <div className="divider">
            <span>or</span>
          </div>
      <div className="google-btn" onClick={handleSignWithGoogle}>
            <img src="/google.png" width="25px" height="26px" style={{ borderRadius: "6px", margin: "0 3px" }} />
            <button>Continue with Google</button>
          </div>
        <div className ="text-center fs-6">
            <p >Don&apos;t have an account? </p> <a href="/sign-up">Sign up</a>
        </div>
      </div>
  )
}

export default LogIn