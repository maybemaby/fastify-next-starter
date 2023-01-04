import { useEffect } from "react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  // Element where portal should be rendered, or selector
  target?: HTMLElement | string;

  // Root element className
  className?: string;
  lockBodyScroll?: boolean;
}

export const Portal = ({
  children,
  target,
  className,
  lockBodyScroll = false,
}: PortalProps) => {
  const ref = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (lockBodyScroll) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      if (lockBodyScroll) {
        document.body.style.overflowY = "auto";
      }
    };
  }, [lockBodyScroll]);

  useEffect(() => {
    setMounted(true);
    if (target && typeof target !== "string") {
      ref.current = target;
    } else if (target) {
      ref.current =
        (document.querySelector(target) as HTMLElement) ??
        document.createElement("div");
    } else {
      ref.current = document.createElement("div");
    }

    if (!target && ref.current) {
      document.body.appendChild(ref.current);
    }

    return () => {
      !target && ref.current && document.body.removeChild(ref.current);
    };
  }, [target]);

  if (!mounted || !ref.current) {
    return null;
  }

  return createPortal(<div className={className}>{children}</div>, ref.current);
};
