import type {
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import React from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import styles from "./FormField.module.css";

const FormFieldContext = createContext<{
  isError?: boolean;
  // setIsError: (value: boolean) => void;
}>({
  isError: false,
  // setIsError(value) {
  //   return;
  // },
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  isError?: boolean;
  children: ReactNode;
}

export const FormField = ({
  isError,
  children,
  className,
  ...props
}: Props) => {
  // const [isError, setIsError] = useState(false);
  return (
    <FormFieldContext.Provider value={{ isError }}>
      <div className={className ?? styles.container} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label {...props} />;
};

const HintText = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={className ?? styles.hint} {...props}>
      {children}
    </p>
  );
};

const Input = React.forwardRef(function _input(
  {
    className,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    hint?: string;
  },
  ref: ForwardedRef<HTMLInputElement>
) {
  const ctx = useContext(FormFieldContext);
  return (
    <input
      className={`${className ?? styles.input} ${
        ctx.isError && styles.errored
      }`}
      ref={ref}
      {...props}
    />
  );
});

const Error = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={className ?? styles.error} {...props}>
      {children}
    </p>
  );
};

FormField.Input = Input;
FormField.Label = Label;
FormField.Error = Error;
FormField.Hint = HintText;
