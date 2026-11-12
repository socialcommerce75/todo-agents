import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("matches the snapshot when empty", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("adds a to-do", async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText("New to-do"), "Buy milk");
    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("matches the snapshot with a to-do", async () => {
    const { container } = render(<App />);
    await userEvent.type(screen.getByLabelText("New to-do"), "Buy milk");
    await userEvent.click(screen.getByText("Add"));
    expect(container).toMatchSnapshot();
  });
});
