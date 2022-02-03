// https://gist.github.com/blacksmoke26/65f35ee824674e00d858047e852bd270

/**
 * @author Junaid Atari
 * @link https://github.com/blacksmoke26
 * @since 2020-09-20
 */

import { useState, useEffect } from "react";
import debounce from "debounce";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

const resolveBreakpoint = (width: number): Breakpoint => {
  if (width < 576) {
    return "xs";
  } else if (width >= 576 && width < 768) {
    return "sm";
  } else if (width >= 768 && width < 992) {
    return "md";
  } else if (width >= 992 && width < 1200) {
    return "lg";
  } else if (width >= 1200 && width < 1440) {
    return "xl";
  }
  return "xxl";
};

/** Get Media Query Breakpoints in React */
export const useBreakpoint = (): Breakpoint => {
  const [size, setSize] = useState(() => resolveBreakpoint(window.innerWidth));

  useEffect(() => {
    const calcInnerWidth = debounce(function () {
      setSize(resolveBreakpoint(window.innerWidth));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return size;
};
