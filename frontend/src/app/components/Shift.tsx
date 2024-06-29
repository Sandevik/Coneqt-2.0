import { Shift as _Shift } from '@/types/Shift';
import Link from 'next/link';
import React, { useEffect, useState } from "react"
import { LuMoveHorizontal } from 'react-icons/lu';
import { RiRestartLine, RiTriangleFill } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";



export default function Shift({rightClickedShift, setRightClickedShift, shift, selectedShift, setSelectedShift, draggable, handleOnDrag}: {rightClickedShift: _Shift | null, setRightClickedShift: React.Dispatch<React.SetStateAction<_Shift | null>>, handleOnDrag: (e: React.DragEvent, shift: _Shift) => void, draggable?: boolean, shift: _Shift, selectedShift: _Shift | null, setSelectedShift: React.Dispatch<React.SetStateAction<_Shift | null>>}) {
  const percentage: number = (shift.shiftCompletionPercentage || 0) > 100 ? 100 : (shift.shiftCompletionPercentage || 0) < 0 ? 0 : (shift.shiftCompletionPercentage || 0);
  const [viewDayOptions, setViewDayOptions] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //@ts-ignore
    if (!e.target.classList.contains("context")) {
      if (selectedShift === null) {
        setSelectedShift(shift)
      } else {
        setSelectedShift(null)
        setTimeout(()=>{setSelectedShift(shift)}, 250)
      }
    }
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setRightClickedShift(rightClickedShift?.uuid === shift.uuid ? null : shift);
  }

  useEffect(() => {setViewDayOptions(false)}, [rightClickedShift, selectedShift])

  return (
    <div draggable={draggable} onDragStart={(e) => handleOnDrag(e, shift)} onContextMenu={(e) => handleContextMenu(e)} onClick={(e) => handleClick(e)} className={`relative z-30 w-full p-1 h-24 rounded-md flex flex-col justify-between border-2 transition-all ${selectedShift?.uuid === shift.uuid ? "border-gray-600 opacity-100 bg-gray-300 pointer-events-none px-2" : "border-transparent bg-gray-200 cursor-pointer pointer-events-auto"}`}>
       <div className={`context absolute z-60 top-1 bg-[#000000] text-white p-2 -translate-x-[170px] w-[150px] flex flex-col gap-1 transition-opacity rounded-md ${rightClickedShift?.uuid === shift.uuid ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} `}>
          <button className='context relative flex flex-col cursor-pointer w-full hover:bg-gray-900 p-1 rounded' onClick={() => setViewDayOptions(!viewDayOptions)}>
            <div className="context flex justify-between items-center w-full"><div>Flytta</div> <LuMoveHorizontal /> </div>
            <ol className={`context absolute z-60 top-0 bg-[#000000] -translate-y-1.5 text-white p-2 -translate-x-[130px] w-[100px] flex flex-col items-start gap-1 transition-opacity rounded-md ${viewDayOptions ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} `}>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Måndag</li>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Tisdag</li>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Onsdag</li>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Torsdag</li>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Fredag</li>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Lördag</li>
              <li className='context hover:bg-gray-900 rounded-md py-1 w-full'>Söndag</li>
              <RiTriangleFill className='absolute text-black -right-5 text-2xl rotate-90'/>
            </ol>
          </button>
          <button onClick={() => setSelectedShift(shift)} className='flex justify-between items-center hover:bg-gray-900 p-1 rounded'>Öppna</button>
          <RiTriangleFill className='absolute text-black -right-5 text-2xl rotate-90'/>
        </div>
      {shift.recurring && <RiRestartLine className='absolute top-1 right-1'/>}
      <div className=" flex gap-1 items-center text-md"><VscDebugStart/> <div className="text-xl">{shift.startTime}</div></div>
      <div className='flex justify-between'>
        <div>{shift.note}</div>
        <div>{shift.workers.length} / {shift.workersNeeded}</div>
      </div>
    </div>  
  )
}
