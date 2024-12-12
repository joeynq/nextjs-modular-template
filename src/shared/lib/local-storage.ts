export class LocalStorage<Data extends { id: string }> {
  constructor(private key: string) {}

  set(value: Data[]) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  get(predicate?: (item: Data) => boolean): Data[] {
    const value = localStorage.getItem(this.key);
    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value) as Data[];
    if (!predicate) {
      return parsed;
    }

    return parsed.filter(predicate);
  }

  getOne(id: string): Data | null {
    const value = this.get((item) => item.id === id);
    return value.length ? value[0] : null;
  }

  add(item: Data) {
    const value = this.get();
    this.set([...value, item]);
  }

  remove(id: string) {
    const value = this.get();
    this.set(value.filter((item) => item.id !== id));
  }

  update(id: string, data: Partial<Data>) {
    const value = this.get();
    const index = value.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }

    value[index] = { ...value[index], ...data };
    this.set(value);
  }
}
