const fs = require('fs')
fs.readFile('../problem-data/day_3-wire-1.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const firstWireDirections = contents.split(',')
  fs.readFile('../problem-data/day_3-wire-2.txt', 'utf-8', (err, contents) => {
    if (err) {
      console.error(err)
    }
    const secondWireDirections = contents.split(',')
    const firstWireCoordinates = drawWire(firstWireDirections)
    const secondWireCoordinates = drawWire(secondWireDirections)
    const intersections = compareLines(firstWireCoordinates, secondWireCoordinates)
    let shortestStepsToIntersection = 0
    intersections.forEach(intersectionPoint => {
      const {wireOneIndex, wireTwoIndex, wireOneMovementBeyondIntersection, wireTwoMovementBeyonIntersection} = intersectionPoint
      const wireOneDirectionsToIntersection = firstWireDirections.slice(0, wireOneIndex + 1)
      const wireOneStepsToIntersection = wireOneDirectionsToIntersection.reduce((prev, curr) => {
        return prev + Math.abs(Number(curr.slice(1)))
      }, 0)
      const wireTwoDirectionsToIntersection = secondWireDirections.slice(0, wireTwoIndex + 1)
      const wireTwoStepsToIntersection = wireTwoDirectionsToIntersection.reduce((prev, curr) => {
        return prev + Math.abs(Number(curr.slice(1)))
      }, 0)

      const stepsToIntersection = wireOneStepsToIntersection - Math.abs(wireOneMovementBeyondIntersection) + wireTwoStepsToIntersection - Math.abs(wireTwoMovementBeyonIntersection)
      // can figure out how far over by knowing the x and y's of the intersection point, similary to how we found the intersection
      if (shortestStepsToIntersection === 0 || stepsToIntersection < shortestStepsToIntersection) {
        shortestStepsToIntersection = stepsToIntersection
      }
    })
    console.log(shortestStepsToIntersection) // 48054 is correct answer
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
        const biggestYValue = Math.max(wireTwoPointOne.yPosition, wireTwoPointTwo.yPosition)
        if (lowestYValue <= wireOnePointOne.yPosition && wireOnePointOne.yPosition <= biggestYValue) {
          // y intersection is possible
          // check X => wire one must intersect at wiretwo x value
          const lowestXValue = Math.min(wireOnePointOne.xPosition, wireOnePointTwo.xPosition)
          const biggestXValue = Math.max(wireOnePointOne.xPosition, wireOnePointTwo.xPosition)
          if (lowestXValue <= wireTwoPointOne.xPosition && wireTwoPointOne.xPosition <= biggestXValue) {
            // we have intersection
            // wire one moves on x axis therefore its y coordinate is the intersection
            // wire two move on y axis therefire its x coordinates is the intersection
            intersectionPoints.push({
              xPosition: wireOnePointOne.xPosition,
              yPosition: wireTwoPointOne.yPosition,
              wireOneIndex: i + 1,
              wireTwoIndex: j + 1,
              wireOneMovementBeyondIntersection: wireTwoPointOne.xPosition - wireOnePointTwo.xPosition,
              wireTwoMovementBeyonIntersection: wireOnePointOne.yPosition - wireTwoPointTwo.yPosition})
          }
        }
      } else if (wireOnePointOne.xPosition === wireOnePointTwo.xPosition && wireTwoPointOne.xPosition !== wireTwoPointTwo.xPosition) {
        // console.log'h
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
            intersectionPoints.push({
              xPosition: wireOnePointOne.xPosition,
              yPosition: wireTwoPointOne.yPosition,
              wireOneIndex: i + 1,
              wireTwoIndex: j + 1,
              wireOneMovementBeyondIntersection: wireTwoPointOne.yPosition - wireOnePointTwo.yPosition,
              wireTwoMovementBeyonIntersection: wireOnePointOne.xPosition - wireTwoPointTwo.xPosition
            })
          }
        }
      }
    }
  }
  return intersectionPoints
}
