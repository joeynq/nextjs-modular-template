import { faker } from "@faker-js/faker";
import { Todo } from "@mod/todo/domain";

const generateTodo = (): Todo => ({
  id: faker.string.uuid(),
  description: faker.lorem.words(),
  dueDate: faker.date.future().toISOString(),
  completed: faker.datatype.boolean(),
  createdAt: faker.date.recent().toISOString(),
});

export const todos = Array.from({ length: 10 }, generateTodo);
