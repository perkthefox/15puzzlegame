export const swap = (array, from, to) => {
  const t = array[from];
  array[from] = array[to];
  array[to] = t;

  return array;
}

