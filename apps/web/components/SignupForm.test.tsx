import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

function renderFormDefault() {
  return render(
    <SignupForm
      onSubmit={(data) => {
        return;
      }}
      loading={false}
    />
  );
}

describe("SignupForm", () => {
  it("Should render successfully", () => {
    renderFormDefault();
    expect(screen.getByRole("form")).toBeTruthy();
  });

  it("Should error on all empty", async () => {
    renderFormDefault();
    const user = userEvent.setup();
    const submit = screen.getByText("Sign up");
    user.click(submit);
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeTruthy();
      expect(screen.getByText("Password is required")).toBeTruthy();
      expect(screen.getByText("Password is required")).toBeTruthy();
      expect(screen.getByText("Password must be confirmed")).toBeTruthy();
    });
  });

  it.each(["email@email"])("Should error on invalid email", async (email) => {
    renderFormDefault();
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, email);
    const submit = screen.getByText("Sign up");
    user.click(submit);
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeTruthy();
    });
  });

  it.each([
    [
      "Password1!",
      "Password2!",
      "Password1!",
      "passworD1!",
      "Password1!",
      "password1!",
    ],
  ])(
    "Should error on password mismatch case insensitive",
    async (password1, password2) => {
      renderFormDefault();
      const user = userEvent.setup();
      const nameInput = screen.getByLabelText("Name");
      await user.type(nameInput, "name");
      const emailInput = screen.getByLabelText("Email");
      await user.type(emailInput, "email@email.com");
      const passwordInput = screen.getByLabelText("Password");
      const password2Input = screen.getByLabelText("Confirm Password");
      await user.type(passwordInput, password1);
      await user.type(password2Input, password2);
      const submit = screen.getByText("Sign up");
      await user.click(submit);
      await waitFor(() => {
        expect(screen.getByText("Passwords must match")).toBeTruthy();
      });
    }
  );

  it.each(["password", "Password", "password!", "password1", "Password1", "Password!"])(
    "Should error on invalid password complexity",
    async (password) => {
      renderFormDefault();
      const user = userEvent.setup();
      const nameInput = screen.getByLabelText("Name");
      await user.type(nameInput, "name");
      const emailInput = screen.getByLabelText("Email");
      await user.type(emailInput, "email@email.com");
      const passwordInput = screen.getByLabelText("Password");
      const password2Input = screen.getByLabelText("Confirm Password");
      await user.type(passwordInput, password);
      await user.type(password2Input, password);
      const submit = screen.getByText("Sign up");
      await user.click(submit);
      await waitFor(() => {
        expect(
          screen.getByText(
            "Password must contain at least one number, one lowercase, one uppercase, one special character"
          )
        ).toBeTruthy();
      });
    }
  );
});
