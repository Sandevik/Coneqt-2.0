"use client"
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getDateWeek from '../utils/getDateWeek'
import WeekSelector from '../components/WeekSelector'
import Shift from '../components/Shift'
import ExpandedShift from '../components/ExpandedShift'
import { Shift as _Shift } from '@/types/Shift'
import { useRouter } from 'next/navigation'
import FocusedWeekDay from "../components/FocusedWeekDay"
import WeekDay from "@/app/components/WeekDay"

const testShifts: _Shift[] = [{
  date: "7-3-2024", 
  startTime: "17:00", 
  title: "Extern", 
  desc: "Två terminalare och två chaufförer behövs. Kör extern leveranser från Cola till Åhléns", 
  workersNeeded: 4, 
  workers: [], 
  shiftCompletionPercentage: 60, 
  uuid: "sdmadaddaggfsds", 
  recurring: true, 
  recurringPeriod: 1, 
  objectives: [{
    category: "Från Åhléns", 
    specificOrder: false,
    objectives: [{
      uuid: "sdadasdd", 
      desc: "Från: 7806336829", 
      checkable: true
      }, {
      uuid: "sdalddkfla", 
      desc: "Från: 7806336830", 
      checkable: true
      }, {
        uuid: "sdaffkfla", 
        desc: "Från: 7806336831", 
        checkable: true
      }, {
        uuid: "sdalgghhkfla", 
        desc: "Från: 7806336832", 
        checkable: true
      }]
    }, {
      category: "Till Åhléns", 
      specificOrder: false,
      objectives: [
        {
          uuid: "kk", 
          desc: "Till: 7806336833", 
          checkable: true
        }, {
          uuid: "jj", 
          desc: "Till: 7806336834", 
          checkable: true
        }, {
          uuid: "hhhh", 
          desc: "Till: 7806336835", 
          checkable: true
        }, {
          uuid: "gg", 
          desc: "Till: 7806336836", 
          checkable: true
        }
      ]
    }]
  },
  {
    date: "7-3-2024", 
    startTime: "11:00", 
    title: "Göteborg & Malmö", 
    desc: "Leverera till Göteborg, hämta tom burk i malmö, hämta kylar i Nässjö", 
    workersNeeded: 4, 
    workers: [], 
    shiftCompletionPercentage: 60, 
    uuid: "sdasdsdaggddfs", 
    recurring: false, 
    recurringPeriod: 4,
    objectives: [{
      category: "Körning",
      specificOrder: true,
      objectives: [{
        orderNum: 1,
        uuid: "sdadas",
        desc: "Lossa i Göteborg",
        timeStamp: "17:30"
      }, {
        orderNum: 2,
        uuid: "oihh",
        desc: "Hämta tomburk i Malmö",
        timeStamp: "09:00"
      }, {
        uuid: "ghhhd",
        desc: "Lasta kylar i Nässjö",
      }]
    }] 
  },
  {
    date: "7-4-2024", 
    startTime: "17:00", 
    title: "Extern", 
    desc: "Två terminalare och två chaufförer behövs. Kör extern leveranser från Cola till Åhléns", 
    workersNeeded: 4, 
    workers: [], 
    shiftCompletionPercentage: 60, 
    uuid: "sdmadaddahhhhggfsds", 
    recurring: true, 
    recurringPeriod: 1, 
    objectives: [{
      category: "Från Åhléns", 
      specificOrder: false,
      objectives: [{
        uuid: "sdadasdddd", 
        desc: "Från: 7806336829", 
        checkable: true
        }, {
        uuid: "sdaldddddkfla", 
        desc: "Från: 7806336830", 
        checkable: true
        }, {
          uuid: "sdafdddfkfla", 
          desc: "Från: 7806336831", 
          checkable: true
        }, {
          uuid: "sdalgghddhkfla", 
          desc: "Från: 7806336832", 
          checkable: true
        }]
      }, {
        category: "Till Åhléns", 
        specificOrder: false,
        objectives: [
          {
            uuid: "dd", 
            desc: "Till: 7806336833", 
            checkable: true
          }, {
            uuid: "ff", 
            desc: "Till: 7806336834", 
            checkable: true
          }, {
            uuid: "ggg", 
            desc: "Till: 7806336835", 
            checkable: true
          }, {
            uuid: "gghhhhh", 
            desc: "Till: 7806336836", 
            checkable: true
          }
        ]
      }]
    }
]

export default function page() {
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const [system] = useState<System>({name: "HB Åkeri", uuid: "12adad-asdas-21dgff-feda"}) 
  const [currentWeek, setCurrentWeek] = useState<number>(getDateWeek(new Date()))
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
  const [focusDay, setFocusDay] = useState<number | null>(null);
  const [selectedShift, setSelectedShift] = useState<_Shift | null>(null)
  const [shifts, setShifts] = useState<Record<number, _Shift[]>>(sortIncommingShifts(testShifts))
  const [rightClickedShift, setRightClickedShift] = useState<_Shift | null>(null);

  const close = () => {
    setSelectedShift(null);
  }

  function sortIncommingShifts(shifts: _Shift[]): Record<number, _Shift[]>{
    let _shifts: Record<number, _Shift[]> = {}; 
    for (let i = 0; i < 7; i++) {
      _shifts[i] = [];
      shifts.forEach(shift => {
        if (new Date(shift.date).getDay() === i) {
          _shifts[i].push(shift);
        }
      })
      _shifts[i].sort((a, b) => (a.startTime||"").localeCompare(b.startTime || ""))
    }
    
    return _shifts;
  }
  
  useEffect(()=>{
    if (selectedShift !== null) {
      router.push(`?selected-shift=${selectedShift.uuid}`)
    } else {
      router.push(pathName.split("?")[0])
    }
  }, [selectedShift])

  useEffect(()=>{
    if (focusDay !== null) {
      router.push(`?focused-day=${focusDay}`)
    } else {
      router.push(pathName.split("?")[0])
    }
  }, [focusDay])
  

  const handleOnDrag = (e: React.DragEvent, shift: _Shift) => {
    e.dataTransfer.setData("shift", JSON.stringify(shift));
  }

  const handleDrop = (e: React.DragEvent, toWeekDay: number) => {
    const shift = JSON.parse(e.dataTransfer.getData("shift") as string) as _Shift;
    const _shifts = {...shifts};
    if (!_shifts[toWeekDay].find(s => s.uuid === shift.uuid)) _shifts[toWeekDay].push(shift);
    for (let i = 0; i < 7; i++) {
      _shifts[i].sort((a, b) => (a.startTime||"").localeCompare(b.startTime || ""));
      if (i === toWeekDay) {
        continue;
      } else {
        _shifts[i] = _shifts[i].filter(_shift => _shift.uuid !== shift.uuid);
      }
      
    }
    
    setShifts(_shifts);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.stopPropagation()
    e.preventDefault();
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      //@ts-ignore
      if (e.target.classList.contains("shift-list")) {
        setRightClickedShift(null)
      }
    })
    return () => document.removeEventListener("click", () => {})
  },[])

  const moveShift = (shift: _Shift, _toDay: number) => {
    const currentDay = new Date(shift.date).getDay();
    let toDay = _toDay === 0 ? -7 : _toDay;
    toDay = (currentDay - toDay) * -1;
    console.log(new Date(shift.date).getDate()+ " + " + toDay + " = " + (new Date(shift.date).getDate() + toDay));
    const newDate = new Date(new Date(shift.date).getFullYear(), new Date(shift.date).getMonth() - 1, new Date(shift.date).getDate() + toDay);
    alert("Move shift, new date: " + newDate.toDateString());
  }

  const duplicateShift = (shift: _Shift) => {
    alert("Duplicate shift")
  }

 

  return (
    <div className={`overflow-hidden h-full w-full z-0`}>
      <div className='flex justify-center items-center gap-3 z-30'>
        <WeekSelector currentWeek={currentWeek} currentYear={currentYear} setCurrentYear={setCurrentYear} setCurrentWeek={setCurrentWeek} />
        <button className='bg-gray-200 p-1 min-w-12 h-8 rounded-md z-30'>Skapa arbetspass</button>
      </div>
      
      <ul className='grid grid-cols-7 gap-2 h-full mt-2' id='shifts'>

        <WeekDay duplicateShift={duplicateShift}  moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={1} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Måndag
        </WeekDay>

        <WeekDay duplicateShift={duplicateShift} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={2} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Tisdag
        </WeekDay>

        <WeekDay duplicateShift={duplicateShift} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={3} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Onsdag
        </WeekDay>

        <WeekDay duplicateShift={duplicateShift} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={4} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Torsdag
        </WeekDay>

        <WeekDay duplicateShift={duplicateShift} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={5} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Fredag
        </WeekDay>

        <WeekDay duplicateShift={duplicateShift} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={6} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Lördag
        </WeekDay>

        <WeekDay duplicateShift={duplicateShift} moveShift={moveShift} rightClickedShift={rightClickedShift} setRightClickedShift={setRightClickedShift} day={0} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shifts={shifts} handleDragOver={handleDragOver} handleDrop={handleDrop} handleOnDrag={handleOnDrag} setFocusDay={setFocusDay} focusDay={focusDay} currentWeek={currentWeek} currentYear={currentYear}>
          Söndag
        </WeekDay>

      </ul>

      <ExpandedShift close={close} selectedShift={selectedShift}/>

      <FocusedWeekDay />

      {/* Skapa arbetspass
      
      ändra arbetspass
      <br />
      tabort arbetspass
      
      lägga till och ta bort typer av arbetspass */}
    </div>
  )
}
