"use client"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import getDateWeek from '../utils/getDateWeek'
import WeekSelector from '../components/WeekSelector'
import Shift from '../components/Shift'
import { Shift as _Shift } from '@/types/Shift'
import { Worker } from '@/types/Worker'
import ExpandedShift from '../components/ExpandedShift'

export default function page() {
    const params = useParams()
    const [system] = useState<System>({name: "HB Åkeri", uuid: "12adad-asdas-21dgff-feda"}) 
    const [employees] = useState<string[]>(["Oliver", "Simon", "Samuel", "Viktor"])
    const [currentWeek, setCurrentWeek] = useState<number>(getDateWeek(new Date()))
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [selectedShift, setSelectedShift] = useState<_Shift | null>(null)
    const [shifts, setShifts] = useState<_Shift[]>([{date: "12-06-2024", note: "Onsdagar vanlig", workersNeeded: 4, workers: [], shiftCompletionPercentage: 60, uuid: "sdmadaddaggfsds", recurring: true, recurringPeriod: 1}, {date: "12-06-2024", note: "Torsdagar vanlig", workersNeeded: 4, workers: [], shiftCompletionPercentage: 60, uuid: "sadasd", recurring: true, recurringPeriod: 1}])



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

  

  return (
    <div className='overflow-hidden h-full'>
      <div className='flex justify-center items-center gap-3'>
        <WeekSelector currentWeek={currentWeek} currentYear={currentYear} setCurrentYear={setCurrentYear} setCurrentWeek={setCurrentWeek} />
        <button className='bg-blue-200 p-1 min-w-12 h-8 rounded-md'>Skapa arbetspass</button>
      </div>
      
      <ul className='flex flex-wrap gap-2 mt-2'>
        {shifts.map(shift => <Shift selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
      </ul>

      <ExpandedShift selectedShift={selectedShift}/>



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
