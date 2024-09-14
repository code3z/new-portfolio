import { motion, useMotionTemplate, useScroll } from "framer-motion";
import { Github } from "@/lib/icons";
import Image from "next/image";
import forster from "@/public/otto/forster.jpg";
import gatspiel from "@/public/otto/gastspiel.jpg";
import montreux from "@/public/otto/montreux.jpg";
import sun from "@/public/sun.svg";
import { useEffect, useRef, useState } from "react";

const info: Record<string, string> = {
  "Current Projects": "Enjoying senior year, learning Swahili, lifting",
  "Now Watching": "Breaking Bad, Volume",
  Location: "Philadelphia USA (EST)",
};

export default function About() {
  const sunRef = useRef<HTMLDivElement>(null);
  const leftContainer = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    offset: ["30vh end", "end start"],
    target: sunRef,
  });
  const [leftContainerWidth, setLeftContainerWidth] = useState(300);
  const [leftContainerX, setLeftContainerX] = useState(30);
  useEffect(() => {
    const listener = () => {
      setLeftContainerWidth(
        leftContainer.current?.getBoundingClientRect().width || 300
      );
      setLeftContainerX(leftContainer.current?.getBoundingClientRect().x || 0);
    };

    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);
  const sunStickyDistance = "200vh";
  const sunScroll2 = useScroll({
    // this range starts at the intersection of the end of the sun's original place and 1/3 down the viewport,
    // and ends a full viewport after the sun's original place
    offset: ["start start", `${sunStickyDistance} start`],
    target: sunRef,
  });
  const sunTranslate = useMotionTemplate`translateX(calc(-${leftContainerWidth}px * ${scrollYProgress} / 1.6 - ${leftContainerX}px * ${scrollYProgress}))`;

  return (
    <div className="grid gap-16 md:grid-cols-2 responsive-container mt-32">
      <div ref={leftContainer}>
        <h1 className="font-extrabold -mb-4 md:-mb-8 mx-8 ">
          <svg viewBox="0 0 78 12" className="fill-off-black">
            <text x="0" y="12">
              About Me
            </text>
          </svg>
        </h1>
        <div className="bg-gray-200 pt-8 md:pt-12 pb-6 px-8 font-medium space-y-4 text-md text-neutral-700">
          <p>
            I’m a software engineer, aspiring entrepreneur, and high school
            senior.
          </p>
          <p>
            I’ve been working with startups for 2 years and with code since I
            turned 11. I’m also a boy scout and I love being outdoors.
          </p>
          <p>
            I’m fascinated by the problems that people face. How can we reduce
            the wealth gap? Why are there still people living on $2 a day? How
            can public education actually be effective? How can we stop climate
            change without great sacrifices? How can I do more work in less
            time? A lot of problems can, in some way, be solved by technology.
            When I was little, I imagined doing something BIG as an adult - I
            imagined building a city in the sky, powered by helicopter blades.
            Now, I can do something BIG with technology.
          </p>
        </div>
        <div className="bg-off-black p-8 space-y-4">
          {Object.keys(info).map((key) => (
            <div key={key}>
              <p className="text-off-white uppercase leading-relaxed font-medium">
                {key}
              </p>
              <p className="text-off-white text-xl font-medium">{info[key]}</p>
            </div>
          ))}
        </div>
        <div
          className="h-[96rem] absolute hidden lg:block"
          style={{
            width: leftContainerWidth,
            pointerEvents: "none",
          }}
        >
          <motion.div
            ref={sunRef}
            style={{
              top: leftContainerWidth / -2,
              transform: sunTranslate,
            }}
            className="sticky"
          >
            <Image src={sun} alt="" className="mt-8 object-contain" />
          </motion.div>
        </div>
      </div>
      <div className="mt-4 lg:mt-12">
        <a
          href="https://github.com/code3z"
          target="_blank"
          className="grid grid-cols-[1fr_auto] bg-off-black p-8 hover:shadow-yellow-block hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-100"
        >
          <p className="text-4xl font-bold text-off-white">Github</p>
          <Github className="w-20 h-full row-span-2 fill-off-white/90" />
          <p className="text-3xl font-bold text-off-white/90">@code3z</p>
        </a>
        <h2 className="text-5xl font-bold mt-12">About the Portfolio</h2>
        <p className="font-medium text-md mt-2">
          This is inspired by the work of Otto Baumberger, who made some cool
          posters a long time ago. I especially incorporated his 2d and
          geometric work. All the colors here were found somewhere on his work.
        </p>
        <div className="grid grid-cols-3 gap-8 mt-8">
          {[forster, gatspiel, montreux].map((img) => (
            <Image
              src={img}
              key={img.src}
              alt="A poster by Otto Baumberger"
              className="h-full object-contain shadow-block border-off-black border-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
