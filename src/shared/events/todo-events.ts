export interface TodoEvents {
  "todo-fetched": {
    total: number;
    completed: number;
  };
  "todo-created": {
    id: string;
    title: string;
    completed: boolean;
  };
  "todo-updated": {
    id: string;
    title: string;
    completed: boolean;
  };
}
