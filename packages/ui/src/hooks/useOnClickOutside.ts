import type { RefObject } from "react";

import { useEventListener } from "./useEventListener";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<
  T extends HTMLElement = HTMLElement,
  G extends HTMLElement = HTMLElement
>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown",
  ignore?: RefObject<G>
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (
      !el ||
      el.contains(event.target as Node) ||
      (ignore && ignore.current?.contains(event.target as Node))
    ) {
      return;
    }

    handler(event);
  });
}

export default useOnClickOutside;
