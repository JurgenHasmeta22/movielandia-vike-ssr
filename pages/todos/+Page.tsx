export { Page };

import React from "react";
import { TodoItem, todos } from "../../database/todoItems";

function Page() {
  return (
    <ul>
      {todos.map((todo: TodoItem, index: number) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );
}
