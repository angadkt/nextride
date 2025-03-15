// "use client"

// import { motion, useMotionValue, useTransform } from "framer-motion"
// import { useEffect, useRef, useState } from "react"

// export default function App() {
//     const ref = useRef<HTMLDivElement>(null)
//     const [{ width, height, top, left }, measure] = useElementDimensions(ref)
//     const gradientX = useMotionValue(0.5)
//     const gradientY = useMotionValue(0.5)
//     const background = useTransform(
//         () =>
//             `conic-gradient(from 0deg at calc(${
//                 gradientX.get() * 100
//             }% - ${left}px) calc(${
//                 gradientY.get() * 100
//             }% - ${top}px), #0cdcf7, #ff0088, #fff312, #0cdcf7)`
//     )

//     return (
//       <div
//       style={{
//           position: "absolute",
//           inset: 0,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//       }}
//       onPointerMove={(e) => {
//           gradientX.set(e.clientX / width);
//           gradientY.set(e.clientY / height);
//       }}
//   >
//       {/* Text with a higher z-index to stay above */}
//       <h1 className="z-10 text-white text-3xl">hello</h1>
  
//       {/* Motion div with lower z-index to act as background */}
//       <motion.div
//           ref={ref}
//           style={{
//               background,
//               width: "100%",
//               height: "100%",
//               borderRadius: 0,
//               cursor: "none",
//               zIndex: -10, // Lower than h1
//               position: "absolute", // Make sure it fills the screen
//           }}
//           onPointerEnter={() => measure()}
//       />
//   </div>
  
//     )
// }

// /**
//  * ================  Utils  =========================
//  */

// function useElementDimensions(
//     ref: React.RefObject<HTMLDivElement | null>
// ): [
//     { width: number; height: number; top: number; left: number },
//     VoidFunction
// ] {
//     const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 })

//     function measure() {
//         if (!ref.current) return

//         setSize(ref.current.getBoundingClientRect())
//     }

//     // Note: This won't accurately reflect viewport size changes
//     useEffect(() => {
//         measure()
//     }, [])

//     return [size, measure]
// }
