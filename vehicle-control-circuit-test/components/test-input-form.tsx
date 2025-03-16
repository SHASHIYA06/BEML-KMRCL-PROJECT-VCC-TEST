"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useVCCTestStore } from "@/lib/store"

export default function TestInputForm() {
  const { showTestInputForm, testItems, saveTestResults } = useVCCTestStore()

  const [testResults, setTestResults] = useState<{ [key: number]: { result: string; reason: string } }>({})

  // Group tests by system
  const groupedTests = testItems.reduce(
    (acc, item) => {
      if (!acc[item.system]) {
        acc[item.system] = []
      }
      acc[item.system].push(item)
      return acc
    },
    {} as { [key: string]: typeof testItems },
  )

  const handleResultChange = (itemId: number, result: string) => {
    setTestResults((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        result,
      },
    }))
  }

  const handleReasonChange = (itemId: number, reason: string) => {
    setTestResults((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        reason,
      },
    }))
  }

  const handleSaveResults = () => {
    // Save all test results
    const results = testItems.map((item) => ({
      id: item.id,
      system: item.system,
      code: item.code,
      name: item.name,
      drawing: item.drawing,
      expected: item.expected,
      result: testResults[item.id]?.result || "PASS",
      failingReason: testResults[item.id]?.result === "FAIL" ? testResults[item.id]?.reason : "",
    }))

    saveTestResults(results)
  }

  // Initialize test results with default values
  useEffect(() => {
    const initialResults = testItems.reduce(
      (acc, item) => {
        acc[item.id] = { result: "PASS", reason: "" }
        return acc
      },
      {} as { [key: number]: { result: string; reason: string } },
    )

    setTestResults(initialResults)
  }, [testItems])

  if (!showTestInputForm) return null

  return (
    <div id="testInputForm" className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-6 bg-gray-50 py-2 rounded-r">
        Test Results Input
      </h2>

      <div id="testItemsContainer" className="space-y-6">
        {Object.entries(groupedTests).map(([system, items]) => (
          <div key={system}>
            <h3 className="text-lg font-medium text-secondary mt-6 mb-4 border-b border-secondary pb-1">{system}</h3>

            {items.map((item) => (
              <div key={item.id} className="test-item bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">
                  {item.code} - {item.name}
                </h4>
                <p className="text-sm text-gray-600 mb-1">Drawing: {item.drawing}</p>
                <p className="text-sm text-gray-600 mb-3">Expected: {item.expected}</p>

                <div className="test-input-controls flex gap-4 mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`result_${item.id}`}
                      value="PASS"
                      checked={testResults[item.id]?.result === "PASS"}
                      onChange={() => handleResultChange(item.id, "PASS")}
                      className="mr-2"
                    />
                    Pass
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`result_${item.id}`}
                      value="FAIL"
                      checked={testResults[item.id]?.result === "FAIL"}
                      onChange={() => handleResultChange(item.id, "FAIL")}
                      className="mr-2"
                    />
                    Fail
                  </label>
                </div>

                {testResults[item.id]?.result === "FAIL" && (
                  <div className="failing-reason mt-3">
                    <label htmlFor={`reason_${item.id}`} className="block text-sm mb-1">
                      Failing Reason:
                    </label>
                    <textarea
                      id={`reason_${item.id}`}
                      value={testResults[item.id]?.reason || ""}
                      onChange={(e) => handleReasonChange(item.id, e.target.value)}
                      placeholder="Enter reason for failure"
                      className="w-full p-2 border border-gray-300 rounded-md min-h-[60px] resize-y"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Button
        id="saveTestResults"
        onClick={handleSaveResults}
        className="mt-6 bg-primary text-white hover:bg-primary/90"
      >
        Save Test Results
      </Button>
    </div>
  )
}

