import { Suspense } from "react"
import TrainVisualization from "@/components/train-visualization"
import TestSetupForm from "@/components/test-setup-form"
import StatusOutput from "@/components/status-output"
import TestInputForm from "@/components/test-input-form"
import ReportContainer from "@/components/report-container"
import ViewReportsContainer from "@/components/view-reports-container"
import InspectionChecksheet from "@/components/inspection-checksheet"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6 border-b-2 border-primary pb-3">
          Vehicle Control Circuit Test
          <br />
          (Setting of Protective Devices)
          <br />
          KMRCL (RS-3R): DMC1-TC1-MC1-MC2-TC2-DMC2
        </h1>

        <Suspense
          fallback={<div className="h-[200px] flex items-center justify-center">Loading train visualization...</div>}
        >
          <TrainVisualization />
        </Suspense>

        <TestSetupForm />

        <StatusOutput />

        <TestInputForm />

        <ReportContainer />

        <ViewReportsContainer />

        <InspectionChecksheet />

        <section className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-4 bg-gray-50 py-2 rounded-r">
            1. Introduction
          </h2>
          <p>
            This main purpose of this test is to verify the functioning of control relays and contactors of Vehicle
            Control Circuits (hereinafter referred to VCC). This document is to be referred for testing of train in 6
            car formation (DMC1-TC1-MC1+MC2-TC2-DMC2).
          </p>
        </section>

        <section className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-4 bg-gray-50 py-2 rounded-r">
            2. Appliance
          </h2>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">
            2.1 Related Standards
          </h3>
          <p>
            - IEC 61133 – Clause 8.15, Railway Applications – Rolling Stock – Testing of rolling stock on completion of
            construction and before entry into service
          </p>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">
            2.2 Test Classification
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-3">
              <thead>
                <tr>
                  <th className="bg-primary text-white p-3 text-left">Items</th>
                  <th className="bg-primary text-white p-3 text-left">Type Test</th>
                  <th className="bg-primary text-white p-3 text-left">Routine Test</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3">
                    The Vehicle Control Circuit (DMC1-TC1-MC1-MC2-TC2-DMC2) Function Test.
                  </td>
                  <td className="border border-gray-200 p-3">O</td>
                  <td className="border border-gray-200 p-3">O</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">2.3 Test Site</h3>
          <p>- BEML Factory / KMRCL Depot.</p>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">
            2.4 Test Devices
          </h3>
          <p>The devices to be used to do the test are as follows:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Volt meter</li>
            <li>External DC Power supply (Adjustable from 70V to 110V)</li>
            <li>External Air Supply (if necessary)</li>
            <li>Pressure gauge (if necessary)</li>
            <li>Bell tester (if necessary)</li>
            <li>Simulator</li>
          </ul>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">2.5 Documents</h3>
          <p>The documents required to carry out the test are as follows:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Vehicle Control Circuit Diagrams of DMC1-TC1-MC1-MC2-TC2-DMC2: 942-58099 ~ 942-58154.</li>
          </ul>
        </section>

        <section className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-primary border-l-4 border-primary pl-3 mb-4 bg-gray-50 py-2 rounded-r">
            3. Visual Inspection and Preparation
          </h2>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="step">
              Check that the Jumper cables between the cars are correctly connected and tightened.
            </div>
            <div className="step">
              Check that the Air connections between the cars are correctly connected and tightened.
            </div>
            <div className="step">Check that all pneumatic cocks are in the default position.</div>
            <div className="step">Check that all Circuit Breakers are opened in all cars.</div>
            <div className="step">Check that all cam switches are in the default position.</div>
          </div>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">
            3.1 General requirement for test
          </h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <p>The following inspection and test should be done before this test.</p>
            <div className="step">Visual Inspection</div>
            <div className="step">Wiring Check</div>
            <div className="step">Insulation Resistance Test</div>
            <div className="step">Dielectric Test</div>
            <div className="step">Check of Battery System</div>
            <p className="mt-2">All the requirements are fulfilled</p>
          </div>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">
            3.2 Preparations
          </h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="step">Switch off all low voltage circuit breakers in the electric panels.</div>
            <div className="step">Batteries charged up (external Battery Charger) in TC-cars.</div>
            <div className="step">Connect all plug and receptacle connector at each equipment.</div>
            <div className="step">
              All the interfaces related to sub systems shall be verified on the respective test of sub system.
            </div>
            <div className="step">Restore all normal connections after completion of testing.</div>
          </div>

          <h3 className="text-lg font-medium text-secondary mt-6 mb-2 border-b border-secondary pb-1">
            3.3 Safety Precautions
          </h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="step">
              Change the Power supply Bus bar in the Main Switch Box to Shop Power Supply (i.e. Stinger Power).
            </div>
            <div className="step">
              Ensure the Stinger plug is engaged into the Stinger Box Correctly before switching on the D.C 750 V.
            </div>
            <div className="step">Make sure that no Persons are working in under frame while charging HT (750VDC).</div>
          </div>
        </section>

        <div className="mt-12 flex flex-col md:flex-row justify-between">
          <div className="signature-block bg-white p-5 rounded-lg shadow mb-4 md:mb-0 md:w-[30%]">
            <div className="text-center">Approved</div>
            <div className="signature-line border-t border-black mt-12 mb-2"></div>
            <div className="text-center">K.C.SHASHIKANTH</div>
          </div>
          <div className="signature-block bg-white p-5 rounded-lg shadow mb-4 md:mb-0 md:w-[30%]">
            <div className="text-center">Reviewed</div>
            <div className="signature-line border-t border-black mt-12 mb-2"></div>
            <div className="text-center">M.SADHASIVAM</div>
          </div>
          <div className="signature-block bg-white p-5 rounded-lg shadow md:w-[30%]">
            <div className="text-center">Prepared</div>
            <div className="signature-line border-t border-black mt-12 mb-2"></div>
            <div className="text-center">G. VISHWANATH</div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center p-5 bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
        <p>End of Document</p>
        <p>GR/TD/3434 - Rev. 0 - Vehicle Control Circuit Test (Setting of Protective Devices)</p>
      </footer>
    </div>
  )
}

