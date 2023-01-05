import type { ForwardedRef, HTMLAttributes, InputHTMLAttributes } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import styles from "./PasswordField.module.css";

const PasswordCtx = createContext<{
  showPassword?: boolean;
  setShowPassword: (value: boolean) => void;
}>({
  showPassword: false,
  setShowPassword: (_value: boolean) => {
    return;
  },
});

export const PasswordField = ({
  isError,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { isError?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PasswordCtx.Provider value={{ showPassword, setShowPassword }}>
      <div
        className={`${className ?? styles.container} ${
          isError && styles.errored
        }`}
        {...props}
      >
        {children}
      </div>
    </PasswordCtx.Provider>
  );
};

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Input = forwardRef(function _input(
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const ctx = useContext(PasswordCtx);
  return (
    <input
      className={`${className ?? styles.input}`}
      type={ctx.showPassword ? "text" : "password"}
      ref={ref}
      name="password"
      {...props}
    />
  );
});

interface ToggleProps extends HTMLAttributes<HTMLButtonElement> {
  onToggle?: (value: boolean) => void;
}

const Toggle = forwardRef(function _toggle(
  { className, children, ...props }: ToggleProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const ctx = useContext(PasswordCtx);
  return (
    <button
      type="button"
      className={className}
      ref={ref}
      onClick={() => ctx.setShowPassword(!ctx.showPassword)}
      {...props}
    >
      {children}
    </button>
  );
});

PasswordField.Input = Input;
PasswordField.Toggle = Toggle;
