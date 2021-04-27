/**
 * Get the number of lists using a picture with a given id.
 */
const listCount = (id, lists) =>
  lists.reduce(
    (count, list) =>
      count + +(list.items.find((item) => item.id === id) !== undefined),
    0
  );

export default listCount;
