import { ScrollArea } from "@shared/components/ui";
import { useTodos } from "../use-cases";
import { TodoItem } from "./todo-item";

export const TodoList = () => {
  const { data } = useTodos();

  return (
    <ScrollArea className="grow">
      <ol className="divide-y">
        {data?.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} index={index} />
        ))}
      </ol>
    </ScrollArea>
  );
};
