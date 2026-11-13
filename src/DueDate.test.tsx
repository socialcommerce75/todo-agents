import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "./App";

async function addTodo(text: string, due?: string) {
  await userEvent.type(screen.getByLabelText("New to-do"), text);
  if (due) await userEvent.type(screen.getByLabelText("Due date"), due);
  await userEvent.click(screen.getByText("Add"));
}

describe("Due dates", () => {
  it("has an optional due date field in the add form", () => {
    render(<App />);
    const field = screen.getByLabelText("Due date");
    expect(field).toHaveAttribute("type", "date");
    expect(field).not.toBeRequired();
  });

  it("shows the due date as readable text", async () => {
    render(<App />);
    await addTodo("Pay rent", "2099-11-20");
    expect(screen.getByText("Pay rent")).toBeInTheDocument();
    const due = screen.getByText(/Due Nov 20/);
    expect(due).not.toHaveTextContent("overdue");
    expect(due).not.toHaveClass("overdue");
    expect(screen.getByLabelText("Due date")).toHaveValue("");
  });

  it("shows no due text for a to-do without a due date", async () => {
    render(<App />);
    await addTodo("Buy milk");
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.queryByText(/Due/)).not.toBeInTheDocument();
  });

  it("marks a past due, incomplete to-do as overdue", async () => {
    render(<App />);
    await addTodo("File taxes", "2000-04-15");
    const due = screen.getByText(/Due Apr 15/);
    expect(due).toHaveClass("overdue");
    expect(due).toHaveTextContent("(overdue)");
  });

  it("does not mark a to-do due today as overdue", async () => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    render(<App />);
    await addTodo("Today task", today);
    expect(screen.getByText(/^\s*Due /)).not.toHaveClass("overdue");
  });

  it("removes the overdue marking once completed", async () => {
    render(<App />);
    await addTodo("File taxes", "2000-04-15");
    await userEvent.click(screen.getByRole("checkbox"));
    const due = screen.getByText(/Due Apr 15/);
    expect(due).not.toHaveClass("overdue");
    expect(due).not.toHaveTextContent("overdue");
  });

  it("still deletes a to-do with a due date", async () => {
    render(<App />);
    await addTodo("Pay rent", "2099-11-20");
    await userEvent.click(screen.getByText("Delete"));
    expect(screen.queryByText("Pay rent")).not.toBeInTheDocument();
    expect(screen.queryByText(/Due Nov 20/)).not.toBeInTheDocument();
  });
});
