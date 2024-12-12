import { useCustomMutation } from "@shared/hooks/use-custom-mutation";
import { useTodoService } from "../impl";

export const useAddTodo = () => {
  const service = useTodoService();
  return useCustomMutation(service.create.bind(service), {
    queryKey: ["todos"],
  });
};
