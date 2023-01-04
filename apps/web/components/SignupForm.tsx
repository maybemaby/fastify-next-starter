import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { PostApiUsersRegisterBody } from "../generated";
import { FormField } from "ui/dist";

interface Props {
  onSubmit: (data: PostApiUsersRegisterBody) => void;
  loading: boolean;
  formError?: string;
}

export const SignupForm = ({ onSubmit, loading, formError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PostApiUsersRegisterBody>({ defaultValues: {} });

  const preSubmit: SubmitHandler<PostApiUsersRegisterBody> = (
    data: PostApiUsersRegisterBody
  ) => {
    console.log(data);
    if (data.password !== data.password2) {
      setError("password2", { message: "Passwords must match" });
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(preSubmit)}>
      <FormField isError={!!errors.name}>
        <FormField.Label htmlFor="name">Name</FormField.Label>
        <FormField.Input
          placeholder="Enter a name"
          {...register("name", {
            required: { value: true, message: "Name is required" },
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
        />
        {errors.name && (
          <FormField.Error>{errors.name.message}</FormField.Error>
        )}
      </FormField>
      <FormField isError={!!errors.email}>
        <FormField.Label htmlFor="email">Email</FormField.Label>
        <FormField.Input
          placeholder="Enter your email"
          type={"email"}
          {...register("email", {
            required: { value: true, message: "Email is required" },
            // Requires a valid email address pattern
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <FormField.Error>{errors.email.message}</FormField.Error>
        )}
      </FormField>
      <FormField isError={!!errors.password}>
        <FormField.Label htmlFor="password">Password</FormField.Label>
        <FormField.Input
          type="password"
          placeholder="Enter a strong password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <FormField.Error>{errors.password.message}</FormField.Error>
        )}
      </FormField>
      <FormField isError={!!errors.password2}>
        <FormField.Label htmlFor="password2">Confirm Password</FormField.Label>
        <FormField.Input
          placeholder="Re-enter your password"
          type="password"
          {...register("password2", {
            required: { value: true, message: "Password must be confirmed" },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password2 && (
          <FormField.Error>{errors.password2.message}</FormField.Error>
        )}
      </FormField>
      {formError && <p>{formError}</p>}
      <button type="submit" disabled={loading}>
        Sign up
      </button>
    </form>
  );
};
