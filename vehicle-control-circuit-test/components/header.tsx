"use client"

import { useEffect, useState } from "react"

export default function Header() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // Set current date in the format: 15 Mar 2025, 1:01 PM IST
    const now = new Date()
    const formattedDate =
      now.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) + " IST"

    setCurrentDate(formattedDate)
  }, [])

  return (
    <div className="relative bg-gradient-to-r from-primary to-secondary text-white p-5 shadow-md overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 z-[1]"></div>

      <div className="relative z-[2]">
        <div className="text-center text-2xl font-bold mb-2">BANGALORE</div>
        <div className="text-center text-xl mb-4">
          Vehicle Control Circuit Test
          <br />
          (Setting of Protective Devices)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/10 p-4 rounded-lg max-w-3xl mx-auto">
          <div className="flex justify-between p-1 border-b border-white/20">
            <strong>DRCA. No.</strong> <span>RS(3R)/TT/F/B809/--</span>
          </div>
          <div className="flex justify-between p-1 border-b border-white/20">
            <strong>DOC. No.</strong> <span>GR/TD/3434</span>
          </div>
          <div className="flex justify-between p-1 border-b border-white/20">
            <strong>DATE</strong> <span>02 Apr 2018</span>
          </div>
          <div className="flex justify-between p-1 border-b border-white/20">
            <strong>REV. No.</strong> <span>0</span>
          </div>
          <div className="flex justify-between p-1 border-b border-white/20">
            <strong>PAGE No.</strong> <span>1 / 35</span>
          </div>
          <div className="flex justify-between p-1 border-b border-white/20">
            <strong>Current Date</strong> <span id="currentDate">{currentDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

