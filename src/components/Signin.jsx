import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Signin() {

  const inputName = useRef(null)
  const [letter, setLetter] = useState("")
  const navigate = useNavigate()

  const handleChange = () => {
    const value = inputName.current.value.trim()
    setLetter(value ? value.charAt(0).toUpperCase() : "")
  }

  const goToDashoard = () => {
    if (inputName.current.value.trim() !== "") {
      navigate('/Dashboard', {
        state: {
          name: inputName.current.value,
          letter: letter
        }
      })
    } else {
      toast.error("Please enter your name")
    }
  }

  return (
    <div className='w-full h-dvh  flex flex-col gap-6 justify-center items-center p-10'>
      <Toaster />
      <div className='flex justify-center items-center w-30 h-30 rounded-full border-2 border-dotted border-blue-500'>
        <div className='flex justify-center items-center text-[48px] text-white w-28 h-28 rounded-full bg-blue-200'>
          {letter}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <input type="text" ref={inputName} onChange={handleChange} className='input outline-none focus:border-blue-200' placeholder='Enter your name' />
        <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer' onClick={goToDashoard}>Continue</button>
      </div>
    </div>
  )
}
