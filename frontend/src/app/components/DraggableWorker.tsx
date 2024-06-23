import { Worker } from '@/types/Worker'
import Link from 'next/link'
import React from 'react'
import { FaClipboardUser } from 'react-icons/fa6'
import { LuMoveHorizontal } from "react-icons/lu";
import { RiTriangleFill } from "react-icons/ri";

export default function DraggableWorker({worker, handleOnDrag, clickedWorker, setClickedWorker, moveTo}: {moveTo: (worker: Worker) => void, setClickedWorker: React.Dispatch<React.SetStateAction<Worker | null>>, worker: Worker, clickedWorker: Worker | null, handleOnDrag: (e: React.DragEvent, worker: Worker) => void}) {
  

  return (
    <div draggable onClick={() => setClickedWorker(worker)} onDragStart={(e) => handleOnDrag(e, worker)} className='neuphormism relative z-10 h-12 flex items-center justify-between rounded-md bg-gray-300 px-2'>
        <div className="flex gap-2 items-center"> <FaClipboardUser/> {worker.firstName} {worker.lastName}</div>
        <div>{worker.role}</div>

        <div className={`absolute z-60 top-1 bg-[#000000] text-white p-2 -translate-x-[170px] w-[150px] flex flex-col gap-1 transition-opacity rounded-md ${clickedWorker?.uuid === worker.uuid ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} `}>
          <button className='flex justify-between items-center hover:bg-gray-900 p-1 rounded' onClick={() => moveTo(worker)}> <div>Flytta</div> <LuMoveHorizontal /> </button>
          <Link href={"#"} className='p-1'>Se anställd</Link>
          <RiTriangleFill className='absolute text-black -right-5 text-2xl rotate-90'/>
        </div>
    </div>
  )
}
