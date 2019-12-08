const fs = require('fs')

fs.readFile('../problem-data/day_6.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const testData = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']
  const orbits = contents.split('\n')
  const parsedOrbits = orbits.map(orbitPair => parseOrbits(orbitPair))
  const firstOrbit = parsedOrbits.filter(orbits => orbits.centerBody === 'COM')[0]
  const indexOfFirstOrbit = parsedOrbits.indexOf(firstOrbit)
  parsedOrbits.splice(indexOfFirstOrbit, 1) // remove first orbit

  const removeMappedOrbits = (childOrbits) => {
    childOrbits.forEach(orbit => {
      const indexOfOrbit = parsedOrbits.indexOf(orbit)
      parsedOrbits.splice(indexOfOrbit, 1)
    })
  }
  const mappedOrbits = {}
  let levelFromCom = 0
  const addPlanetToMap = (orbitingBodies) => {
    levelFromCom++
    mappedOrbits[levelFromCom] = orbitingBodies
  }
  mappedOrbits[levelFromCom] = [firstOrbit]
  while (parsedOrbits.length) {
    const orbitingBodies = mappedOrbits[levelFromCom]
    let orbitsAtSameDistance = []
    orbitingBodies.forEach(orbit => {
      const orbistsAroundCurrentBody = parsedOrbits.filter(orbitPair => orbit.orbitingBody === orbitPair.centerBody)
      orbitsAtSameDistance.push(orbistsAroundCurrentBody)
    })
    const flattenOrbits = orbitsAtSameDistance.flat()
    addPlanetToMap(flattenOrbits)
    removeMappedOrbits(flattenOrbits)
  }
  const totalOrbits = sumOrbitMap(mappedOrbits)
  console.log(totalOrbits) // 322508 correct solution
})

function parseOrbits (orbitPair) {
  const indexOfDivide = orbitPair.indexOf(')')
  const centerBody = orbitPair.slice(0, indexOfDivide)
  const orbitingBody = orbitPair.slice(indexOfDivide + 1)
  return {
    centerBody,
    orbitingBody
  }
}

function sumOrbitMap (mappedOrbitLevels) {
  const orbitlevels = Object.keys(mappedOrbitLevels)
  let totalNumberOfOrbits = 0
  for (let level of orbitlevels) {
    totalNumberOfOrbits += mappedOrbitLevels[level].length * (Number(level) + 1)
  }
  return totalNumberOfOrbits
}
// All i'm really counting is the distance away from the center, not the actual mapped connection
// L = 7 orbits
// K = 6
// J = 5
// F = 5
// E = 4
// I = 4
// D = 3
// C = 2
// B = 1
// G = 2
// H = 3
// const testSum = [7, 6, 5, 5, 4, 4, 3, 2, 1, 2, 3].reduce((a, b) => a + b)
// console.log('test sum', testSum) // it is 42
// so sum of all orbits is from the center, to each planet as an endpoint
