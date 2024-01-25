// AddNewChat.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AddNewChat from "./AddNewChat";

describe("AddNewChat component", () => {
  vi.mock("../../context/UserContext", () => ({
    useUser: vi.fn().mockReturnValue({ user: { id: 123 } }),
  }));

  vi.mock("../../hooks/useUserData", () => ({
    __esModule: true,
    default: vi.fn().mockReturnValue({
      status: "success",
      userList: [{ id: 1, name: "ss" }],
    }),
  }));

  vi.mock("../../lib/api/thread/thread.endpoint", () => ({
    apiCreateThread: vi
      .fn()
      .mockResolvedValue({ data: { name: "threadName" } }),
  }));

  vi.mock("../../lib/api/user/user.endpoint", () => ({
    apiChangeUserById: vi
      .fn()
      .mockResolvedValue({ data: { id: 1, name: "ss" } }),
  }));

  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(modalRoot);
  });

  it("renders AddNewChat component with input and button", () => {
    render(
      <AddNewChat show={true} onClose={() => {}} afterExecute={() => {}} />
    );

    const inputElement = screen.getByPlaceholderText("Chat name");
    expect(inputElement).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(
      <AddNewChat show={true} onClose={() => {}} afterExecute={() => {}} />
    );

    const inputElement = screen.getByPlaceholderText("Chat name");
    fireEvent.change(inputElement, { target: { value: "New Chat" } });

    expect(inputElement).toHaveValue("New Chat");
  });
});
