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
    <div className='w-full h-dvh flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      <Toaster position="top-center" />
      <div className='w-full max-w-md p-8 space-y-8'>
        <div className='text-center'>
          <div className='relative inline-block'>
            <div className='w-32 h-32 rounded-full border-4 border-dashed border-blue-200/60 animate-spin-slow'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-5xl font-light shadow-xl'>
                  {letter || "👋"}
                </div>
              </div>
            </div>
          </div>
          <h1 className='text-3xl font-light text-gray-900 mt-8 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Enter your name to access the dashboard</p>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            ref={inputName} 
            onChange={handleChange} 
            className='w-full px-5 py-3.5 rounded-xl border border-gray-300 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
            placeholder='Enter your name' 
          />
          <button 
            className='w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-300'
            onClick={goToDashoard}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
