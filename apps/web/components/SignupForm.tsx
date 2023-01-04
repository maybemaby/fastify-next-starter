import { useForm } from "react-hook-form";
import type { PostApiUsersRegisterBody } from "../generated";

interface Props {
  onSubmit: (data: PostApiUsersRegisterBody) => void;
  loading: boolean;
  formError?: string;
}

export const SignupForm = ({ onSubmit, loading, formError }: Props) => {
  const { register, handleSubmit } = useForm<PostApiUsersRegisterBody>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register("name")} />
      <label htmlFor="email">Email</label>
      <input {...register("email")} />
      <label htmlFor="password">Password</label>
      <input type="password" {...register("password")} />
      <label htmlFor="password2">Confirm Password</label>
      <input type="password" {...register("password2")} />
      {formError && <p>{formError}</p>}
      <button type="submit" disabled={loading}>
        Sign up
      </button>
    </form>
  );
};
