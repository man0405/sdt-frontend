"use client";

import { RefObject, useEffect } from "react";

export function useScroll(
  ref: RefObject<HTMLDivElement | null>,
  deps: unknown[]
) {
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, deps);
}