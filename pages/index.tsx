import Head from "next/head"
import Cover from "@/components/Cover"
import About from "@/components/About"
import Experience from "@/components/Experience"
import { motion, useScroll } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import squiggle from "@/public/squiggle.svg"
import clsx from "clsx"

/**
 * general breakpoints: below md has no sun and only one column
 */
export default function Home() {
  const contactContainer = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: contactContainer,
    offset: ["start end", "end end"],
  })
  const [linkHovered, setLinkHovered] = useState(false)

  return (
    <main className="relative">
      <Head>
        <title>Ian Cheshire</title>
      </Head>
      <Cover />
      <About />
      <Experience />
      <motion.div
        className="h-full w-full bg-off-black pointer-events-none fixed top-0 left-0 -z-10"
        style={{
          opacity: scrollYProgress,
        }}
      ></motion.div>
      <div
        className="h-screen w-full flex flex-col items-center justify-center text-neutral-200"
        ref={contactContainer}
      >
        <h2 className="font-extrabold text-5xl sm:text-8xl text-center !leading-snug">
          Let’s work together. <br />{" "}
        </h2>
        <span className="font-extrabold text-4xl sm:text-7xl mt-6">
          (or just talk)
        </span>
        <a
          href="mailto:ian@ianc.me"
          target="_blank"
          className="text-4xl sm:text-7xl font-bold text-theme-red mt-14 overflow-hidden p-4 relative"
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
        >
          {/* this creates a text sliding animation. the Contact Me is absolutely positioned and centered because it is shorter */}
          <span
            className={clsx(
              !linkHovered && "translate-y-24",
              `block transition-all duration-150 hover:animate-pulse`
            )}
          >
            ian@ianc.me
          </span>
          <span
            className={clsx(
              linkHovered && "-translate-y-24",
              `transition-all duration-150 absolute top-0 left-0 h-full w-full flex items-center justify-center`
            )}
          >
            Contact Me
          </span>
        </a>
        <Image
          src={squiggle}
          alt="squiggle"
          className="mt-20 absolute bottom-0 left-0 h-64 object-left-bottom object-contain"
        />
      </div>
    </main>
  )
}
