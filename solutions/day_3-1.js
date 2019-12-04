const fs = require('fs')
fs.readFile('../problem-data/day_3-wire-1.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const firstWireDirections = contents.split(',') // ['R8', 'U5', 'L5', 'D3']
  // console.log(firstWireDirections)
  fs.readFile('../problem-data/day_3-wire-2.txt', 'utf-8', (err, contents) => {
    if (err) {
      console.error(err)
    }
    const secondWireDirections = contents.split(',') // ['U7', 'R6', 'D4', 'L4']//
    const firstWireCoordinates = drawWire(firstWireDirections)
    const secondWireCoordinates = drawWire(secondWireDirections)
    const intersections = compareLines(firstWireCoordinates, secondWireCoordinates)
    let sumOfClostestPoint = 0
    intersections.forEach(intersectionPoint => {
      const {xPosition, yPosition} = intersectionPoint
      const x = Math.abs(Number(xPosition))
      const y = Math.abs(Number(yPosition))
      const distianceFromOrigin = x + y
      if (sumOfClostestPoint === 0 || distianceFromOrigin < sumOfClostestPoint) {
        sumOfClostestPoint = distianceFromOrigin
      }
    })
    console.log(sumOfClostestPoint) // 3247 is correct answer
  })
})

const drawWire = (wireDirections) => {
  let startingXPoint = 0
  let startingYPoint = 0
  const parseDirection = (direction) => {
    const directionCode = direction[0]
    const numberOfSpaces = Number(direction.slice(1))
    if (directionCode === 'R') {
      startingXPoint += numberOfSpaces
    }
    if (directionCode === 'L') {
      startingXPoint -= numberOfSpaces
    }
    if (directionCode === 'U') {
      startingYPoint += numberOfSpaces
    }
    if (directionCode === 'D') {
      startingYPoint -= numberOfSpaces
    }
    return {xPosition: startingXPoint, yPosition: startingYPoint}
  }
  return wireDirections.map(direction => parseDirection(direction))
}

const compareLines = (wireOnePoints, wireTwoPoints) => {
  let intersectionPoints = []
  for (let i = 0; i < wireOnePoints.length - 1; i++) {
    const wireOnePointOne = wireOnePoints[i]
    const wireOnePointTwo = wireOnePoints[i + 1]
    for (let j = 0; j < wireTwoPoints.length - 1; j++) {
      const wireTwoPointOne = wireTwoPoints[j]
      const wireTwoPointTwo = wireTwoPoints[j + 1]
      if (wireOnePointOne.yPosition === wireOnePointTwo.yPosition && wireTwoPointOne.yPosition !== wireTwoPointTwo.yPosition) {
        // wire one moves on X, wire two moves on Y => potential for intersection
        // so intersection must occur at wireOnePointOne.yPosition if there is one
        const lowestYValue = Math.min(wireTwoPointOne.yPosition, wireTwoPointTwo.yPosition)
        const biggestYValuye = Math.max(wireTwoPointOne.yPosition, wireTwoPointTwo.yPosition)
        if (lowestYValue <= wireOnePointOne.yPosition && wireOnePointOne.yPosition <= biggestYValuye) {
          // y intersection is possible
          // check X => wire one must intersect at wiretwo x value
          const lowestXValue = Math.min(wireOnePointOne.xPosition, wireOnePointTwo.xPosition)
          const biggestXValue = Math.max(wireOnePointOne.xPosition, wireOnePointTwo.xPosition)
          if (lowestXValue <= wireTwoPointOne.xPosition && wireTwoPointOne.xPosition <= biggestXValue) {
            // we have intersection
            // wire one moves on x axis therefore its y coordinate is the intersection
            // wire two move on y axis therefire its x coordinates is the intersection
            intersectionPoints.push({xPosition: wireTwoPointOne.xPosition, yPosition: wireOnePointOne.yPosition})
          }
        }
      } else if (wireOnePointOne.xPosition === wireOnePointTwo.xPosition && wireTwoPointOne.xPosition !== wireTwoPointTwo.xPosition) {
        // wire one moves on Y, wire two moves on X => potential for intersection
        // so intersection must occur at wireOnePointOne.xPosition if there is one
        const lowestXValue = Math.min(wireTwoPointOne.xPosition, wireTwoPointTwo.xPosition)
        const biggestXValue = Math.max(wireTwoPointOne.xPosition, wireTwoPointTwo.xPosition)
        if (lowestXValue <= wireOnePointOne.xPosition && wireOnePointOne.xPosition <= biggestXValue) {
          // y intersection is possible
          // check Y => wire one must intersect at wiretwo y value
          const lowestYValue = Math.min(wireOnePointOne.yPosition, wireOnePointTwo.yPosition)
          const biggestYValue = Math.max(wireOnePointOne.yPosition, wireOnePointTwo.yPosition)
          if (lowestYValue <= wireTwoPointOne.yPosition && wireTwoPointOne.yPosition <= biggestYValue) {
            // we have intersection
            // wire one moves on y axis therefore its x coordinate is the intersection point x
            // wire two move on x axis therefire its x coordinates is the intersection
            intersectionPoints.push({xPosition: wireOnePointOne.xPosition, yPosition: wireTwoPointOne.yPosition})
          }
        }
      }
    }
  }
  return intersectionPoints
}
