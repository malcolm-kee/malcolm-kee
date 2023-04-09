import Dexie, { type Table } from 'dexie';

export interface BlogData {
  path: string;
  info: object;
  resources: Array<string>;
}

class MalcolmDb extends Dexie {
  blogs!: Table<BlogData>;

  constructor() {
    super('malcolmDb');
    this.version(0.1).stores({
      blogs: 'path, info, *resources',
    });
  }
}

export const db = new MalcolmDb();
