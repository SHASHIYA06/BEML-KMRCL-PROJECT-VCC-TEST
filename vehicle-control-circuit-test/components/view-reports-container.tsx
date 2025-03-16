"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVCCTestStore } from "@/lib/store"

export default function ViewReportsContainer() {
  const { showViewReportsContainer, loadReport, loadReports } = useVCCTestStore()

  const [trainSetFilter, setTrainSetFilter] = useState("")
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    if (showViewReportsContainer) {
      handleLoadReports()
    }
  }, [showViewReportsContainer])

  const handleLoadReports = () => {
    // Get reports from localStorage
    const storedReports = localStorage.getItem("vcc_reports")
    if (!storedReports) {
      setReports([])
      return
    }

    const parsedReports = JSON.parse(storedReports)

    // Convert object to array and sort by date (newest first)
    const reportsArray = Object.entries(parsedReports)
      .map(([key, data]) => ({ key, ...(data as any) }))
      .filter((report) => !trainSetFilter || report.trainSetNumber === trainSetFilter)
      .sort((a, b) => {
        const dateA = new Date(a.testDate)
        const dateB = new Date(b.testDate)
        return dateB.getTime() - dateA.getTime()
      })

    setReports(reportsArray)
  }

  const handleReportClick = (report: any) => {
    loadReport(report)
  }

  if (!showViewReportsContainer) return null

  return (
    <div id="viewReportsContainer" className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-6 bg-gray-50 py-2 rounded-r">
        View Reports
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={trainSetFilter} onValueChange={setTrainSetFilter}>
          <SelectTrigger id="trainSetFilter" className="w-full md:w-64">
            <SelectValue placeholder="All Train Sets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Train Sets</SelectItem>
            {Array.from({ length: 17 }, (_, i) => (
              <SelectItem key={i} value={`TS${String(i + 1).padStart(2, "0")}`}>
                TS{String(i + 1).padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button id="loadReports" onClick={handleLoadReports} className="bg-primary text-white hover:bg-primary/90">
          Load Reports
        </Button>
      </div>

      <div id="reportsList" className="space-y-4">
        {reports.length === 0 ? (
          <p>No reports found for the selected criteria.</p>
        ) : (
          reports.map((report) => {
            const passCount = report.results.filter((item: any) => item.result === "PASS").length
            const failCount = report.results.filter((item: any) => item.result === "FAIL").length
            const totalCount = report.results.length

            return (
              <div
                key={report.key}
                className="bg-gray-50 p-4 rounded-lg cursor-pointer transition-all hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md"
                onClick={() => handleReportClick(report)}
              >
                <h3 className="font-medium text-lg">
                  {report.trainSetNumber} - {report.carNumber}
                </h3>
                <p>Date: {report.testDate}</p>
                <p>Time: {report.testTime}</p>
                <p>
                  Results: {passCount} passed, {failCount} failed ({totalCount} total)
                </p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

