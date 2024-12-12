import { apiEndpoint } from "@config/api.conf";
import { faker } from "@faker-js/faker";
import { Todo } from "@mod/todo/domain";
import { ListLocalStorage } from "@shared/lib/local-storage";
import { Creation, Updating } from "@shared/types";
import { http, HttpResponse } from "msw";

const endpoint = (path: string) => `${apiEndpoint}${path}`;

const db = new ListLocalStorage<Todo>("todos");

export const handlers = [
  http.get(endpoint("/todos"), () => {
    const result = db.get();
    result.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    return HttpResponse.json(result);
  }),
  http.get<{ id: string }>(endpoint("/todos/:id"), ({ params }) => {
    const { id } = params;
    return HttpResponse.json(db.getOne(id));
  }),
  // create todo
  http.post<never, Creation<Todo>>(endpoint("/todos"), async ({ request }) => {
    const payload = await request.json();
    const todo = {
      ...payload,
      id: faker.string.uuid(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    db.add(todo);
    return HttpResponse.json(db.getOne(todo.id), { status: 201 });
  }),
  // delete todo
  http.delete<{ id: string }>(endpoint("/todos/:id"), async ({ params }) => {
    const { id } = params;
    db.remove(id);
    return new HttpResponse(null, { status: 204 });
  }),
  // update todo
  http.put<{ id: string }, Updating<Todo>>(
    endpoint("/todos/:id"),
    async ({ params, request }) => {
      const { id } = params;
      const payload = await request.json();
      db.update(id, payload);
      return HttpResponse.json(db.getOne(id));
    }
  ),
];
