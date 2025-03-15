"use client"

import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState, useMemo } from "react"

export default function MotionDi() {
    console.log("MotionDi component is rendering") // Debugging step

    const ref = useRef<HTMLDivElement>(null)
    const [{ width, height, top, left }, measure] = useElementDimensions(ref)
    const gradientX = useMotionValue(0.5)
    const gradientY = useMotionValue(0.5)

    // Compute background dynamically
    const background = useMemo(() => {
        if (width === 0 || height === 0) return "#000" // Default fallback
        return `conic-gradient(from 0deg at calc(${gradientX.get() * 100}% - ${left}px) calc(${gradientY.get() * 100}% - ${top}px), #0cdcf7, #ff0088, #fff312, #0cdcf7)`
    }, [gradientX, gradientY, left, top, width, height])

    return (
        <>
        {console.log("motion div is rendering")}
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onPointerMove={(e) => {
                if (width > 0 && height > 0) {
                    gradientX.set(e.clientX / width)
                    gradientY.set(e.clientY / height)
                }
            }}
        >
            {/* Text with a higher z-index to stay above */}
            <h1 className="z-10 text-white text-3xl">hello</h1>

            {/* Motion div with lower z-index to act as background */}
            <motion.div
                ref={ref}
                style={{
                    background,
                    width: "100%",
                    height: "100%",
                    borderRadius: 0,
                    cursor: "none",
                    zIndex: -10,
                    position: "absolute",
                }}
                onPointerEnter={() => measure()}
            />
        </div>
        </>
    )
}

function useElementDimensions(
    ref: React.RefObject<HTMLDivElement | null>
): [
    { width: number; height: number; top: number; left: number },
    VoidFunction
] {
    const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 })

    function measure() {
        if (!ref.current) return
        setSize(ref.current.getBoundingClientRect())
    }

    useEffect(() => {
        measure()
        const observer = new ResizeObserver(measure)
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return [size, measure]
}
