import { Shift } from '@/types/Shift'
import { Worker } from '@/types/Worker'
import React, { useEffect, useState } from 'react'
import { FaClipboardUser, FaUsersGear  } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import DraggableWorker from './DraggableWorker';
import { FaArrowDownLong  } from "react-icons/fa6";
import { MdOutlineFlagCircle } from "react-icons/md";
import Objective from './Objective';
import { RiCalendarTodoFill } from "react-icons/ri";


const w = [{firstName: "Samuel", lastName: "Sandevik", uuid: "1eadsa", role: "Terminal"}, {firstName: "Oliver", lastName: "Ahlm Hemström", uuid: "12edafa", role: "Terminal"}, {firstName: "Simon", lastName: "Sandevik", uuid: "sdadasd", role: "Chaufför"}, {firstName: "Mats", lastName: "Sandevik", uuid: "sdadaddsd", role: "Chaufför"}]

export default function ExpandedShift({selectedShift, close}: {selectedShift: Shift | null, close: () => void}) {
    const [workers, setWorkers] = useState<Worker[]>(w)

    const [bookedWorkers, setBookedWorkers] = useState<Worker[]>(selectedShift?.workers || []);
    const [workerMenuOpen, setWorkerMenuOpen] = useState<boolean>(true);
    const [clickedWorker, setClickedWorker] = useState<Worker | null>(null);
    const [selectedObjectives, setSelectedObjectives] = useState<Objectives | null>(selectedShift?.objectives && selectedShift.objectives[0] || null);



    useEffect(() => {
        setWorkers(w)
        setBookedWorkers(selectedShift?.workers || [])
        setSelectedObjectives(selectedShift?.objectives && selectedShift.objectives[0] || null);
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

    const moveWorkerFromBooked = (worker: Worker) => {
        setClickedWorker(null);
        if (!workers.find(w => w.uuid === worker.uuid)) {
            setWorkers([...workers, worker]);
        }
        setBookedWorkers(bookedWorkers.filter(w => w.uuid !== worker.uuid))
    }
    const moveWorkerToBooked = (worker: Worker) => {
        setClickedWorker(null);
        if (!bookedWorkers.find(w => w.uuid === worker.uuid)) {
            setBookedWorkers([...bookedWorkers, worker]);
        }
        setWorkers(workers.filter(w => w.uuid !== worker.uuid ))
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault();
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        //@ts-ignore
        if (e.target.id === "blur") {
           close()
        }
    }

    const handleDeselect = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        //@ts-ignore
        if (e.target.id === "selectBooked" || e.target.id === "selectAvailable") {
            setClickedWorker(null);
        }
    }

    const getDistinctObjectives = (objectives: Objectives[]) => {
        const distinct: string[] = []
        objectives.forEach(objectives => !distinct.find(o => o === objectives.category) && distinct.push(objectives.category));
        return distinct;
      }

  return (
    <div id='blur' onClick={(e) => handleClose(e)} className={`w-full h-full cursor-pointer bg-gray-400 overflow-hidden absolute top-0 left-0 z-30 ${selectedShift === null ? "pointer-events-none bg-opacity-0" : "pointer-events-all bg-opacity-70"}`}>
    <div className={`w-full h-[calc(100dvh-210px)] absolute bottom-0 z-30 flex mt-2 p-2 rounded-lg transition-all ${selectedShift === null ? "translate-y-[500px] pointer-events-none opacity-0" : "translate-y-0 pointer-events-auto opacity-100"}`}>
        <main className='flex-1 h-full'>            
            <div className='flex pr-2 h-full gap-2'>
            
                
                <div className='flex-1 flex bg-gray-300 rounded-md pr-2 py-4 pl-4 cursor-default'>
                    <div className='flex-1 flex flex-col gap-3'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-2xl font-semibold flex items-center gap-2'><RiCalendarTodoFill /> {selectedShift?.title}</h3>
                            { selectedShift?.objectives && selectedShift?.objectives?.length > 1 && <select onChange={(e) => setSelectedObjectives(selectedShift?.objectives?.find(o => o.category === e.target.value)|| null)} className='p-2 rounded-md' >
                                {getDistinctObjectives(selectedShift?.objectives || []).map(category => (<option value={category} key={category}>{category}</option>))}
                            </select>}
                        </div>
                        <p>{selectedShift?.desc}</p>
                    </div>
                    
                    <div className='rounded-md w-[20dvw] pl-4'>

                

                        <div className='flex flex-col gap-2 items-start h-full overflow-y-auto pr-2'>
                            <div className='flex gap-2 justify-between text-xl w-full items-center bg-gray-200 rounded-md p-1'>
                                <MdOutlineFlagCircle className='text-3xl flex justify-center text-green-700' />
                                <div className='translate-x-2'>Start</div>
                                <div>{selectedShift?.startTime}</div>
                            </div>
                            {(selectedObjectives?.objectives.length || 0 > 0) && <div className='text-md flex justify-center w-full'><FaArrowDownLong  /></div>}
                            {selectedObjectives?.objectives.sort((a, b) => ((a.orderNum || 0) - (b.orderNum || 0))).map((objective, i) => (
                                <>
                                    <Objective objective={objective} />
                                    {i+1 < (selectedObjectives?.objectives.length || 0) && selectedObjectives.specificOrder ? <div className='text-md flex justify-center w-full'><FaArrowDownLong  /></div> : <></>}
                                </>
                            ))}
                        </div>
                    </div>





                </div>
            



            
                <div className='h-full cursor-default'>
                    <div className='flex justify-between items-center relative'>
                        <div className='absolute top-1 left-1 z-50'>
                            <h3 className='text-lg flex justify-between items-center min-w-[19dvw] pl-2 pointer-events-none select-none'><div>Inbokade arbetare</div><div className={`font-semibold ${bookedWorkers.length / (selectedShift?.workersNeeded || bookedWorkers.length) === 1 ? "text-green-500" : bookedWorkers.length / (selectedShift?.workersNeeded || bookedWorkers.length) > 1 ? "text-yellow-500" : ""}`}>{bookedWorkers.length}/{selectedShift?.workersNeeded}</div></h3>
                        </div>
                    </div>

                    <ul id='selectBooked' onClick={(e) => handleDeselect(e)} onDrop={handleOnDropBooked} onDragOver={handleDragOver} className='relative cursor-default z-40 h-full pt-10 bg-gray-200 min-w-[20dvw] p-2 flex flex-col gap-3 rounded-md border-2 border-gray-300'>
                        <div className='absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] text-gray-500 text-lg z-0 pointer-events-none'>Drag hit arbetare!</div>
                        {bookedWorkers.map(worker => <DraggableWorker moveTo={moveWorkerFromBooked} key={worker.uuid+"b"} clickedWorker={clickedWorker} setClickedWorker={setClickedWorker} handleOnDrag={handleOnDrag} worker={worker} />)}
                    </ul>
                </div>
                {!workerMenuOpen && <FaUsersGear className='text-3xl cursor-pointer ml-2' onClick={() => setWorkerMenuOpen(true)} />}

            </div>

        </main>
        
        
        <ul onClick={(e) => handleDeselect(e)} id='selectAvailable' onDrop={handleOnDropFree} onDragOver={handleDragOver} className={`${!workerMenuOpen ? "translate-x-[100vw] w-0" : "translate-x-0 w-[20dvw]"} z-40 cursor-default transition-transform h-full flex flex-col gap-3 bg-white rounded-md p-2`}>
          <div className='flex justify-between items-center gap-3'>
            <h3 className="text-lg pointer-events-none select-none">Tillgängliga arbetare</h3>
            <IoClose className='text-3xl cursor-pointer' onClick={() => setWorkerMenuOpen(false)} />
          </div>
          {workers.map(worker => (<DraggableWorker key={worker.uuid+"a"} moveTo={moveWorkerToBooked} setClickedWorker={setClickedWorker} clickedWorker={clickedWorker} worker={worker} handleOnDrag={handleOnDrag}  />))}   
        </ul>
      
      </div>
      </div>
  )
}
