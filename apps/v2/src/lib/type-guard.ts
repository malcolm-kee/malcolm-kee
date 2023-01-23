export const isNotNil = <Value>(
  value: Value | undefined | null
): value is Value => value != null;
