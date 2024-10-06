export const generateMatrix = (size) => {
    let matrix = [];
  
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        if (i % 5 === 0 || j % 5 === 0 || i === size - 1 || j === size - 1) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      matrix.push(row);
    }
  
    return matrix;
  };