import { useQueryParams } from "@shared/hooks";
import { emitEvent } from "@shared/lib/event-bus";
import { useQuery } from "@tanstack/react-query";
import { GetTodoDto } from "../domain";
import { useTodoService } from "../hooks";

export const useTodos = () => {
  const service = useTodoService();

  const [query] = useQueryParams<GetTodoDto>();

  const result = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const todos = await service.getAll({
        completed: query.completed === "true",
      });
      emitEvent("todo-fetched", {
        total: todos.length,
        completed: todos.filter((todo) => todo.completed).length,
      });

      return todos;
    },
  });

  return result;
};
