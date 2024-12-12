import { TodoService } from "../domain";
import { TodoRepositoryImpl } from "../impl";
import { api } from "../lib/api";

export const useTodoService = () => {
  // TODO: we can use react-hooks to intercept to api, for example getting access token from useAuth()
  return new TodoService(new TodoRepositoryImpl(api));
};
