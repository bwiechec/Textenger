// Avatar.test.tsx
import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar component", () => {
  it("renders with provided alt text", () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText("J").textContent).toBe("J");
  });

  test("renders with default size when no size is provided", () => {
    render(<Avatar alt="John Doe" size="xl" />);
    expect(screen.getByTestId("avatar").classList.contains("w-8")).toBe(true);
    expect(screen.getByTestId("avatar").classList.contains("h-8")).toBe(true);
  });

  test("renders with specified size", () => {
    render(<Avatar alt="John Doe" size="sm" />);
    expect(screen.getByTestId("avatar").classList.contains("w-4")).toBe(true);
    expect(screen.getByTestId("avatar").classList.contains("h-4")).toBe(true);
    expect(screen.getByTestId("avatar").classList.contains("text-[8px]")).toBe(
      true
    );
  });
});
