import { Creation } from "@shared/types";
import { GetTodoDto } from "./get-todo.dto";
import { Todo } from "./todo.entity";
import { TodoRepository } from "./todo.repository";

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async create(todo: Creation<Todo>): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  async markAsCompleted(id: string): Promise<Todo> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    if (todo.completed) {
      return todo;
    }

    return this.todoRepository.update(id, { completed: true });
  }

  async getAll(dto?: GetTodoDto): Promise<Todo[]> {
    return this.todoRepository.getAll(dto);
  }

  async getIncomplete(): Promise<Todo[]> {
    return this.todoRepository.getAll({ completed: false });
  }

  async delete(id: string): Promise<void> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return this.todoRepository.remove(id);
  }
}
