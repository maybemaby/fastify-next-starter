import type { ReactNode } from "react";

export const FormError = ({ children }: { children: ReactNode }) => {
  return <p style={{ color: "red" }}>{children}</p>;
};
