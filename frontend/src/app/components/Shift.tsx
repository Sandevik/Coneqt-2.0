import { Shift as _Shift } from '@/types/Shift';
import Link from 'next/link';
import React from "react"
import { RiRestartLine } from "react-icons/ri";



export default function Shift({shift, selectedShift, setSelectedShift}: { shift: _Shift, selectedShift: _Shift | null, setSelectedShift: React.Dispatch<React.SetStateAction<_Shift | null>>}) {
  const percentage: number = (shift.shiftCompletionPercentage || 0) > 100 ? 100 : (shift.shiftCompletionPercentage || 0) < 0 ? 0 : (shift.shiftCompletionPercentage || 0);

  const selectShift = () => {
    if (selectedShift === null) {
      setSelectedShift(shift)
    } else {
      setSelectedShift(null)
      setTimeout(()=>{setSelectedShift(shift)}, 250)
    }
  }

  return (
    <div onClick={() => selectShift()} className={`relative z-30 w-full p-1 h-24 rounded-md flex flex-col justify-between border-2 transition-all ${selectedShift?.uuid === shift.uuid ? "border-gray-600 opacity-100 bg-gray-300 pointer-events-none px-2" : "border-transparent bg-gray-200 cursor-pointer pointer-events-auto"}`}>
      <RiRestartLine className='absolute top-1 right-1'/>
      <div className="text-xl">{shift.date}</div>
      <div>{shift.note}</div>
    </div>  
  )
}
