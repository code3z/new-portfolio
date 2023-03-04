import { useBreakpoint } from "@/lib/useBreakpoint"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { motion, useInView, useMotionTemplate, useScroll } from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"

const roles = [
  {
    title: "helping out",
    org: "AoTF",
    description:
      "I'm helping out with AoTF, a non-profit that helps people learn to code.",
    start: "July 2022",
    end: "Present",
    link: "https://lu.ma/aotf",
  },
  {
    title: "creator",
    org: "Quillfy",
    adjective: "of",
    start: "January 2023",
    description:
      "I'm the creator of Quillfy, a tool for writing and publishing.",
    link: "https://quillfy.ianc.me",
  },
  {
    title: "swe intern",
    org: "Dots (YC S21)",
    start: "July 2022",
    end: "October 2022",
    description:
      "I'm a software engineering intern at Dots, a startup that helps people learn to code.",
    link: "https://dots.community",
  },
  {
    title: "founder",
    org: "Shareweave",
    start: "January 2022",
    end: "June 2022",
    description:
      "I founded a startup, which pivoted a few times and I eventually left to work at Dots.",
    page: "https://ianc.me/shareweave",
    link: "https://shareweave.com",
  },
  {
    title: "software engineer",
    org: "Thirdbuy",
    description:
      "I'm a software engineer at Thirdbuy, a startup that helps people buy and sell used cars.",
    start: "November 2022",
    end: "Present",
    link: "https://thirdbuy.com",
  },
]
const offset = "5%"

const RoleCardContent = ({
  role,
  index,
  currentHoveredCard,
}: {
  role: typeof roles[0]
  index: number
  currentHoveredCard: number | null
}) => (
  <div className="h-96 border-off-black/70 border-4 p-5 bg-off-white">
    <h3 className="text-3xl font-bold">
      {role.title} [{role.adjective || "at"}] {role.org}
    </h3>
    <div
      className={clsx(
        `transition-all duration-300 ease-in-out`,
        index !== roles.length - 1 &&
          currentHoveredCard !== index &&
          "opacity-0 translate-y-2"
      )}
    >
      <div className="flex my-3 gap-3 flex-wrap">
        {role.start && (
          <div className="bg-yellow/80 p-1 px-3 rounded-full border-2 border-black w-fit font-semibold">
            {role.start}
            {role.end && `—${role.end}`}
          </div>
        )}
        {role.link && (
          <a
            href={role.link}
            target="_blank"
            className="bg-yellow/80 p-1 px-3 rounded-full border-2 border-black w-fit font-semibold"
          >
            Go to {role.org}{" "}
            <ArrowUpRightIcon className="icon stroke-2 !w-3.5 !h-3.5" />
          </a>
        )}
      </div>
      <p className={`text-tan text-lg font-semibold`}>{role.description}</p>
    </div>
  </div>
)

export default function Experience() {
  const [currentHoveredCard, setCurrentHoveredCard] = useState<number | null>(
    null
  )
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef)

  const cardsScroll = useScroll({
    target: cardsRef,
    offset: ["start start", "end center"],
  })
  const isNotSm = useBreakpoint("sm")

  return (
    <>
      {/* 30vw is a good approximation for the amount of space the sun will take up */}
      <div className="max-w-7xl mx-auto px-10 lg:pl-[30vw] xl:pl-[15vw] mt-[50vw]">
        <h1 className="font-extrabold text-5xl md:text-7xl mb-14">
          Experience
        </h1>
        <div ref={cardsRef}>
          {roles.map((role, index) => (
            <motion.div
              style={{
                transform: useMotionTemplate`translateY(calc(${cardsScroll.scrollYProgress} * ${index} * -6rem))`,
              }}
              key={role.org}
            >
              {/*a seperate div wrapper for motion allows for having a seperate transform property with no transition*/}
              <div
                className={clsx(
                  index !== 0 && "-mt-64 sm:-mt-96",
                  `relative transition-all duration-300 ease-in-out`,
                  roles.length - 1 !== index && "sm:hover:-translate-y-14",
                  typeof currentHoveredCard === "number" &&
                    currentHoveredCard + 1 === index &&
                    ` translate-y-10`, // make the card in front go down a bit
                  !isNotSm &&
                    typeof currentHoveredCard === "number" &&
                    currentHoveredCard < index &&
                    `translate-y-48`
                )}
                style={{
                  marginLeft:
                    isInView && isNotSm ? `calc(${index} * ${offset})` : "0px",
                  width: `calc(100% - ${roles.length} * ${offset})`,
                  zIndex: "0",
                  transition:
                    "all 300ms ease-in-out, margin-left 1s ease-in-out",
                }}
                onMouseOver={() => setCurrentHoveredCard(index)}
                onMouseLeave={() => isNotSm && setCurrentHoveredCard(null)}
                onClick={() => setCurrentHoveredCard(index)}
              >
                <RoleCardContent
                  role={role}
                  index={index}
                  currentHoveredCard={currentHoveredCard}
                />
                <div className="bg-theme-red h-24 hidden sm:block"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
