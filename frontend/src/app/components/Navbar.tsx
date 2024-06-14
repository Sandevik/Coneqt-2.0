import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='flex justify-between h-12 items-center bg-blue-300 px-4'>
        <Link href="/" className="text-3xl">Coneqt</Link>
        <ul className="flex gap-10">
            <li> 
                <Link href="#">Start</Link>
            </li>
            <li> 
                <Link href="#">Logga ut</Link>
            </li>
        </ul>
    </nav>
  )
}
