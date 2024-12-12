import { todos } from "./data";

async function initMocks() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    localStorage.setItem("todos", JSON.stringify(todos));
    worker.start();
  }
}

initMocks();

export {};
