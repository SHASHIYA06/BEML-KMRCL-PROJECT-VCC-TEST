"use client"
import { useVCCTestStore } from "@/lib/store"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export default function ReportContainer() {
  const { showReportContainer, trainSetNumber, carNumber, testDate, testTime, testResults, systemResults } =
    useVCCTestStore()

  const stats = {
    total: testResults.length,
    passed: testResults.filter((item) => item.result === "PASS").length,
    failed: testResults.filter((item) => item.result === "FAIL").length,
  }

  const pieChartData = [
    { name: "Passed", value: stats.passed, color: "rgba(40, 167, 69, 0.7)" },
    { name: "Failed", value: stats.failed, color: "rgba(220, 53, 69, 0.7)" },
  ]

  const barChartData = Object.keys(systemResults).map((system) => ({
    name: system,
    Passed: systemResults[system].pass,
    Failed: systemResults[system].fail,
  }))

  if (!showReportContainer) return null

  return (
    <div id="reportContainer" className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="report-header text-center mb-6 border-b-2 border-primary pb-3">
        <h2 className="text-xl font-semibold text-primary">Vehicle Control Circuit Test Report</h2>
        <p>KMRCL (RS-3R): DMC1-TC1-MC1-MC2-TC2-DMC2</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
        <div>
          <strong>Train Set Number:</strong> <span id="reportTrainSet">{trainSetNumber}</span>
        </div>
        <div>
          <strong>Car Number:</strong> <span id="reportCar">{carNumber}</span>
        </div>
        <div>
          <strong>Date:</strong> <span id="reportDate">{testDate}</span>
        </div>
        <div>
          <strong>Time:</strong> <span id="reportTime">{testTime}</span>
        </div>
        <div>
          <strong>Document Number:</strong> <span>GR/TD/3434</span>
        </div>
        <div>
          <strong>Revision:</strong> <span>0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow h-[300px]">
          <h3 className="text-center mb-4 font-medium">Overall Test Results</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow h-[300px]">
          <h3 className="text-center mb-4 font-medium">Results by System</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Passed" stackId="a" fill="rgba(40, 167, 69, 0.7)" />
              <Bar dataKey="Failed" stackId="a" fill="rgba(220, 53, 69, 0.7)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div id="reportContent" className="space-y-6">
        {Object.entries(systemResults).map(([system, data]) => (
          <div key={system} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-3">
              {system} ({data.pass}/{data.total} Passed)
            </h4>

            {testResults
              .filter((item) => item.system === system)
              .map((result) => (
                <div
                  key={result.id}
                  className={`p-2 my-1 border-l-3 ${
                    result.result === "PASS" ? "border-l-success bg-success/10" : "border-l-danger bg-danger/10"
                  }`}
                >
                  {result.code} - {result.name}: {result.result}
                  {result.result === "FAIL" && result.failingReason && (
                    <span className="block text-sm text-gray-600 mt-1">Reason: {result.failingReason}</span>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="bg-primary text-white p-4 rounded-lg text-center mt-8">
        <h3 className="text-lg font-medium mb-4">Test Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <h4 className="font-medium">Total Tests</h4>
            <p id="totalTests" className="text-2xl font-bold">
              {stats.total}
            </p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <h4 className="font-medium">Passed</h4>
            <p id="passedTests" className="text-2xl font-bold">
              {stats.passed}
            </p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <h4 className="font-medium">Failed</h4>
            <p id="failedTests" className="text-2xl font-bold">
              {stats.failed}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

