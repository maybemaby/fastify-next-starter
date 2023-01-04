import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./Flex.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: number;
  justify?: "between" | "around" | "center" | "end" | "start";
  align?: "center" | "end" | "start" | "stretch" | "baseline";
}

export const Flex = ({
  direction = "row",
  justify = "start",
  align = "start",
  gap,
  className,
  children,
  ...props
}: Props) => {
  const styleMap = {
    direction: {
      row: styles.row,
      column: styles.col,
    },
    justify: {
      start: styles.jStart,
      end: styles.jEnd,
      center: styles.jCenter,
      between: styles.jBetween,
      around: styles.jAround,
    },
    align: {
      start: styles.aStart,
      end: styles.aEnd,
      center: styles.aCenter,
      stretch: styles.aStretch,
      baseline: styles.aBaseline,
    },
  };

  return (
    <div
      className={clsx(
        styles.default,
        styleMap.direction[direction],
        styleMap.justify[justify],
        styleMap.align[align],
        className
      )}
      style={{ gap: `${gap}px` }}
      {...props}
    >
      {children}
    </div>
  );
};
