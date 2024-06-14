import { Shift } from '@/types/Shift'
import { Worker } from '@/types/Worker'
import React, { useEffect, useState } from 'react'

const w = [{firstName: "Samuel", lastName: "Sandevik", uuid: "1eadsa"}, {firstName: "Oliver", lastName: "Ahlm Hemström", uuid: "12edafa"}]

export default function ExpandedShift({selectedShift}: {selectedShift: Shift | null}) {
    const [workers, setWorkers] = useState<Worker[]>(w)

    const [bookedWorkers, setBookedWorkers] = useState<Worker[]>(selectedShift?.workers || []);

    useEffect(() => {
        setWorkers(w)
        setBookedWorkers(selectedShift?.workers || [])
    }, [selectedShift])

    const handleOnDrag = (e: React.DragEvent, widgetType: Worker) => {
        e.dataTransfer.setData("worker", JSON.stringify(widgetType));
    }

    const handleOnDropBooked = (e: React.DragEvent) => {
        const worker = JSON.parse(e.dataTransfer.getData("worker") as string) as Worker;
        if (!bookedWorkers.find(w => w.uuid === worker.uuid)) {
            setBookedWorkers([...bookedWorkers, worker]);
        }
        setWorkers(workers.filter(w => w.uuid !== worker.uuid ))
    }
    const handleOnDropFree = (e: React.DragEvent) => {
        const worker = JSON.parse(e.dataTransfer.getData("worker") as string) as Worker;
        if (!workers.find(w => w.uuid === worker.uuid)) {
            setWorkers([...workers, worker]);
        }
        setBookedWorkers(bookedWorkers.filter(w => w.uuid !== worker.uuid))

    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

  return (
    <div className={`w-full h-[calc(100dvh-210px)] flex bg-blue-300 mt-2 p-2 rounded-lg transition-all ${selectedShift === null ? "translate-y-[500px] pointer-events-none opacity-0" : "translate-y-0 pointer-events-auto opacity-100"}`}>
        <main className='flex-1'>
            <h3 className='text-2xl'>Inbokade arbetare {bookedWorkers.length}/{selectedShift?.workersNeeded}</h3>
            
            <ul onDrop={handleOnDropBooked} onDragOver={handleDragOver} className='relative h-28 bg-gray-200 w-[20dvw] p-2 flex gap-2 rounded-md border-2 border-gray-300'>
                <div className='absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] text-gray-500 text-lg z-0 pointer-events-none'>Drag arbetare hit!</div>
                {bookedWorkers.map(worker => <li draggable onDragStart={(e) => handleOnDrag(e, worker)} className=' bg-opacity-75 z-10 h-12 flex items-center rounded-md border-dashed border-2 border-gray-300 bg-gray-100 px-2'>{worker.firstName}</li>)}
            </ul>

        </main>
        
        
        <ul onDrop={handleOnDropFree} onDragOver={handleDragOver} className='w-[20dvw] h-full flex flex-col gap-1 bg-white rounded-md p-2'>
          <h3 className="text-2xl">Arbetare</h3>
          {workers.map(worker => (<li draggable onDragStart={(e) => handleOnDrag(e, worker)} className=' z-10 h-12 flex items-center rounded-md border-dashed border-2 border-gray-300 bg-gray-200 px-2'>{worker.firstName}</li>))}   
        </ul>
      
      </div>
  )
}
