import { Button } from "@shared/components/ui";
import { Todo } from "../domain";
import { useDeleteTodo, useMarkTodoCompleted } from "../use-cases";
import { CheckCircleIcon, DeleteIcon } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { RelativeTime } from "@shared/components/time/relative-time";

export interface TodoItemProps {
  todo: Todo;
  onTodoCompleted?: (todoId: string) => void;
  onDeleteTodo?: (todoId: string) => void;
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
    <li className="flex items-center flex-wrap p-2">
      <div className="w-full text-xs">
        <RelativeTime dateTime={todo.createdAt} />
      </div>
      <span className={cn("grow", { "line-through	": todo.completed })}>
        {todo.description}
      </span>

      {!todo.completed && (
        <Button variant="ghost" size="icon" onClick={handleMarkAsCompleted}>
          <CheckCircleIcon />
        </Button>
      )}
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <DeleteIcon />
      </Button>
    </li>
  );
};
