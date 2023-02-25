export const groupArrayBy = <T, KeyValue>(
  array: T[],
  getGroupByKey: (item: T) => KeyValue[]
) => {
  const result = new Map<KeyValue, T[]>();

  array.forEach((item) => {
    const propValues = getGroupByKey(item);

    propValues.forEach((propValue) => {
      const currentItems = result.get(propValue);

      if (currentItems) {
        currentItems.push(item);
      } else {
        result.set(propValue, [item]);
      }
    });
  });

  return result;
};

export const pickRandomItems = <T>(array: T[], numOfItems: number) =>
  [...array].sort(() => 0.5 - Math.random()).slice(0, numOfItems);
