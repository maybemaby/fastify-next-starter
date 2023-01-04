import { SignupForm } from "~/components/SignupForm";
import type { PostApiUsersRegisterBody } from "~/generated";
import { useRegistration } from "~/hooks/useRegistration";

const SignupPage = () => {
  const { register } = useRegistration({});

  const onSubmit = async (data: PostApiUsersRegisterBody) => {
    await register.mutateAsync(data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignupForm onSubmit={onSubmit} loading={register.isLoading} />
    </div>
  );
};

export default SignupPage;
