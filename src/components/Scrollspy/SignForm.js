import React, { useState } from 'react'
import '../../App.css'
import Register from '../Register/Register';

const SignForm = () => {
  const [rshow, setrModalShow] = useState(false);
  const sshow = () => {
    setrModalShow(true);
  };
  const rhide = () => {
    setrModalShow(false);
  };
  return (
    <div className='sign-form'>
      <div className='sign-form-1'>
        Sign up to get your ideas
      </div>
      <div className='sign-form-2'>
        <button onClick={sshow} className="header-ua-signin cd-5">Sign Up</button>
        <Register show={rshow} onHide={rhide}></Register>
      </div>
    </div>
  )
}

export default SignForm
