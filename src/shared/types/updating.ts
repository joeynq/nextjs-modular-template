export type Updating<T> = Omit<Partial<T>, "id" | "createdAt" | "updatedAt">;
