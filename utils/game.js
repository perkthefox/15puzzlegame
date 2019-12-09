
export const isEmptyNeighbour = (cellSet, x, y) =>
  cellSet.some(v => v.x === x && v.y === y && v.val === 0);

export const getElementByCoordinates = (cellSet, x, y) => {
  const index = cellSet.findIndex(v => v.x === x && v.y === y);
  return { cell: cellSet[index], index };
};

export const recalculateCoords = (cellSet) => {
  return cellSet.map(({ val }, i) => {
    return {
      x: i % 4,
      y: Math.floor(i / 4),
      val
    };
  })
};

export const guessSwitchElement = (cellSet, element) => {
  const checkByY = cellSet => {

    if (isEmptyNeighbour(cellSet, element.x, element.y + 1)) {

      return getElementByCoordinates(cellSet, element.x, element.y + 1);

    } else if (isEmptyNeighbour(cellSet, element.x, element.y - 1)) {

      return getElementByCoordinates(cellSet, element.x, element.y - 1);

    }

    return undefined;
  };

  const checkByX = cellSet => {

    if (isEmptyNeighbour(cellSet, element.x + 1, element.y)) {

      return getElementByCoordinates(cellSet, element.x + 1, element.y);

    } else if (isEmptyNeighbour(cellSet, element.x - 1, element.y)) {

      return getElementByCoordinates(cellSet, element.x - 1, element.y);

    }

    return undefined;
  };

  return typeof checkByX(cellSet) !== "undefined"
    ? checkByX(cellSet)
    : checkByY(cellSet);
};
