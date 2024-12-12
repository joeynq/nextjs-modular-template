import { Creation, Updating } from "@shared/types";
import { GetTodoDto } from "./get-todo.dto";
import { Todo } from "./todo.entity";

export interface TodoRepository {
  create(todo: Creation<Todo>): Promise<Todo>;
  getAll(dto?: GetTodoDto): Promise<Todo[]>;
  update(id: string, todo: Updating<Todo>): Promise<Todo>;
  getById(id: string): Promise<Todo | null>;
  delete(id: string): Promise<void>;
}
