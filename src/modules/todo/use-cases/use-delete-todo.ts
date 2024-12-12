import { useCustomMutation } from "@shared/hooks";
import { useTodoService } from "../hooks";

export const useDeleteTodo = () => {
  const service = useTodoService();
  return useCustomMutation(service.delete.bind(service), {
    queryKey: ["todos"],
  });
};
