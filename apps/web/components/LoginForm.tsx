import { useForm } from "react-hook-form";
import type { LoginData } from "~/types";

interface Props {
  onSubmit: (data: LoginData) => void;
  loading: boolean;
}

export const LoginForm = ({ onSubmit, loading }: Props) => {
  const { register, handleSubmit } = useForm<LoginData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input {...register("email", { required: true })} />
      <label htmlFor="password">Password</label>
      <input type="password" {...register("password", { required: true })} />
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  );
};
