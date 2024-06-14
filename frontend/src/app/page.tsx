"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [systems] = useState<System[]>([{name: "HB Åkeri", uuid: "12adad-asdas-21dgff-feda"}]) 

  return (
    <main className="h-full">
      <div className="flex flex-wrap gap-8 pt-4 h-full">
        {systems.map(system => (<Link href={"/"+system.uuid} className="h-24 w-32 rounded-md bg-blue-300 flex justify-center items-center text-xl font-semibold">{system.name}</Link>))}
      </div>
    </main>  
  );
}
