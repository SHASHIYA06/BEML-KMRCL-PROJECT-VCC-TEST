"use client"

import { useRef, useEffect } from "react"
import { useVCCTestStore } from "@/lib/store"

export default function StatusOutput() {
  const { statusOutput } = useVCCTestStore()
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [statusOutput])

  return (
    <div
      id="statusOutput"
      ref={outputRef}
      className="bg-[#1e1e1e] text-[#f0f0f0] border border-[#333] p-4 my-5 h-[300px] overflow-y-auto font-mono rounded-lg shadow-inner"
    >
      {statusOutput.map((line, index) => (
        <div key={index} className={`my-1 p-1 ${line.type === "step" ? "text-primary" : ""}`}>
          {line.text}
        </div>
      ))}
    </div>
  )
}

