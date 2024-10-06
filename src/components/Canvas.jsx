// imports for React, Car class and pat
import React, { useRef, useEffect } from "react";
import Car from "./Car";
import { getPath } from "./pathFinder";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
//
const Canvas = (props) => {
  const movementEnum = Object.freeze({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    RIGHT: 3,
    LEFT: 4,
  });

  let matrix = props.matrix;

  let bgColor = "#c4c4c4";
  let notRoadColor = "#00aa33";
  let roadColor = "#c4c4c4";
  let carColor = "#ff1111";

  const canvasRef = useRef(null);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const randint = () => {
    return (Math.random() % 3) + 1;
  };

  const drawBackground = (ctx) => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawCar = (ctx, car, clr) => {
    ctx.fillStyle = clr;
    ctx.fillRect(
      Math.floor((car.y * ctx.canvas.width) / matrix.length) +
        Math.floor(ctx.canvas.width / matrix.length / 4),
      Math.floor((car.x * ctx.canvas.height) / matrix.length) +
        Math.floor(ctx.canvas.height / matrix.length / 4),
      car.width,
      car.height
    );
  };

  const generateCars = (ctx, cars) => {
    for (let car of cars) {
      drawCar(ctx, car, carColor);
      car.path = getPath(matrix, car);
    }
  };

  const runCars = (ctx, cars) => {
    setInterval(function () {
      moveAllCars(ctx, cars);
    }, 250);
  };

  const moveAllCars = (ctx, cars) => {
    for (let car of cars) {
      moveCar(ctx, car, cars);
    }
  };

  const moveCar = async (ctx, car, cars) => {
    if (car.x < 0) {
      car.x = 0;
      return;
    } else if (car.x > matrix.length - 1) {
      car.x = matrix.length - 1;
      return;
    }
    if (car.y < 0) {
      car.y = 0;
      return;
    } else if (car.y > matrix.length - 1) {
      car.y = matrix.length - 1;
      return;
    }

    drawCar(ctx, car, roadColor);
    // move here!
    if (car.pathIndex < car.path.length) {
      const currIndex = car.pathIndex;
      car.x = car.path[car.pathIndex][0];
      car.y = car.path[car.pathIndex][1];
      if (car.speed === 1) {
        car.pathIndex++;
      } else if (car.speed === 2 && car.pathIndex + 2 < car.path.length) {
        car.pathIndex += 2;
      } else if (car.speed === 3 && car.pathIndex + 3 < car.path.length) {
        car.pathIndex += 3;
      } else {
        car.pathIndex++;
      }
    }

    drawCar(ctx, car, carColor);
  };

  const createBoardFromMatrix = (ctx) => {
    ctx.fillStyle = "#000000";
    let height = ctx.canvas.height;
    let width = ctx.canvas.width;

    let blockWidth = width / matrix.length;
    let blockHeight = height / matrix.length;

    let matrixSize = matrix.length; // for square matricies only
    for (let row = 0; row < matrixSize; row++) {
      // visual representation of matrix
      for (let col = 0; col < matrixSize; col++) {
        let block = matrix[row][col];
        let blockX = col * blockWidth;
        let blockY = row * blockHeight;

        if (block == 0) {
          ctx.fillStyle = notRoadColor;
          ctx.stroke();
          ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
        } else if (block == 1) {
          ctx.fillStyle = roadColor;
          ctx.stroke();
          ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.canvas.width = window.innerWidth - 50;
    context.canvas.height = window.innerHeight - 50;

    const screenWidth = context.canvas.width;
    const screenHeight = context.canvas.height;

    const carWidth = Math.floor(screenWidth / matrix.length / 2);
    const carHeight = Math.floor(screenHeight / matrix.length / 2);

    let cars = [];
    let car = new Car(0, 0, carWidth, carHeight, movementEnum.RIGHT, 2);
    cars.push(car);
    let car2 = new Car(5, 37, carWidth, carHeight, movementEnum.LEFT, 2);
    cars.push(car2);
    let car3 = new Car(49, 0, carWidth, carHeight, movementEnum.UP, 3);
    cars.push(car3);
    let car4 = new Car(0, 25, carWidth, carHeight, movementEnum.DOWN, 1);
    cars.push(car4);
    let car5 = new Car(38, 5, carWidth, carHeight, movementEnum.UP, 2);
    cars.push(car5);

    drawBackground(context);
    createBoardFromMatrix(context);
    generateCars(context, cars);
    runCars(context, cars);
  }, []);

  return <canvas ref={canvasRef} {...props} id="main" />;
};

export default Canvas;
