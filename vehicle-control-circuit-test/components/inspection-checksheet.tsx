"use client"

import { useVCCTestStore } from "@/lib/store"

export default function InspectionChecksheet() {
  const { showInspectionChecksheet, testItems, updateTestResult } = useVCCTestStore()

  const handleResultChange = (itemId: number, result: string) => {
    updateTestResult(itemId, result, "")

    // Show/hide failure reason field
    const failureReasonField = document.querySelector(`.failure-reason[data-itemid="${itemId}"]`) as HTMLInputElement
    if (failureReasonField) {
      failureReasonField.style.display = result === "FAIL" ? "block" : "none"
    }
  }

  const handleReasonChange = (itemId: number, reason: string) => {
    updateTestResult(itemId, "FAIL", reason)
  }

  if (!showInspectionChecksheet) return null

  return (
    <div id="inspectionChecksheet" className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-6 bg-gray-50 py-2 rounded-r">
        VCC Inspection Checksheet
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-primary text-white p-3 text-left">Section</th>
              <th className="bg-primary text-white p-3 text-left">Test Item</th>
              <th className="bg-primary text-white p-3 text-left">Drawing Ref.</th>
              <th className="bg-primary text-white p-3 text-left">Expected Result</th>
              <th className="bg-primary text-white p-3 text-left">Result</th>
              <th className="bg-primary text-white p-3 text-left">Failure Reason</th>
            </tr>
          </thead>
          <tbody id="checksheetBody">
            {testItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">{item.system}</td>
                <td className="p-3">
                  {item.code} {item.name}
                </td>
                <td className="p-3">{item.drawing}</td>
                <td className="p-3">{item.expected}</td>
                <td className="p-3">
                  <select
                    className="result-select w-full p-2 border border-gray-300 rounded"
                    data-itemid={item.id}
                    onChange={(e) => handleResultChange(item.id, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="PASS">PASS</option>
                    <option value="FAIL">FAIL</option>
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    className="failure-reason w-full p-2 border border-gray-300 rounded hidden"
                    data-itemid={item.id}
                    placeholder="Reason for failure (if applicable)"
                    onChange={(e) => handleReasonChange(item.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

