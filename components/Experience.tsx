import { useBreakpoint } from "@/lib/useBreakpoint"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { motion, useInView, useMotionTemplate, useScroll } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const roles = [
  {
    title: "founder",
    org: "Shareweave",
    start: "January 2022",
    end: "June 2022",
    description:
      "I founded a startup, which pivoted a few times and eventually ended up making a discord bot.",
    page: "https://ianc.me/shareweave",
    link: "https://shareweave.com",
    readMore: "https://ianc.me/shareweave",
  },
  {
    title: "swe intern",
    org: "Dots (YC S21)",
    start: "July 2022",
    end: "October 2022",
    description:
      "Over the summer, I interned at dots, a YC-backed community management startup making nocode tools for discord.",
    link: "https://dots.community",
    readMore: "https://ianc.me/dots",
  },
  {
    title: "helping out",
    org: "AoTF",
    description:
      "I'm helping out with AoTF, a casual community of teenage founders. It's given me hands-on experience with community building.",
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
      "I created Quillfy, a simple GPT tool to get suggestions on writing.",
    link: "https://quillfy.ianc.me",
  },
  {
    title: "software engineer",
    org: "Thirdbuy",
    description:
      "I'm a software engineer at Thirdbuy, a crypto startup increasing access to investments in developing countries.",
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
        {role.readMore && (
          <a
            href={role.readMore}
            target="_blank"
            className="p-1 px-3 rounded-full border-2 border-black w-fit font-semibold"
          >
            Read More
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
    offset: ["start start", "end 0.7"],
  })
  const isNotSm = useBreakpoint("sm")

  return (
    <>
      {/* 30vw is a good approximation for the amount of space the sun will take up */}
      <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[0fr_4fr] 2xl:pl-32 mt-[50vw] ">
        <div />
        <div>
          <h1 className="font-extrabold text-5xl md:text-7xl mb-14">
            Experience
          </h1>
          <div ref={cardsRef}>
            {roles.map((role, index) => (
              <motion.div
                style={{
                  transform: useMotionTemplate`translateY(calc(${cardsScroll.scrollYProgress} * ${index} * -6rem))`,
                  pointerEvents: "none",
                }}
                key={role.org}
              >
                {/*a seperate div wrapper for motion allows for having a seperate transform property with no transition*/}
                <div
                  className={clsx(
                    index !== 0 && "-mt-64 sm:-mt-96",
                    `relative transition-all duration-300 ease-in-out pointer-events-auto`,
                    roles.length - 1 !== index && "sm:hover:-translate-y-14",
                    typeof currentHoveredCard === "number" &&
                      currentHoveredCard + 1 === index &&
                      `translate-y-10`, // make the card in front go down a bit
                    !isNotSm &&
                      typeof currentHoveredCard === "number" &&
                      currentHoveredCard < index &&
                      `translate-y-60` // make all the cards in front go down a lot
                  )}
                  style={{
                    marginLeft:
                      isInView && isNotSm
                        ? `calc(${index} * ${offset})`
                        : "0px",
                    width: isNotSm
                      ? `calc(100% - ${roles.length} * ${offset})`
                      : `100%`,
                    zIndex: "0",
                    transition:
                      "all 300ms ease-in-out, margin-left 1s ease-in-out",
                  }}
                  onMouseOver={() => setCurrentHoveredCard(index)}
                  onMouseLeave={() => setCurrentHoveredCard(null)}
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
      </div>
    </>
  )
}
