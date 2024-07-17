import { TodoItem, todos } from "../../database/todoItems";

export type Data = {
  todos: TodoItem[];
};

export default async function data(): Promise<Data> {
  // @ts-ignore
  return todos;
}
