import { motion, useMotionTemplate, useScroll } from "framer-motion"
import { ArrowSmallDownIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"

export default function Cover() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress, scrollY } = useScroll({
    offset: ["start start", "start -100vh"],
  })

  const scale = useMotionTemplate`calc(1 + ${scrollYProgress} * 4)`
  const arrowOpacity = useMotionTemplate`calc(1 - ${scrollYProgress} * 3)`
  return (
    <div ref={containerRef}>
      <div className="fixed top-0 left-0 flex h-screen w-screen items-start sm:items-center justify-center bg-dark-blue -z-50 scale-y-[1.2] sm:scale-y-100">
        <div className="sm:hidden bg-off-white w-full h-1/2 absolute bottom-0"></div>
        <motion.svg
          style={{
            scale,
          }}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[52rem] min-w-[46rem] rounded-full fill-off-white scale-y-90"
        >
          <path
            d="
                M 0, 75
                C 0, 22.500000000000004 22.500000000000004, 0 75, 0
                S 150, 22.500000000000004 150, 75
                    127.5, 150 75, 150
                    0, 127.5 0, 75
            "
            transform="rotate(
                0,
                100,
                100
            ) translate(
                25
                25
            )"
          ></path>
        </motion.svg>
      </div>
      {/*w-full over w-screen prevents overflow due to scrollbar*/}
      <div className="flex flex-col text-center h-screen w-full items-center justify-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold mt-6 sm:mt-12">
          Ian Cheshire
        </h1>
        <h2 className="text-3xl sm:text-5xl font-bold text-tan mt-3">
          Software Engineer
        </h2>
        <p className="font-semibold text-xl mt-6">Scroll Down</p>
        <motion.div
          className="text-xl animate-[bounce_1.5s_ease-in-out_infinite]"
          style={{
            marginTop: scrollY,
            opacity: arrowOpacity,
          }}
        >
          <ArrowSmallDownIcon className="icon stroke-[2.5] mt-3" />
        </motion.div>
      </div>
    </div>
  )
}
