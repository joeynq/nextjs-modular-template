import { useCustomMutation } from "@shared/hooks/use-custom-mutation";
import { useTodoService } from "../impl";

export const useDeleteTodo = () => {
  const service = useTodoService();
  return useCustomMutation(service.delete.bind(service), {
    queryKey: ["todos"],
  });
};
