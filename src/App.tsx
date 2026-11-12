import { useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  function add() {
    const t = text.trim();
    if (!t) return;
    setTodos([...todos, { id: Date.now(), text: t, done: false }]);
    setText("");
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
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => (
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
            <button
              onClick={() => setTodos(todos.filter((x) => x.id !== t.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}