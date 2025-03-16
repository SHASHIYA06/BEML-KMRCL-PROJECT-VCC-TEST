"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVCCTestStore } from "@/lib/store"

export default function TestSetupForm() {
  const { setTrainSetNumber, setCarNumber, setTestDate, runAllTests, generateReport, viewReports, isRunning } =
    useVCCTestStore()

  const [trainSet, setTrainSet] = useState("")
  const [car, setCar] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  const handleRunAllTests = () => {
    if (!trainSet || !car) {
      alert("Please select both Train Set Number and Car Number before running tests.")
      return
    }

    setTrainSetNumber(trainSet)
    setCarNumber(car)
    setTestDate(date)
    runAllTests()
  }

  const handleGenerateReport = () => {
    generateReport()
  }

  const handleViewReports = () => {
    viewReports()
  }

  return (
    <div id="setupForm" className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-6 bg-gray-50 py-2 rounded-r">
        Test Setup
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="trainSetSelect">Train Set Number:</Label>
            <Select value={trainSet} onValueChange={setTrainSet}>
              <SelectTrigger id="trainSetSelect" className="w-full">
                <SelectValue placeholder="Select Train Set" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Select Train Set</SelectItem>
                {Array.from({ length: 17 }, (_, i) => (
                  <SelectItem key={i} value={`TS${String(i + 1).padStart(2, "0")}`}>
                    TS{String(i + 1).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carSelect">Car Number:</Label>
            <Select value={car} onValueChange={setCar}>
              <SelectTrigger id="carSelect" className="w-full">
                <SelectValue placeholder="Select Car" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Select Car</SelectItem>
                <SelectItem value="DMC1">DMC1</SelectItem>
                <SelectItem value="TC1">TC1</SelectItem>
                <SelectItem value="MC1">MC1</SelectItem>
                <SelectItem value="MC2">MC2</SelectItem>
                <SelectItem value="TC2">TC2</SelectItem>
                <SelectItem value="DMC2">DMC2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testDate">Test Date:</Label>
          <input
            type="date"
            id="testDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-primary to-secondary p-5 rounded-lg flex flex-wrap justify-center gap-4">
        <Button
          id="runAllTests"
          onClick={handleRunAllTests}
          disabled={isRunning}
          className="bg-white text-primary hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 font-bold rounded-full px-6 py-2"
        >
          Run All Tests
        </Button>

        <Button
          id="generateReport"
          onClick={handleGenerateReport}
          className="bg-white text-primary hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 font-bold rounded-full px-6 py-2"
        >
          Generate Test Report
        </Button>

        <Button
          id="viewReports"
          onClick={handleViewReports}
          className="bg-white text-primary hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 font-bold rounded-full px-6 py-2"
        >
          View Reports
        </Button>
      </div>
    </div>
  )
}

