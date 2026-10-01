"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/lib/motion-preference";

/** Heading whose words rise out of their own masks when it scrolls into view. */
export function RevealWords({
  text,
  as: Tag = "h2",
  id,
  className,
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
}) {
  const { reduced } = useMotionPreference();
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ staggerChildren: reduced ? 0 : 0.045 }}
    >
      {words.map((w, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: words can repeat; order is fixed.
          key={i}
          className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduced ? { y: 0 } : { y: "108%", rotate: 4 },
              shown: { y: 0, rotate: 0 },
            }}
            transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.9, bounce: 0 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
