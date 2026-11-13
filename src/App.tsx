import { useState } from "react";

type Todo = { id: number; text: string; done: boolean; due?: string };

// Parse a "YYYY-MM-DD" value from a date input as a local calendar date.
function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDue(value: string): string {
  return parseDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(todo: Todo, now: Date = new Date()): boolean {
  if (!todo.due || todo.done) return false;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return parseDate(todo.due) < today;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [due, setDue] = useState("");

  function add() {
    const t = text.trim();
    if (!t) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: t, done: false, ...(due ? { due } : {}) },
    ]);
    setText("");
    setDue("");
  }

  return (
    <main>
      <h1>To-do list</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New to-do"
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          aria-label="Due date"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => {
          const overdue = isOverdue(t);
          return (
            <li key={t.id}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    setTodos(
                      todos.map((x) =>
                        x.id === t.id ? { ...x, done: !x.done } : x,
                      ),
                    )
                  }
                />
                <span
                  style={{ textDecoration: t.done ? "line-through" : "none" }}
                >
                  {t.text}
                </span>
              </label>
              {t.due && (
                <span
                  className={overdue ? "due overdue" : "due"}
                  style={overdue ? { color: "#c62828" } : undefined}
                >
                  {" "}
                  Due {formatDue(t.due)}
                  {overdue && " (overdue)"}
                </span>
              )}
              <button
                onClick={() => setTodos(todos.filter((x) => x.id !== t.id))}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
