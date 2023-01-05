import { useForm } from "react-hook-form";
import { Flex, FormField, PasswordField } from "ui";
import type { LoginData } from "~/types";
import { FormError } from "./FormError";

interface Props {
  onSubmit: (data: LoginData) => void;
  loading: boolean;
  formError?: string;
}

export const LoginForm = ({ onSubmit, loading, formError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="login">
      <Flex direction="column" gap={15}>
        <FormField isError={!!errors.email}>
          <FormField.Label htmlFor="email">Email</FormField.Label>
          <FormField.Input
            placeholder="Enter your email"
            type={"text"}
            {...register("email", {
              required: { value: true, message: "Must enter your email" },
            })}
          />
          {errors.email && (
            <FormField.Error>{errors.email.message}</FormField.Error>
          )}
        </FormField>
        <FormField>
          <FormField.Label htmlFor="password">Password</FormField.Label>
          <PasswordField isError={!!errors.password}>
            <PasswordField.Input
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Must enter your password" },
              })}
            />
            <PasswordField.Toggle>Toggle Visible</PasswordField.Toggle>
          </PasswordField>
          {errors.password && (
            <FormField.Error>{errors.password.message}</FormField.Error>
          )}
        </FormField>
        {formError && <FormError>{formError}</FormError>}
        <button type="submit" name="login" disabled={loading}>
          Login
        </button>
      </Flex>
    </form>
  );
};
