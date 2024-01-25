// ChatList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
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

test("renders ChatList component with threads", () => {
  vi.mock("../../context/UserContext", () => ({
    useUser: vi.fn().mockReturnValue({
      user: {
        id: 123,
        name: "test",
        threads: [{ 0: { value: true } }, { 1: { value: true } }],
      },
    }),
  }));

  render(<ChatList />);

  const threadCard = screen.getByTestId("thread-card");
  expect(threadCard).toBeInTheDocument();
});

test("opens AddNewChat modal when plus icon is clicked", () => {
  vi.mock("../../context/UserContext", () => ({
    useUser: vi.fn().mockReturnValue({ user: { id: 123 } }),
  }));
  render(<ChatList />);

  const plusIcon = screen.getByTestId("add-chat");
  expect(plusIcon).toBeInTheDocument();
  fireEvent.click(plusIcon);

  const modal = screen.getByTestId("add-new-chat-modal");
  expect(modal).toBeInTheDocument();
});
