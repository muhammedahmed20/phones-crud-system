import React from 'react'
import { useLocation } from 'react-router-dom'
import { FiShoppingBag, FiGrid, FiUsers, FiSettings } from 'react-icons/fi'

export default function Sidebar() {
  const location = useLocation()
  const { name, letter } = location.state || { name: '', letter: '' }
  
  return (
    <div className="w-64 h-dvh bg-linear-to-b from-white to-gray-50 border-r border-gray-200/60 hidden md:flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200/60">
        <div className="flex flex-col items-center gap-3">
          <div className='relative'>
            <div className='w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-light shadow-lg'>
              {letter}
            </div>
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white'></div>
          </div>
          <div className="text-center">
            <p className='text-xs text-gray-500 mb-1'>Welcome back,</p>
            <p className='text-base font-medium text-gray-900 capitalize'>{name}</p>
            <p className='text-xs text-gray-400 mt-1'>Mobile Store Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-linear-to-r from-blue-50 to-blue-100 text-blue-600 cursor-pointer">
            <FiGrid className="text-lg" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
            <FiShoppingBag className="text-lg" />
            <span className="text-sm font-medium">Products</span>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
            <FiUsers className="text-lg" />
            <span className="text-sm font-medium">Customers</span>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
            <FiSettings className="text-lg" />
            <span className="text-sm font-medium">Settings</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
