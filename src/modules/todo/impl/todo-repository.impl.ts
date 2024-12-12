import { WithAxios } from "@shared/lib/axios";
import { Creation, Updating } from "@shared/types";
import { GetTodoDto, Todo, TodoRepository } from "../domain";

export class TodoRepositoryImpl extends WithAxios implements TodoRepository {
  async create(todo: Creation<Todo>): Promise<Todo> {
    return this.post<Todo>("/todos", todo);
  }

  async remove(id: string): Promise<void> {
    await this.delete(`/todos/${id}`);
  }

  async getAll(dto?: GetTodoDto): Promise<Todo[]> {
    return this.get<Todo[]>("/todos", { params: dto });
  }

  async getById(id: string): Promise<Todo | null> {
    return this.get<Todo>(`/todos/${id}`);
  }

  async update(id: string, todo: Updating<Todo>): Promise<Todo> {
    return this.put<Todo>(`/todos/${id}`, todo);
  }
}
