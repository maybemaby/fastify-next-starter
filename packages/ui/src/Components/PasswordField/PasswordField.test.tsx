import { PasswordField } from "./PasswordField";
import { render, screen } from "@testing-library/react";

describe("PasswordField", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <PasswordField>
        <PasswordField.Input placeholder="password" />
        <PasswordField.Toggle />
      </PasswordField>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("password")).toBeTruthy();
  });
});
