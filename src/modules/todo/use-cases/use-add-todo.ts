import { useCustomMutation } from "@shared/hooks";
import { emitEvent } from "@shared/lib/event-bus";
import { Creation } from "@shared/types";
import { Todo } from "../domain";
import { useTodoService } from "../hooks";

export const useAddTodo = () => {
  const service = useTodoService();

  return useCustomMutation(
    async (data: Creation<Todo>) => {
      const result = await service.create(data);
      emitEvent("todo-created", {
        id: result.id,
        completed: result.completed,
        title: result.description,
      });
    },
    {
      queryKey: ["todos"],
    }
  );
};
