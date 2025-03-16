import { create } from "zustand"
import { testItemsData } from "./test-data"

type StatusLine = {
  text: string
  type: "normal" | "step" | "error"
}

type TestResult = {
  id: number
  system: string
  code: string
  name: string
  drawing: string
  expected: string
  result: string
  failingReason: string
}

type SystemResults = {
  [key: string]: {
    pass: number
    fail: number
    total: number
  }
}

interface VCCTestState {
  // Test setup
  trainSetNumber: string
  carNumber: string
  testDate: string
  testTime: string

  // UI state
  isRunning: boolean
  showInspectionChecksheet: boolean
  showTestInputForm: boolean
  showReportContainer: boolean
  showViewReportsContainer: boolean

  // Test data
  testItems: typeof testItemsData
  statusOutput: StatusLine[]
  testResults: TestResult[]
  systemResults: SystemResults

  // Actions
  setTrainSetNumber: (trainSet: string) => void
  setCarNumber: (car: string) => void
  setTestDate: (date: string) => void
  runAllTests: () => void
  updateTestResult: (itemId: number, result: string, reason: string) => void
  saveTestResults: (results: TestResult[]) => void
  generateReport: () => void
  viewReports: () => void
  loadReport: (report: any) => void
  loadReports: () => void
  logStep: (text: string, type?: "normal" | "step" | "error") => void
  clearOutput: () => void
}

export const useVCCTestStore = create<VCCTestState>((set, get) => ({
  // Test setup
  trainSetNumber: "",
  carNumber: "",
  testDate: "",
  testTime: "",

  // UI state
  isRunning: false,
  showInspectionChecksheet: false,
  showTestInputForm: false,
  showReportContainer: false,
  showViewReportsContainer: false,

  // Test data
  testItems: testItemsData,
  statusOutput: [],
  testResults: [],
  systemResults: {
    "Train System": { pass: 0, fail: 0, total: 0 },
    "Interior & Lighting": { pass: 0, fail: 0, total: 0 },
    "Gangway & Coupler": { pass: 0, fail: 0, total: 0 },
    "Traction System": { pass: 0, fail: 0, total: 0 },
    "Brake System": { pass: 0, fail: 0, total: 0 },
    "Auxiliary Electric": { pass: 0, fail: 0, total: 0 },
    "Door System": { pass: 0, fail: 0, total: 0 },
    "Air Conditioning": { pass: 0, fail: 0, total: 0 },
    "Train Management": { pass: 0, fail: 0, total: 0 },
    "Communication Systems": { pass: 0, fail: 0, total: 0 },
  },

  // Actions
  setTrainSetNumber: (trainSet) => set({ trainSetNumber: trainSet }),
  setCarNumber: (car) => set({ carNumber: car }),
  setTestDate: (date) => set({ testDate: date }),

  runAllTests: async () => {
    const { logStep, clearOutput } = get()

    set({
      isRunning: true,
      showInspectionChecksheet: false,
      showTestInputForm: false,
      showReportContainer: false,
      showViewReportsContainer: false,
    })

    clearOutput()

    // Set test time
    const testTime =
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) + " IST"

    set({ testTime })

    const { trainSetNumber, carNumber, testDate } = get()

    logStep(`Starting VCC Test for Train Set ${trainSetNumber}, Car ${carNumber}`)
    logStep(`Test Date: ${testDate}, Time: ${testTime}`)

    // Display VCC Inspection Checksheet
    set({ showInspectionChecksheet: true })

    // Simulate test execution
    await simulateTestExecution(logStep)

    // Show test input form
    set({
      showTestInputForm: true,
      isRunning: false,
    })

    logStep("All tests completed")
    logStep("Please fill in the test results form")
  },

  updateTestResult: (itemId, result, reason) => {
    const { testResults } = get()
    const updatedResults = [...testResults]

    const existingIndex = updatedResults.findIndex((item) => item.id === itemId)
    if (existingIndex >= 0) {
      updatedResults[existingIndex] = {
        ...updatedResults[existingIndex],
        result,
        failingReason: reason,
      }
    } else {
      const testItem = get().testItems.find((item) => item.id === itemId)
      if (testItem) {
        updatedResults.push({
          id: testItem.id,
          system: testItem.system,
          code: testItem.code,
          name: testItem.name,
          drawing: testItem.drawing,
          expected: testItem.expected,
          result,
          failingReason: reason,
        })
      }
    }

    set({ testResults: updatedResults })
  },

  saveTestResults: (results) => {
    const { trainSetNumber, carNumber, testDate, testTime } = get()

    // Reset system results
    const systemResults: SystemResults = {
      "Train System": { pass: 0, fail: 0, total: 0 },
      "Interior & Lighting": { pass: 0, fail: 0, total: 0 },
      "Gangway & Coupler": { pass: 0, fail: 0, total: 0 },
      "Traction System": { pass: 0, fail: 0, total: 0 },
      "Brake System": { pass: 0, fail: 0, total: 0 },
      "Auxiliary Electric": { pass: 0, fail: 0, total: 0 },
      "Door System": { pass: 0, fail: 0, total: 0 },
      "Air Conditioning": { pass: 0, fail: 0, total: 0 },
      "Train Management": { pass: 0, fail: 0, total: 0 },
      "Communication Systems": { pass: 0, fail: 0, total: 0 },
    }

    // Update system results
    results.forEach((result) => {
      if (systemResults[result.system]) {
        systemResults[result.system].total++
        if (result.result === "PASS") {
          systemResults[result.system].pass++
        } else {
          systemResults[result.system].fail++
        }
      }
    })

    set({
      testResults: results,
      systemResults,
      showInspectionChecksheet: false,
      showTestInputForm: false,
    })

    // Save to localStorage
    const key = `vcc_test_${trainSetNumber}_${carNumber}_${testDate.replace(/-/g, "")}`
    const data = {
      trainSetNumber,
      carNumber,
      testDate,
      testTime,
      results,
      systemResults,
    }

    // Get existing reports
    const reports = JSON.parse(localStorage.getItem("vcc_reports") || "{}")
    reports[key] = data

    // Save back to localStorage
    localStorage.setItem("vcc_reports", JSON.stringify(reports))

    // Log success message
    const { clearOutput, logStep } = get()
    clearOutput()
    logStep("Test results saved successfully!")
    logStep("Click 'Generate Test Report' to view the results.")
  },

  generateReport: () => {
    const { testResults } = get()

    // Check if we have test results
    if (testResults.length === 0) {
      alert("No test results available. Please run tests first.")
      return
    }

    set({
      showReportContainer: true,
      showInspectionChecksheet: false,
      showTestInputForm: false,
      showViewReportsContainer: false,
    })
  },

  viewReports: () => {
    set({
      showViewReportsContainer: true,
      showReportContainer: false,
      showInspectionChecksheet: false,
      showTestInputForm: false,
    })
  },

  loadReport: (report) => {
    set({
      trainSetNumber: report.trainSetNumber,
      carNumber: report.carNumber,
      testDate: report.testDate,
      testTime: report.testTime,
      testResults: report.results,
      systemResults: report.systemResults,
      showReportContainer: true,
      showViewReportsContainer: false,
    })
  },

  loadReports: () => {
    // This is handled in the ViewReportsContainer component
  },

  logStep: (text, type = "normal") => {
    set((state) => ({
      statusOutput: [...state.statusOutput, { text, type }],
    }))
  },

  clearOutput: () => {
    set({ statusOutput: [] })
  },
}))

// Helper function to simulate test execution
async function simulateTestExecution(logStep: (text: string, type?: "normal" | "step" | "error") => void) {
  // Simulate visual inspection
  logStep("3. Visual Inspection and Preparation", "step")
  await delay(500)
  logStep("Checking jumper cables between cars", "step")
  await delay(300)
  logStep("Checking air connections between cars", "step")
  await delay(300)

  // Simulate test for each car
  const cars = ["DMC1", "TC1", "MC1", "MC2", "TC2", "DMC2"]

  for (const car of cars) {
    // Highlight current car in UI
    const carElements = document.querySelectorAll(".car")
    carElements.forEach((el) => el.classList.remove("active"))

    const currentCar = document.getElementById(`${car.toLowerCase()}-car`)
    if (currentCar) {
      currentCar.classList.add("active", "bg-accent", "transform", "-translate-y-3", "shadow-lg")
    }

    logStep(`Testing ${car} Car`, "step")
    await delay(800)

    // Run system tests based on car type
    if (car.startsWith("DMC")) {
      logStep("Testing Train System (Section 4.1)", "step")
      await delay(500)
      logStep("Testing Interior & Lighting (Section 4.2)", "step")
      await delay(500)
      logStep("Testing Door System (Section 4.7)", "step")
      await delay(500)
    } else if (car.startsWith("TC")) {
      logStep("Testing Auxiliary Electric (Section 4.6)", "step")
      await delay(500)
      logStep("Testing Air Conditioning (Section 4.8)", "step")
      await delay(500)
    } else if (car.startsWith("MC")) {
      logStep("Testing Traction System (Section 4.4)", "step")
      await delay(500)
      logStep("Testing Brake System (Section 4.5)", "step")
      await delay(500)
    }
  }

  // Reset car highlighting
  const carElements = document.querySelectorAll(".car")
  carElements.forEach((el) => el.classList.remove("active", "bg-accent", "transform", "-translate-y-3", "shadow-lg"))
}

// Helper function for delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

