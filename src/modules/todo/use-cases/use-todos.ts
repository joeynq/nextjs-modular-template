import { useQuery } from "@tanstack/react-query";
import { useTodoService } from "../impl";

export const useTodos = () => {
  const service = useTodoService();

  return useQuery({
    queryKey: ["todos"],
    queryFn: () => service.getAll(),
  });
};
