"use client"
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getDateWeek from '../utils/getDateWeek'
import WeekSelector from '../components/WeekSelector'
import Shift from '../components/Shift'
import ExpandedShift from '../components/ExpandedShift'
import { Shift as _Shift } from '@/types/Shift'
import { useRouter } from 'next/navigation'

export default function page() {
    const params = useParams();
    const pathName = usePathname();
    const router = useRouter();
    const [system] = useState<System>({name: "HB Åkeri", uuid: "12adad-asdas-21dgff-feda"}) 
    const [currentWeek, setCurrentWeek] = useState<number>(getDateWeek(new Date()))
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const [selectedShift, setSelectedShift] = useState<_Shift | null>(null)
    const [shifts, setShifts] = useState<_Shift[]>([{date: "6-19-2024", note: "Onsdagar vanlig", workersNeeded: 4, workers: [], shiftCompletionPercentage: 60, uuid: "sdmadaddaggfsds", recurring: true, recurringPeriod: 1}, {date: "6-20-2024", note: "Torsdagar vanlig", workersNeeded: 4, workers: [], shiftCompletionPercentage: 60, uuid: "sadasd", recurring: true, recurringPeriod: 1},{date: "6-20-2024", note: "Kylar Extra", workersNeeded: 1, workers: [], shiftCompletionPercentage: 60, uuid: "sadasdsadasddsad", recurring: false, recurringPeriod: 4}])


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
  
  useEffect(()=>{
    if (selectedShift !== null) {
      router.push(`?selected-shift=${selectedShift.uuid}`)
    } else {
      router.push(pathName.split("?")[0])
    }
  }, [selectedShift])

  return (
    <div className={`overflow-hidden h-full w-full z-0`}>
      <div className='flex justify-center items-center gap-3 z-30'>
        <WeekSelector currentWeek={currentWeek} currentYear={currentYear} setCurrentYear={setCurrentYear} setCurrentWeek={setCurrentWeek} />
        <button className='bg-gray-200 p-1 min-w-12 h-8 rounded-md z-30'>Skapa arbetspass</button>
      </div>
      
      <ul className='grid grid-cols-7 gap-2 h-full mt-2' id='shifts'>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Måndag</div>
            <div className="font-semibold">17-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 1).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Tisdag</div>
            <div className="font-semibold">18-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 2).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Onsdag</div>
            <div className="font-semibold">19-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 3).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Torsdag</div>
            <div className="font-semibold">20-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 4).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Fredag</div>
            <div className="font-semibold">21-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 5).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Lördag</div>
            <div className="font-semibold">22-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 6).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
        <li className='bg-gray-100 rounded-md h-[100dvh]'>
          <div className='flex justify-between p-2 text-lg'>
            <div className=''>Söndag</div>
            <div className="font-semibold">23-6</div>
          </div>
          <div className='flex gap-2 flex-col'>
            {shifts.filter(shift => new Date(shift.date).getDay() === 0).map(shift => <Shift key={shift.uuid} selectedShift={selectedShift} setSelectedShift={setSelectedShift} shift={shift}/>)}
          </div>
        </li>
      </ul>

      <ExpandedShift close={close} selectedShift={selectedShift}/>



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
