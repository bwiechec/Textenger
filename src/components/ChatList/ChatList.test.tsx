// ChatList.test.tsx
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ChatList from "./ChatList";

test("renders ChatList component with no threads", () => {
  vi.mock("../../context/UserContext", () => ({
    useUser: vi.fn().mockReturnValue({ user: { id: 123, name: "test" } }),
  }));

  render(<ChatList />);

  const chatTitle = screen.getByText("Chat");
  expect(chatTitle).toBeInTheDocument();
});
