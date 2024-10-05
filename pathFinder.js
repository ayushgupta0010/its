import Car from "./Car.js";
import { getMatrix } from "./matrix.js";
import { generateMatrix } from "./matrixGenerator.js";
import Queue from "./queue.js";

const matrix = generateMatrix(5);

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const getPath = (car) => {
  const finish = matrix.length - 1;

  const queue = new Queue();
  const visited = Array.from({ length: matrix.length }, () =>
    new Array(matrix.length).fill(false),
  );
  const previous = Array.from({ length: matrix.length }, () =>
    new Array(matrix.length).fill(null),
  );

  visited[car.x][car.y] = true;
  queue.enqueue(new Cell(car.x, car.y));

  while (!queue.isEmpty()) {
    const curr = queue.dequeue();

    if (curr.x === finish && curr.y === finish) {
      console.log(reconstructPath(previous, curr)); // Reconstruct and log the path
      return;
    }

    const neighbors = [
      { x: curr.x - 1, y: curr.y }, // North
      { x: curr.x + 1, y: curr.y }, // South
      { x: curr.x, y: curr.y + 1 }, // East
      { x: curr.x, y: curr.y - 1 }, // West
    ];

    for (const neighbor of neighbors) {
      if (
        isValidCell(neighbor.x, neighbor.y) &&
        !visited[neighbor.x][neighbor.y] &&
        matrix[neighbor.x][neighbor.y] === 1
      ) {
        visited[neighbor.x][neighbor.y] = true;
        previous[neighbor.x][neighbor.y] = curr; // Track previous cell
        queue.enqueue(new Cell(neighbor.x, neighbor.y));
      }
    }
  }
  // while (!queue.isEmpty()) {
  //   let isDeadEnd = true;

  //   const curr = queue.peek();

  //   console.log(visited);

  //   if (curr.x == finish && curr.y == finish) {
  //     console.log(queue.path());
  //     return;
  //   }

  //   // console.log(queue.path());
  //   // console.log(matrix);

  //   // move north
  //   if (
  //     isValidCell(curr.x - 1, curr.y) &&
  //     !visited[curr.x - 1][curr.y] &&
  //     matrix[curr.x - 1][curr.y] === 1
  //   ) {
  //     queue.enqueue(new Cell(curr.x - 1, curr.y));
  //     visited[curr.x - 1][curr.y] = true;
  //     isDeadEnd = false;
  //   }

  //   // move south
  //   if (
  //     isValidCell(curr.x + 1, curr.y) &&
  //     !visited[curr.x + 1][curr.y] &&
  //     matrix[curr.x + 1][curr.y] === 1
  //   ) {
  //     queue.enqueue(new Cell(curr.x + 1, curr.y));
  //     visited[curr.x + 1][curr.y] = true;
  //     isDeadEnd = false;
  //   }

  //   // move east
  //   if (
  //     isValidCell(curr.x, curr.y + 1) &&
  //     !visited[curr.x][curr.y + 1] &&
  //     matrix[curr.x][curr.y + 1] === 1
  //   ) {
  //     queue.enqueue(new Cell(curr.x, curr.y + 1));
  //     visited[curr.x][curr.y + 1] = true;
  //     isDeadEnd = false;
  //   }

  //   // move west
  //   if (
  //     isValidCell(curr.x, curr.y - 1) &&
  //     !visited[curr.x][curr.y - 1] &&
  //     matrix[curr.x][curr.y - 1] === 1
  //   ) {
  //     queue.enqueue(new Cell(curr.x, curr.y - 1));
  //     visited[curr.x][curr.y - 1] = true;
  //     isDeadEnd = false;
  //   }

  //   if (isDeadEnd) {
  //     matrix[curr.x][curr.y] = 2;
  //     queue.dequeue();
  //   }
  // }
};

const reconstructPath = (previous, curr) => {
  const path = [];
  while (curr) {
    path.push([curr.x, curr.y]);
    curr = previous[curr.x][curr.y];
  }
  return path.reverse(); // Reverse the path to get start to finish
};

const isValidCell = (x, y) =>
  x >= 0 && x <= matrix.length - 1 && y >= 0 && y <= matrix.length - 1;

getPath(new Car(0, 0));
