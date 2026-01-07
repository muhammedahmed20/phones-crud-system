import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FiTrash2, FiEdit2, FiPlus, FiSmartphone } from 'react-icons/fi'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import Sidebar from './Sidebar'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'

export default function Dashboard() {
  const location = useLocation()
  const { name, letter } = location.state || { name: '', letter: '' }
  const [editIndex, setEditIndex] = useState()

  const [phones, setPhones] = useState([
    { name: 'iPhone X', price: 500, quantity: 1 },
    { name: 'Samsung Galaxy S21', price: 600, quantity: 1 },
    { name: 'Google Pixel 6', price: 550, quantity: 10 },
    { name: 'OnePlus 9', price: 500, quantity: 1 },
    { name: 'Oppo F9', price: 500, quantity: 1 },
  ])

  const phoneName = useRef()
  const phonePrice = useRef()
  const phoneQty = useRef()
  const editName = useRef()
  const editPrice = useRef()
  const editQty = useRef()

  const addNewPhone = () => {
    let newPhone = {
      name: phoneName.current.value,
      price: +phonePrice.current.value,
      quantity: +phoneQty.current.value,
    }

    let copy = [...phones]
    copy.push(newPhone)
    setPhones(copy)
    document.getElementById('addPhoneModal').close()
    toast.success('Phone added successfully!')

    phoneName.current.value = "";
    phonePrice.current.value = "";
    phoneQty.current.value = "";
  }

  let removePhone = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: '#ffffff',
      color: '#1f2937'
    }).then((result) => {
      if (result.isConfirmed) {
        let copy = [...phones]
        copy.splice(index, 1)
        setPhones(copy)
        toast.success('Phone deleted successfully!')
      }
    })
  }

  let saveEdit = () => {
    let copy = [...phones]
    let newPhone = {
      name: editName.current.value,
      price: +editPrice.current.value,
      quantity: +editQty.current.value,
    }
    copy[editIndex] = newPhone
    setPhones(copy)
    document.getElementById('editPhoneModal').close()
    toast.success('Phone updated successfully!')
  }

  

  return (
    <div className="w-full flex h-dvh bg-gray-50">
      <Toaster position="top-right" />
      
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200/60 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light text-gray-900">Mobile Collection</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your inventory efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              
              <button
                className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                onClick={() => document.getElementById('addPhoneModal').showModal()}
              >
                <FiPlus className="text-lg" />
                Add Phone
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Phones</p>
                  <p className="text-3xl font-light text-gray-900">{phones.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <FiSmartphone className="text-xl text-blue-600" />
                </div>
              </div>
            </div>

          </div>

          {/* Phones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phones.length === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <div className="text-6xl mb-4">📵</div>
      <p className="text-lg font-medium text-gray-500">
        لا يوجد هواتف
      </p>
    </div>
  ) : (phones.map((phone, index) => (
              <div
                key={index}
                className='group bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300'
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 flex items-center justify-center">
                    <div className="text-6xl text-gray-300 group-hover:text-blue-300 transition-colors">
                      📱
                    </div>
                  </div>

                  <div className="w-full text-center">
                    <h3 className='text-lg font-medium text-gray-900 mb-1'>{phone.name}</h3>
                    <p className="text-sm text-gray-500">Smartphone</p>
                  </div>

                  <div className="w-full grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-linear-to-br from-blue-50 to-blue-100">
                      <p className='text-xs text-blue-600 mb-1'>Price</p>
                      <p className='text-base font-medium text-gray-900'>${phone.price}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-linear-to-br from-amber-50 to-amber-100">
                      <p className='text-xs text-amber-600 mb-1'>Quantity</p>
                      <p className={`text-base font-medium ${phone.quantity < 3 ? 'text-red-600' : 'text-gray-900'}`}>
                        {phone.quantity}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100">
                      <p className='text-xs text-emerald-600 mb-1'>Total</p>
                      <p className='text-base font-medium text-gray-900'>
                        ${phone.price * phone.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    <button 
                      onClick={() => removePhone(index)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-50 to-red-100 text-red-600 rounded-lg hover:shadow-sm transition-all"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                    <button 
                      onClick={() => {
                        editName.current.value = phone.name;
                        editPrice.current.value = phone.price;
                        editQty.current.value = phone.quantity;
                        setEditIndex(index);
                        document.getElementById('editPhoneModal').showModal();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-50 to-blue-100 text-blue-600 rounded-lg hover:shadow-sm transition-all"
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <dialog id="addPhoneModal" className="modal">
        <div className="modal-box p-0 max-w-md rounded-2xl overflow-hidden bg-white border border-gray-200/60 shadow-2xl">
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <FiPlus className="text-2xl text-white" />
              </div>
              <h3 className="font-light text-2xl text-gray-900 mb-2">Add New Phone</h3>
              <p className="text-gray-600">Enter phone details</p>
            </div>
            
            <div className="space-y-4">
              <input 
                ref={phoneName} 
                type="text" 
                className='w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
                placeholder='Phone name' 
              />
              <input 
                ref={phonePrice} 
                type="number" 
                className='w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
                placeholder='Price' 
              />
              <input 
                ref={phoneQty} 
                type="number" 
                className='w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
                placeholder='Quantity' 
              />
            </div>
            
            <div className="mt-8 flex gap-3">
              <form method="dialog" className="flex-1">
                <button className="w-full py-3.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  Cancel
                </button>
              </form>
              <button 
                className="flex-1 py-3.5 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-md transition-all duration-300"
                onClick={addNewPhone}
              >
                Add Phone
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="editPhoneModal" className="modal">
        <div className="modal-box p-0 max-w-md rounded-2xl overflow-hidden bg-white border border-gray-200/60 shadow-2xl">
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <FiEdit2 className="text-2xl text-white" />
              </div>
              <h3 className="font-light text-2xl text-gray-900 mb-2">Edit Phone</h3>
              <p className="text-gray-600">Update phone details</p>
            </div>
            
            <div className="space-y-4">
              <input 
                ref={editName} 
                type="text" 
                className='w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
                placeholder='Phone name' 
              />
              <input 
                ref={editPrice} 
                type="number" 
                className='w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
                placeholder='Price' 
              />
              <input 
                ref={editQty} 
                type="number" 
                className='w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder-gray-400'
                placeholder='Quantity' 
              />
            </div>
            
            <div className="mt-8 flex gap-3">
              <form method="dialog" className="flex-1">
                <button className="w-full py-3.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  Cancel
                </button>
              </form>
              <button 
                className="flex-1 py-3.5 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-md transition-all duration-300"
                onClick={saveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}
