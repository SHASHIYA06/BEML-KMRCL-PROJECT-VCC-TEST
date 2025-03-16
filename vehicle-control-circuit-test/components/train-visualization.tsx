"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function TrainVisualization() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = 200

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f5f9)

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 10

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    containerRef.current.appendChild(renderer.domElement)

    // Create train cars
    function createTrainCar(color: number, position: number) {
      const geometry = new THREE.BoxGeometry(3, 1, 1.5)
      const material = new THREE.MeshPhongMaterial({ color })
      const car = new THREE.Mesh(geometry, material)
      car.position.x = position
      return car
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Create train cars with different colors
    const dmc1 = createTrainCar(0x0053a1, -8)
    const tc1 = createTrainCar(0x0053a1, -4.5)
    const mc1 = createTrainCar(0x0053a1, -1)
    const mc2 = createTrainCar(0x0053a1, 2.5)
    const tc2 = createTrainCar(0x0053a1, 6)
    const dmc2 = createTrainCar(0x0053a1, 9.5)

    scene.add(dmc1, tc1, mc1, mc2, tc2, dmc2)

    // Create connections between cars
    function createConnector(x1: number, x2: number) {
      const geometry = new THREE.BoxGeometry(Math.abs(x2 - x1) - 2.5, 0.25, 0.5)
      const material = new THREE.MeshPhongMaterial({ color: 0x333333 })
      const connector = new THREE.Mesh(geometry, material)
      connector.position.x = (x1 + x2) / 2
      return connector
    }

    const connector1 = createConnector(-8, -4.5)
    const connector2 = createConnector(-4.5, -1)
    const connector3 = createConnector(-1, 2.5)
    const connector4 = createConnector(2.5, 6)
    const connector5 = createConnector(6, 9.5)

    scene.add(connector1, connector2, connector3, connector4, connector5)

    // Animation function
    function animate() {
      requestAnimationFrame(animate)

      // Rotate the train slightly for effect
      dmc1.rotation.y += 0.002
      tc1.rotation.y += 0.002
      mc1.rotation.y += 0.002
      mc2.rotation.y += 0.002
      tc2.rotation.y += 0.002
      dmc2.rotation.y += 0.002

      // Float up and down slightly
      const time = Date.now() * 0.001
      dmc1.position.y = Math.sin(time) * 0.1
      tc1.position.y = Math.sin(time + 0.5) * 0.1
      mc1.position.y = Math.sin(time + 1) * 0.1
      mc2.position.y = Math.sin(time + 1.5) * 0.1
      tc2.position.y = Math.sin(time + 2) * 0.1
      dmc2.position.y = Math.sin(time + 2.5) * 0.1

      renderer.render(scene, camera)
    }

    // Start animation
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      const newWidth = containerRef.current.clientWidth

      camera.aspect = newWidth / height
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="mt-6 mb-8">
      <div ref={containerRef} className="w-full h-[200px] rounded-lg overflow-hidden shadow-md"></div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 h-[150px]">
        <div
          id="dmc1-car"
          className="car bg-primary text-white h-[100px] w-[15%] rounded-lg flex justify-center items-center font-bold shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-secondary cursor-pointer"
        >
          DMC1
        </div>
        <div className="train-connector h-[10px] w-[2.5%] bg-gray-800 self-center"></div>
        <div
          id="tc1-car"
          className="car bg-primary text-white h-[100px] w-[15%] rounded-lg flex justify-center items-center font-bold shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-secondary cursor-pointer"
        >
          TC1
        </div>
        <div className="train-connector h-[10px] w-[2.5%] bg-gray-800 self-center"></div>
        <div
          id="mc1-car"
          className="car bg-primary text-white h-[100px] w-[15%] rounded-lg flex justify-center items-center font-bold shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-secondary cursor-pointer"
        >
          MC1
        </div>
        <div className="train-connector h-[10px] w-[2.5%] bg-gray-800 self-center"></div>
        <div
          id="mc2-car"
          className="car bg-primary text-white h-[100px] w-[15%] rounded-lg flex justify-center items-center font-bold shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-secondary cursor-pointer"
        >
          MC2
        </div>
        <div className="train-connector h-[10px] w-[2.5%] bg-gray-800 self-center"></div>
        <div
          id="tc2-car"
          className="car bg-primary text-white h-[100px] w-[15%] rounded-lg flex justify-center items-center font-bold shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-secondary cursor-pointer"
        >
          TC2
        </div>
        <div className="train-connector h-[10px] w-[2.5%] bg-gray-800 self-center"></div>
        <div
          id="dmc2-car"
          className="car bg-primary text-white h-[100px] w-[15%] rounded-lg flex justify-center items-center font-bold shadow-md transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-secondary cursor-pointer"
        >
          DMC2
        </div>
      </div>
    </div>
  )
}

