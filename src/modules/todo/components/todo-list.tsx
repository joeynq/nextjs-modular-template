import { useTodos } from "../use-cases";
import { TodoItem } from "./todo-item";

export const TodoList = () => {
  const { data } = useTodos();

  return (
    <ol className="divide-y">
      {data?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ol>
  );
};
