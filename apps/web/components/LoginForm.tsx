import { useForm } from "react-hook-form";
import { Flex, FormField } from "ui";
import type { LoginData } from "~/types";

interface Props {
  onSubmit: (data: LoginData) => void;
  loading: boolean;
}

export const LoginForm = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormField isError={!!errors.password}>
          <FormField.Label htmlFor="password">Password</FormField.Label>
          <FormField.Input
            placeholder="Enter your password"
            type={"password"}
            {...register("password", {
              required: { value: true, message: "Must enter your password" },
            })}
          />
          {errors.password && (
            <FormField.Error>{errors.password.message}</FormField.Error>
          )}
        </FormField>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </Flex>
    </form>
  );
};
