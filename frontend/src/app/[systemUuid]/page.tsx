"use client"
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getDateWeek from '../utils/getDateWeek'
import WeekSelector from '../components/WeekSelector'
import Shift from '../components/Shift'
import ExpandedShift from '../components/ExpandedShift'
import { Shift as _Shift } from '@/types/Shift'
import { useRouter } from 'next/navigation'
import { IoExpandOutline } from "react-icons/io5";
import FocusedWeekDay from "../components/FocusedWeekDay"

const testShifts: _Shift[] = [{date: "6-19-2024", startTime: "17:00", note: "Onsdagar vanlig", workersNeeded: 4, workers: [], shiftCompletionPercentage: 60, uuid: "sdmadaddaggfsds", recurring: true, recurringPeriod: 1}, {date: "6-20-2024", startTime: "17:00", note: "Torsdagar vanlig", workersNeeded: 4, workers: [], shiftCompletionPercentage: 60, uuid: "sadasd", recurring: true, recurringPeriod: 1},{date: "6-20-2024", startTime: "11:00", note: "Kylar Extra", workersNeeded: 1, workers: [], shiftCompletionPercentage: 60, uuid: "sadasdsadasddsad", recurring: false, recurringPeriod: 4}]

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


    function getDateRangeOfWeek(weekNo: number, y: number){
      const dates: string[] = []
      var d1, numOfdaysPastSinceLastMonday, rangeIsFrom;
      d1 = new Date(''+y+'');
      numOfdaysPastSinceLastMonday = d1.getDay() - 1;
      d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
      d1.setDate(d1.getDate() + (7 * (weekNo - getWeek(d1))));
      rangeIsFrom = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear();
      for (let i = 0; i < 7; i++) {
        const month = ((d1.getDate() + i) > new Date(y, d1.getDate(), 0).getDate() ? ((d1.getMonth() + 2) > 12 ? 1 : (d1.getMonth() + 2)) : (d1.getMonth() + 1));
        const date = ((d1.getDate() + i) > new Date(y, d1.getDate(), 0).getDate() ? 1 : (d1.getDate() + i));
        const year = ((d1.getDate() + i) > new Date(y, d1.getDate(), 0).getDate() && month == 12 ? y + 1 : y)
        dates.push(date + "-" + month + "-" + year)
      }
      return dates;
  };

  function getWeek(date: Date): number {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

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

  return (
    <div className={`overflow-hidden h-full w-full z-0`}>
      <div className='flex justify-center items-center gap-3 z-30'>
        <WeekSelector currentWeek={currentWeek} currentYear={currentYear} setCurrentYear={setCurrentYear} setCurrentWeek={setCurrentWeek} />
        <button className='bg-gray-200 p-1 min-w-12 h-8 rounded-md z-30'>Skapa arbetspass</button>
      </div>
      
      <ul className='grid grid-cols-7 gap-2 h-full mt-2' id='shifts'>

        <li className={`bg-gray-100 rounded-md h-[calc(100dvh-104px)] transition-all ${focusDay === 0 ? "w-[100dvw] z-50" : "w-auto"}`} onDrop={(e) => handleDrop(e, 1)} onDragOver={handleDragOver}>
          <div className={`justify-between p-1 text-lg ${focusDay === 0 ? "hidden" : "flex"}`}>
            <div className='flex gap-1 items-center'><IoExpandOutline onClick={() => setFocusDay(0)} className='cursor-pointer' /> Måndag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[0]}</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts[1].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
          
          <div className={`${focusDay === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all`}>
            hgfhgjhgjghj
          </div>
        </li>

        <li className='bg-gray-100 rounded-md h-[calc(100dvh-104px)] px-2' onDrop={(e) => handleDrop(e, 2)} onDragOver={handleDragOver}>
          <div className='flex justify-between p-1 text-lg'>
            <div className='flex gap-1 items-center'><IoExpandOutline onClick={() => setFocusDay(1)} className='cursor-pointer' /> Tisdag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[1]}</div>
          </div>
          <div className='flex gap-2 flex-col' >
            {shifts[2].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>

        <li className='bg-gray-100 rounded-md h-[calc(100dvh-104px)] px-2' onDrop={(e) => handleDrop(e, 3)} onDragOver={handleDragOver}>
          <div className='flex justify-between p-1 text-lg'>
            <div className='flex gap-1 items-center'><IoExpandOutline onClick={() => setFocusDay(2)} className='cursor-pointer' /> Onsdag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[2]}</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts[3].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>

        <li className='bg-gray-100 rounded-md h-[calc(100dvh-104px)] px-2' onDrop={(e) => handleDrop(e, 4)} onDragOver={handleDragOver}>
          <div className='flex justify-between p-1 text-lg'>
            <div className='flex gap-1 items-center'> <IoExpandOutline onClick={() => setFocusDay(3)} className='cursor-pointer' /> Torsdag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[3]}</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts[4].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>

        <li className='bg-gray-100 rounded-md h-[calc(100dvh-104px)] px-2' onDrop={(e) => handleDrop(e, 5)} onDragOver={handleDragOver}>
          <div className='flex justify-between p-1 text-lg'>
            <div className='flex gap-1 items-center'> <IoExpandOutline onClick={() => setFocusDay(4)} className='cursor-pointer' /> Fredag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[4]}</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts[5].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>

        <li className='bg-gray-100 rounded-md h-[calc(100dvh-104px)] px-2' onDrop={(e) => handleDrop(e, 6)} onDragOver={handleDragOver}>
          <div className='flex justify-between p-1 text-lg'>
            <div className='flex gap-1 items-center'> <IoExpandOutline onClick={() => setFocusDay(5)} className='cursor-pointer' /> Lördag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[5]}</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts[6].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>

        <li className='bg-gray-100 rounded-md h-[calc(100dvh-104px)] px-2' onDrop={(e) => handleDrop(e, 0)} onDragOver={handleDragOver}>
          <div className='flex justify-between p-1 text-lg'>
            <div className='flex gap-1 items-center'> <IoExpandOutline onClick={() => setFocusDay(6)} className='cursor-pointer' /> Söndag</div>
            <div className="font-semibold">{getDateRangeOfWeek(currentWeek, currentYear)[6]}</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts[0].map(shift => <Shift handleOnDrag={handleOnDrag} draggable key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>

      </ul>

      <ExpandedShift close={close} selectedShift={selectedShift}/>

      <FocusedWeekDay />

      {/* Skapa arbetspass
      <br />
      se nuvarande arbetspass
      <br />
      ändra arbetspass
      <br />
      tabort arbetspass
      <br />
      ändra inbokade arbetspass
      <br />
      lägga till och ta bort typer av arbetspass */}
    </div>
  )
}
