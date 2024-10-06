class Car{
  constructor(x, y, width, height, movement, speed, path){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.movement = movement
    this.speed = speed
    this.pathIndex = 0
    this.path = []
  } 
}

export default Car