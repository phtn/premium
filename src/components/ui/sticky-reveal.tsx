"use client";
import { type ReactNode, type RefObject, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const linearGradients = [
  "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-sky-300 via-orange-200/60",
  "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-200 via-pink-500/20 to-sky-100",
  "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-300/60",
  "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-amber-900 via-emerald-500/80",
];

/*
bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
*/

export interface StickyScrollContent {
  title: string;
  description: string;
  media?: ReactNode;
  mediaTitle?: string;
}
export interface StickScrollProps {
  content: StickyScrollContent[];
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: StickScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want
    // the overflow container and want to have it change on the entire page scroll
    // target: ref,
    container: ref as RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - (cardsBreakpoints[acc] ?? 0))) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // const backgroundColors = [
  //   "var(--slate-900)",
  //   "var(--black)",
  //   "var(--neutral-900)",
  // ];

  // const [backgroundGradient, setBackgroundGradient] = useState<
  //   string | undefined
  // >(linearGradients[0]);

  // useEffect(() => {
  //   setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  // }, [activeCard]);
  console.log(activeCard);
  return (
    <motion.div
      className={cn(
        "relative flex h-[30rem] justify-center space-x-10 overflow-y-auto border p-10 text-gray-400 transition-colors duration-300 ease-out md:rounded-xl",
        linearGradients[activeCard],
        contentClassName,
      )}
      ref={ref as RefObject<HTMLDivElement>}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl text-slate-700">
          {content.map((item, index) => (
            <div key={item.title + index} className="mb-40 space-y-12 pt-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold tracking-tighter portrait:max-w-[16ch]"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="max-w-sm text-justify opacity-60"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-neutral-800/80",
          "sticky top-10 hidden h-80 w-80 items-center justify-center overflow-hidden rounded-md bg-blend-darken shadow-lg lg:flex",
        )}
      >
        <div className="text-white">{content?.[activeCard]?.media ?? null}</div>
      </div>
    </motion.div>
  );
};
