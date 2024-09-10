import { roles } from "@/lib/roles"
import { useBreakpoint } from "@/lib/useBreakpoint"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { motion, useInView, useMotionTemplate, useScroll } from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"

const RoleCardContent = ({
  role,
  index,
  currentHoveredCard,
}: {
  role: typeof roles[0]
  index: number
  currentHoveredCard: number | null
}) => (
  <div className="min-h-[24rem] sm:h-96 border-off-black/70 border-4 p-5 bg-off-white">
    <h3 className="text-2xl md:text-3xl font-bold">
      {role.title} [{"at"}] {role.org}
    </h3>
    <div
      className={clsx(
        `transition-all duration-300 ease-in-out`,
        index !== roles.length - 1 &&
          currentHoveredCard !== index &&
          "opacity-0 translate-y-2"
      )}
    >
      <div className="flex my-3 gap-3 flex-wrap selected-text-white">
        {role.start && (
          <div className="bg-light-yellow p-1 px-3 rounded-full border-2 border-black w-fit font-semibold">
            {role.start}
            {role.end && `—${role.end}`}
          </div>
        )}
        {role.link && (
          <a
            href={role.link}
            target="_blank"
            className="bg-light-yellow p-1 px-3 rounded-full border-2 border-black w-fit font-semibold"
          >
            Go to {role.org}{" "}
            <ArrowUpRightIcon className="icon stroke-2 !w-3.5 !h-3.5" />
          </a>
        )}
        {role.readMore && (
          <Link
            href={role.readMore}
            className="p-1 px-3 rounded-full border-2 border-black w-fit font-semibold"
          >
            Read More
          </Link>
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

  const isNotXl = useBreakpoint("xl")

  const offset = isNotXl ? "5%" : "2%"

  return (
    <>
      {/* 30vw is a good approximation for the amount of space the sun will take up                                          needs a pb on mobile so that the experience will not still be visible if a card is expanded and a user scrolls to contact*/}
      <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[0fr_4fr] 2xl:pl-32 mt-[50vw] pb-96 sm:pb-0">
        <div />
        <div>
          <h1 className="font-extrabold text-5xl md:text-7xl mb-14">
            Experience
          </h1>
          <div ref={cardsRef}>
            {roles.map((role, index) => (
              <motion.div
                style={{
                  transform: useMotionTemplate`translateY(calc(${
                    cardsScroll.scrollYProgress
                  } * ${index} * ${isNotSm ? 1 : 0} * -6rem))`,
                  pointerEvents: "none",
                }}
                key={role.org}
              >
                {/*a seperate div wrapper for motion allows for having a seperate transform property with no transition*/}
                <div
                  className={clsx(
                    index !== 0 && "-mt-64 sm:-mt-96",
                    `relative transition-all duration-300 ease-in-out pointer-events-auto`,
                    roles.length - 1 !== index && "sm:hover:-translate-y-20",
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
