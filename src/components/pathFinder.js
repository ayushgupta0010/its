import Queue from "./queue.js";

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export const getPath = (matrix, car) => {
  const finish = matrix.length - 1;

  const queue = new Queue();
  const visited = Array.from({ length: matrix.length }, () =>
    new Array(matrix.length).fill(false),
  );
  const previous = Array.from({ length: matrix.length }, () =>
    new Array(matrix.length).fill(null),
  );

  visited[Math.floor(car.x)][Math.floor(car.y)] = true;
  queue.enqueue(new Cell(Math.floor(car.x), Math.floor(car.y)));

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();

    if (curr.x === finish && curr.y === finish) {
      return reconstructPath(previous, curr);
    }

    const neighbors = [
      { x: curr.x - 1, y: curr.y }, // North
      { x: curr.x + 1, y: curr.y }, // South
      { x: curr.x, y: curr.y + 1 }, // East
      { x: curr.x, y: curr.y - 1 }, // West
    ];

    for (const neighbor of neighbors) {
      if (
        isValidCell(matrix, neighbor.x, neighbor.y) &&
        !visited[neighbor.x][neighbor.y] &&
        matrix[neighbor.x][neighbor.y] === 1
      ) {
        visited[neighbor.x][neighbor.y] = true;
        previous[neighbor.x][neighbor.y] = curr; // Track previous cell
        queue.enqueue(new Cell(neighbor.x, neighbor.y));
      }
    }
  }
};

const reconstructPath = (previous, curr) => {
  const path = [];
  while (curr) {
    path.push([curr.x, curr.y]);
    curr = previous[curr.x][curr.y];
  }
  return path.reverse(); // Reverse the path to get start to finish
};

const isValidCell = (matrix, x, y) =>
  x >= 0 && x <= matrix.length - 1 && y >= 0 && y <= matrix.length - 1;