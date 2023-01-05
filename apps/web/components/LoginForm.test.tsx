import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

const renderFormDefault = () => {
  return render(
    <LoginForm
      onSubmit={(data) => {
        return;
      }}
      loading={false}
    />
  );
};

describe("LoginForm", () => {
  it("should render successfully", () => {
    renderFormDefault();
    expect(screen.getByRole("form")).toBeTruthy();
  });

  it("Should error on all empty", async () => {
    renderFormDefault();
    const user = userEvent.setup();
    const submit = screen.getByText("Login");
    user.click(submit);
    await waitFor(() => {
      expect(screen.getByText("Must enter your email")).toBeTruthy();
      expect(screen.getByText("Must enter your password")).toBeTruthy();
    });
  });
});
