import React, { useEffect } from 'react'
import getDateRangeOfWeek from '../utils/getDateRangeOfWeek'
import { IoExpandOutline, IoReturnDownBackSharp  } from "react-icons/io5";
import { Shift as _Shift } from '../../types/Shift'
import Shift from "../components/Shift";



export default function WeekDay({duplicateShift, moveShift, rightClickedShift, setRightClickedShift, children, focusDay, currentWeek, currentYear, setFocusDay, handleOnDrag, handleDrop, handleDragOver, selectedShift, setSelectedShift, shifts, day}: {duplicateShift: (shift: _Shift) => void, moveShift: (shift: _Shift, toDay: number) => void, rightClickedShift: _Shift | null, setRightClickedShift: React.Dispatch<React.SetStateAction<_Shift | null>>, day: number, children?: React.ReactNode, shifts: Record<number, _Shift[]>, setSelectedShift: React.Dispatch<React.SetStateAction<_Shift|null>>, selectedShift: _Shift|null, handleDragOver: (e: React.DragEvent) => void, handleDrop: (e: React.DragEvent, toWeekDay: number) => void, handleOnDrag: (e: React.DragEvent, shift: _Shift) => void, setFocusDay: React.Dispatch<React.SetStateAction<number|null>>, focusDay: number | null, currentWeek: number, currentYear: number}) {
    
  
  
  
  return (
    <li className={`shift-list bg-gray-100 rounded-md h-[calc(100dvh-104px)] transition-all  ${focusDay === null ? "" : focusDay === day ? "w-[99dvw] z-30 " : "w-auto hidden"}`} onDrop={(e) => handleDrop(e, day)} onDragOver={handleDragOver}>
      <div className={`justify-between p-1 px-2 text-lg ${focusDay === day ? "hidden" : "flex"}`}>
        <div className='flex gap-1 items-center'><IoExpandOutline onClick={() => setFocusDay(day)} className='cursor-pointer' />{matchDay(day)}</div>
        <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[day-1 < 0 ? 6 : day-1]}</div>
      </div>
      {focusDay === null && <div className='flex gap-2 flex-col p-2'>
        {shifts[day].map(shift => <Shift duplicateShift={duplicateShift} day={day} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
      </div>}
    
      <div className={`${focusDay === day ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all relative p-2 h-full w-full z-50`}>
        <IoReturnDownBackSharp onClick={() => setFocusDay(null)} className="text-3xl cursor-pointer absolute top-0 left-0 bg-gray-200 rounded-md "/>
        <div className='mt-8'>
            {children}
        </div>
      </div>
    </li>
  )
}

function matchDay(day: number){
    switch (day) {
        case 0: 
        return "Söndag";
        case 1:
            return "Måndag";
        case 2:
            return "Tisdag";
        case 3:
            return "Onsdag";
        case 4:
            return "Torsdag";
        case 5:
            return "Fredag";
        case 6:
            return "Lördag"
        default:
            return "Ogiltig dag";
    }
}