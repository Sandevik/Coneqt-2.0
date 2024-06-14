import React from 'react'

export default function WeekSelector({currentWeek, setCurrentWeek, currentYear, setCurrentYear}: {currentWeek: number, setCurrentWeek: React.Dispatch<React.SetStateAction<number>>, currentYear: number, setCurrentYear: React.Dispatch<React.SetStateAction<number>>}) {
    const decrementWeek = () => {
      if (currentWeek - 1 < 1) {
        setCurrentWeek(52)
        setCurrentYear(currentYear => currentYear - 1);
      } else {
        setCurrentWeek(currentWeek => currentWeek - 1);
      }
    }

    const incrementWeek = () => {
      if (currentWeek + 1 > 52) {
        setCurrentYear(currentYear => currentYear + 1);
        setCurrentWeek(1);
      } else {
        setCurrentWeek(currentWeek => currentWeek + 1);
      }
    }
  
  return (
    <>
      <button onClick={() => decrementWeek()} className='bg-blue-200 p-1 min-w-12 h-8 rounded-md'>{"<"}</button>
      <div className='w-24 flex justify-center items-center'>Vecka {currentWeek}</div>
      <button onClick={() => incrementWeek()} className='bg-blue-200 p-1 min-w-12 h-8 rounded-md'>{">"}</button>
    </>
  )
}
