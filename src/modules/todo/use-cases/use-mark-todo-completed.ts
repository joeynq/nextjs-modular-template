import { useCustomMutation } from "@shared/hooks/use-custom-mutation";
import { useTodoService } from "../impl";

export const useMarkTodoCompleted = () => {
  const service = useTodoService();
  return useCustomMutation(service.markAsCompleted.bind(service), {
    queryKey: ["todos"],
  });
};
