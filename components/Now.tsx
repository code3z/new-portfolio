import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const steps = ["Enter an address", "AI picks the top 6 comps", "Set your offer"]

export default function Now() {
  return (
    // 30vw is a good approximation for the amount of space the sun will take up
    <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[0fr_4fr] 2xl:pl-32 mt-[50vw]">
      <div />
      <div>
        <h1 className="font-extrabold text-5xl md:text-7xl mb-14">Now</h1>
        <div className="bg-off-black text-off-white">
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="p-1 px-3 rounded-full border-2 border-off-white/40 w-fit font-semibold">
                founder
              </div>
              <a
                href="https://chatarv.ai"
                target="_blank"
                className="bg-off-white text-off-black p-1 px-3 rounded-full border-2 border-off-white w-fit font-semibold hover:bg-transparent hover:text-off-white transition-colors duration-100"
              >
                Visit chatarv.ai{" "}
                <ArrowUpRightIcon className="icon stroke-2 !w-3.5 !h-3.5" />
              </a>
            </div>
            <div className="w-fit mt-8">
              <h2 className="text-5xl sm:text-8xl font-extrabold">ChatARV</h2>
              <div className="bg-theme-red/90 w-full h-3 sm:h-6 -mt-3 sm:-mt-6" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold mt-6">
              Property comps and offers, 10x faster.
            </p>
            <p className="text-off-white/80 text-lg font-medium mt-4 max-w-2xl">
              I’m building an AI tool for real estate investors. Type in an
              address and ChatARV finds the best comparable sales, estimates the
              after-repair value, and helps you set an offer, all in about a
              minute.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 border-t-2 border-off-white/20">
            {steps.map((step, index) => (
              <div
                key={step}
                className={clsx(
                  "p-5 sm:p-6",
                  index !== 0 &&
                    "border-t-2 sm:border-t-0 sm:border-l-2 border-off-white/20"
                )}
              >
                <p className="font-extrabold text-3xl text-off-white/40">
                  0{index + 1}
                </p>
                <p className="font-bold text-lg mt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
