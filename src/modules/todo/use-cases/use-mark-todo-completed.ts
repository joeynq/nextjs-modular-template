import { useCustomMutation } from "@shared/hooks";
import { useTodoService } from "../hooks";

export const useMarkTodoCompleted = () => {
  const service = useTodoService();
  return useCustomMutation(service.markAsCompleted.bind(service), {
    queryKey: ["todos"],
  });
};
