import { symbolToString } from "./symbol";

export class LocalStorage<Data> {
  get stringKey() {
    return symbolToString(this.key);
  }

  constructor(public key: string | symbol) {}

  set(value: Data): void {
    localStorage.setItem(this.stringKey, JSON.stringify(value));
  }
  get(): Data {
    const value = localStorage.getItem(this.stringKey);
    return value ? JSON.parse(value) : null;
  }
  clear() {
    localStorage.removeItem(this.stringKey);
  }
}

export class ListLocalStorage<Data extends { id: string }> extends LocalStorage<
  Data[]
> {
  constructor(public key: string | symbol) {
    super(key);
  }

  set(value: Data[]) {
    localStorage.setItem(this.stringKey, JSON.stringify(value));
  }

  get(predicate?: (item: Data) => boolean): Data[] {
    const value = localStorage.getItem(this.stringKey);
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

  count() {
    return this.get().length;
  }
}
