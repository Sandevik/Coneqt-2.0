import { Shift as _Shift } from '@/types/Shift';
import Link from 'next/link';
import React from "react"
import { RiRestartLine } from "react-icons/ri";



export default function Shift({shift, selectedShift, setSelectedShift}: {shift: _Shift, selectedShift: _Shift | null, setSelectedShift: React.Dispatch<React.SetStateAction<_Shift | null>>}) {
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
    <li onClick={() => selectShift()} className={`relative w-[calc(((100dvw/7)-0.6rem))] p-1 h-24 rounded-md flex flex-col justify-between border-2 transition-all ${selectedShift?.uuid === shift.uuid ? "border-blue-600 opacity-100 bg-blue-300 pointer-events-none" : "border-transparent opacity-80 bg-blue-200 cursor-pointer pointer-events-auto"}`}>
      <RiRestartLine className='absolute top-1 right-1'/>
      <div className="text-xl">{shift.date}</div>
      <div>{shift.note}</div>
    </li>  
  )
}



const matchReccurance = (recurrance: Recurrence): string => {
  switch (recurrance) {
    case "Dayly":
      return "dagligen"
    case "Weekly":
      return "veckovis"
    case "Monthly":
      return "månadsvis"
    case "Yearly":
      return "årligen"
    case "EveryOtherMonth":
      return "varannan månad"
    case "EveryOtherWeek":
      return "varannan vecka"
      default: 
      return "";
  }
}