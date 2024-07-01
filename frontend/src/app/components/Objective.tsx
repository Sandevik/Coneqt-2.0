import React, { useState } from 'react'

export default function Objective({objective}: {objective: Objective}) {
    const [checked, setChecked] = useState<boolean>(objective?.checked || false);
  return (
    <div onClick={() => { if (objective.checkable) setChecked(!checked)}} className='flex  gap-2 items-start justify-center bg-gray-200 w-full rounded-md p-2'>
        <div className='flex-1 flex flex-col gap-1'>
          <div className=' flex justify-between w-full items-center'>
              {objective.timeStamp && <div className='text-xl'>{objective.timeStamp || "--:--"}</div>}
          </div>
          <div>{objective.desc}</div>
        </div>
        {objective.checkable && <input checked={checked} className=' h-5 w-5 border-none' type="checkbox" name="" id="" />}
    </div>
  )
}
