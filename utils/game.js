import { swap } from './array';

export const isEmptyNeighbour = (cellSet, x, y) =>
  cellSet.some(v => v.x === x && v.y === y && v.val === 0);

export const getNeighbours = (cellSet, index) => {
  const cellArray = [];
  const { x, y } = cellSet[index];

  const cells = [
    getElementByCoordinates(cellSet, x, y + 1),
    getElementByCoordinates(cellSet, x, y - 1),
    getElementByCoordinates(cellSet, x - 1, y),
    getElementByCoordinates(cellSet, x + 1, y)
  ]

  cells.forEach(c => {
    if (c.index > -1) {
      cellArray.push(c);
    }
  });

  return cellArray;
}

export const getElementByCoordinates = (cellSet, x, y) => {
  const index = cellSet.findIndex(v => v.x === x && v.y === y);
  return { cell: index > -1 ? cellSet[index] : undefined, index };
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

export const shuffle = (cellSet, diff = 10) => {
  diff = Math.pow(2, diff);
  const len = cellSet.length - 1;

  for (let i = 0; i < diff; i++) {
    const index = cellSet.findIndex(c => c.val === 0);
    const possibleCells = getNeighbours(cellSet, index);
    let randomDirect = Math.round(Math.random() * (possibleCells.length - 1));

    cellSet = recalculateCoords(swap(cellSet, index, possibleCells[randomDirect].index));

  }

  return cellSet;
};
