import { WithGaxios } from "@shared/abstract";
import { Creation, Updating } from "@shared/types";
import { GetTodoDto, Todo, TodoRepository } from "../domain";

export class TodoRepositoryImpl extends WithGaxios implements TodoRepository {
  async create(todo: Creation<Todo>): Promise<Todo> {
    const response = await this.adapter.post<Todo>("/todos", todo);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.adapter.delete(`/todos/${id}`);
  }

  async getAll(dto?: GetTodoDto): Promise<Todo[]> {
    const response = await this.adapter.get<Todo[]>("/todos", {
      params: dto,
    });
    return response.data;
  }

  async getById(id: string): Promise<Todo | null> {
    const response = await this.adapter.get<Todo>(`/todos/${id}`);
    return response.data;
  }

  async update(id: string, todo: Updating<Todo>): Promise<Todo> {
    const response = await this.adapter.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  }
}
