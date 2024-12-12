import { RelativeTime } from "@shared/components/time";
import { Button } from "@shared/components/ui";
import { cn } from "@shared/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import { Todo } from "../domain";
import { useDeleteTodo, useMarkTodoCompleted } from "../use-cases";

export interface TodoItemProps {
  todo: Todo;
  onTodoCompleted?: (todoId: string) => void;
  onDeleteTodo?: (todoId: string) => void;
  index: number;
}

export const TodoItem = ({
  todo,
  onDeleteTodo,
  onTodoCompleted,
}: TodoItemProps) => {
  const markAsCompleted = useMarkTodoCompleted();
  const deleteTodo = useDeleteTodo();

  const handleMarkAsCompleted = () => {
    markAsCompleted(todo.id).then(() => {
      onTodoCompleted?.(todo.id);
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id).then(() => {
      onDeleteTodo?.(todo.id);
    });
  };

  return (
    <li className="flex items-center gap-4 relative">
      <div className="flex items-center flex-wrap p-2 grow">
        <div className="w-full text-xs">
          <RelativeTime dateTime={todo.createdAt} />
        </div>
        <span className={cn("grow", { "line-through	": todo.completed })}>
          {todo.description}
        </span>

        {!todo.completed && (
          <Button variant="ghost" size="icon" onClick={handleMarkAsCompleted}>
            <CheckIcon />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <XIcon />
        </Button>
      </div>
    </li>
  );
};
