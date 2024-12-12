import { useHttp } from "@shared/hooks";
import { TodoService } from "../domain";
import { TodoRepositoryImpl } from "./todo-repository.impl";

export const useTodoService = () => {
  const adapter = useHttp();
  return new TodoService(new TodoRepositoryImpl(adapter));
};
