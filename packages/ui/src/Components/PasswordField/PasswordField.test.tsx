import { PasswordField } from "./PasswordField";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("PasswordField", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <PasswordField>
        <PasswordField.Input placeholder="password" />
        <PasswordField.Toggle />
      </PasswordField>
    );
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getAllByPlaceholderText("password")).toBeTruthy();
  });

  it("Should toggle visbility", async () => {
    const { baseElement } = render(
      <PasswordField>
        <PasswordField.Input placeholder="password" />
        <PasswordField.Toggle />
      </PasswordField>
    );
    const handler = user.setup();
    const toggle = screen.getByRole("button");
    await handler.click(toggle);
    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeTruthy();
    });
  });
});
