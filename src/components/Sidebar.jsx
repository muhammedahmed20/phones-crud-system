import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const { name, letter } = location.state || { name: '', letter: '' }
  return (
    <div className="w-64 hidden md:flex flex-col items-center gap-12 bg-gray-200">
      <div className="container py-6 flex flex-col items-center gap-2">
        <div className='flex justify-center items-center text-[36px] border border-blue-400 text-white w-20 h-20 rounded-full bg-blue-200'>
          {letter}
        </div>
        <div className="flex flex-col">
          <p className='capitalize text-[10px] text-blue-400 text-center'>welcome,</p>
          <p className='capitalize text-[12px] font-bold text-center'>{name}</p>
        </div>
      </div>
      <div className='bg-white py-2 px-10 rounded-xl text-blue-400'>
        <h3>Dashboard</h3>
      </div>
    </div>
  )
}
