import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CiTrash } from 'react-icons/ci'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosPhonePortrait } from 'react-icons/io'
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
    document.getElementById('my_modal_2').close()
    toast.success('your phone added Successfully!')

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then((result) => {

      if (result.isConfirmed) {
        let copy = [...phones]
        copy.splice(index, 1)
        setPhones(copy)


        toast.success('The phone has been deleted. Successfully!')

      } else if (result.isDismissed) {
        toast.error('Your phone is safe 🙂!')
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
    document.getElementById('my_modal_2_2').close()
    toast.success('your phone updated Successfully!')

    editName.current.value = "";
    editPrice.current.value = "";
    editQty.current.value = "";
  }

  return (
    <div className="w-full flex h-dvh">
      <Toaster />

      <Sidebar />

      <div className="w-full flex flex-col overflow-auto">
        <div className="flex flex-col gap-7 p-6">
          <h1 className='text-[32px]'>Our Mobile Collection</h1>

          <div className="flex flex-col gap-7">
            <div className="flex justify-end">
              <button
                className='btn bg-blue-500 text-white'
                onClick={() => document.getElementById('my_modal_2').showModal()}
              >
                Add New Phone
              </button>
            </div>


            <div className="grid grid-cols-4 gap-5">
              {phones.map((el, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center col-span-1 row-span-1 p-4 bg-gray-100 rounded-[10px] gap-7 shadow-[0_0_10px_#7f7c7c75]'
                >
                  <IoIosPhonePortrait className='text-[150px]' />

                  <div className="w-full flex flex-col items-center gap-5">
                    <h3 className='text-[20px] font-semibold'>{el.name}</h3>

                    <div className="w-full flex justify-between">
                      <div className="w-1/3 flex flex-col items-center">
                        <h5 className='text-[10px] font-medium'>price</h5>
                        <h5 className='text-[15px] font-bold'>${el.price}</h5>
                      </div>
                      <div className="w-1/3 flex flex-col items-center">
                        <h5 className='text-[10px] font-medium'>qty</h5>
                        <h5 className='text-[15px] font-bold text-success'>{el.quantity}</h5>
                      </div>
                      <div className="w-1/3 flex flex-col items-center">
                        <h5 className='text-[10px] font-medium'>total</h5>
                        <h5 className='text-[15px] font-bold'>
                          ${el.price * el.quantity}
                        </h5>
                      </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3">
                      <button className='btn col-span-1 row-span-1 bg-red-200' onClick={removePhone}>
                        <CiTrash className='text-red-700' />
                      </button>
                      <button className='btn col-span-1 row-span-1 btn-soft btn-warning' onClick={() => {
                        let phone = phones[index]
                        editName.current.value = phone.name;
                        editPrice.current.value = phone.price;
                        editQty.current.value = phone.quantity;
                        document.getElementById('my_modal_2_2').showModal()
                        setEditIndex(index)
                      }}>
                        <FaRegEdit className='text-yellow-700' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New Phone</h3>
          <div className='w-full flex flex-col gap-3'>
            <input ref={phoneName} type="text" className='input w-full outline-none focus:border-blue-200' placeholder='Enter the new phone name' />
            <input ref={phonePrice} type="text" className='input w-full outline-none focus:border-blue-200' placeholder='Enter the new phone price' />
            <input ref={phoneQty} type="text" className='input w-full outline-none focus:border-blue-200' placeholder='Enter the new phone qty' />
            <button className='w-full btn bg-success text-white' onClick={addNewPhone}>
              Add New
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_2_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">update Phone</h3>
          <div className='w-full flex flex-col gap-3'>
            <input ref={editName} type="text" className='input w-full outline-none focus:border-blue-200' placeholder='Enter the new name' />
            <input ref={editPrice} type="text" className='input w-full outline-none focus:border-blue-200' placeholder='Enter the new price' />
            <input ref={editQty} type="text" className='input w-full outline-none focus:border-blue-200' placeholder='Enter the new qty' />
            <button className='w-full btn bg-info text-white' onClick={saveEdit}>
              update
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </div>
  )
}
