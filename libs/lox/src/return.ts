export class Return extends Error {
  constructor(public readonly value: any) {
    super();
  }
}
