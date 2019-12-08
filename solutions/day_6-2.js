const fs = require('fs')

fs.readFile('../problem-data/day_6.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const testData = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN']
  const orbits = contents.split('\n')
  const parsedOrbits = orbits.map(orbitPair => parseOrbits(orbitPair))
  const firstOrbit = parsedOrbits.find(orbits => orbits.centerBody === 'COM')
  const bodyYouAreOrbiting = parsedOrbits.find(orbits => orbits.orbitingBody === 'YOU')
  const bodySantaIsOrbiting = parsedOrbits.find(orbits => orbits.orbitingBody === 'SAN')
  const indexOfFirstOrbit = parsedOrbits.indexOf(firstOrbit)
  parsedOrbits.splice(indexOfFirstOrbit, 1) // remove first orbit
  
  const mappedOrbits = {}
  let levelFromCom = 0

  const removeMappedOrbits = (childOrbits) => {
    childOrbits.forEach(orbit => {
      const indexOfOrbit = parsedOrbits.indexOf(orbit)
      parsedOrbits.splice(indexOfOrbit, 1)
    })
  }
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
  const yourPathFromCurrentPositionToCom = createPathFromEndToCom(mappedOrbits, bodyYouAreOrbiting)
  const santasPathFromCurrentPositionToCom = createPathFromEndToCom(mappedOrbits, bodySantaIsOrbiting)
  const firstCommonPlanetWithSanta = findCommonPlanet(yourPathFromCurrentPositionToCom, santasPathFromCurrentPositionToCom)
  const yourPathFromCommonPoint = pathFromCommonPlanet(firstCommonPlanetWithSanta, yourPathFromCurrentPositionToCom)
  const santasPathFromCommonPoint = pathFromCommonPlanet(firstCommonPlanetWithSanta, santasPathFromCurrentPositionToCom)

  const planetTransferToMeetSanta = yourPathFromCommonPoint.length + santasPathFromCommonPoint.length - 2 // minus 2 because it's space in between not the planets themselves
  console.log(planetTransferToMeetSanta) // 496
})

function pathFromCommonPlanet (commonPlanet, entirePath) {
  const startOfIndividualPath = entirePath.find(orbitPair => orbitPair.centerBody === commonPlanet)
  const indexOfCommonPlanet = entirePath.indexOf(startOfIndividualPath)
  const individualPath = entirePath.slice(0, indexOfCommonPlanet + 1)
  return individualPath
}
function findCommonPlanet (pathOne, pathTwo) {
  let firstCommonPlanet
  pathOne.some(orbitPair => {
    const commonPlanet = pathTwo.find(secondPair => orbitPair.centerBody === secondPair.centerBody)
    firstCommonPlanet = commonPlanet
    return firstCommonPlanet
  })
  return firstCommonPlanet.centerBody
}

function parseOrbits (orbitPair) {
  const indexOfDivide = orbitPair.indexOf(')')
  const centerBody = orbitPair.slice(0, indexOfDivide)
  const orbitingBody = orbitPair.slice(indexOfDivide + 1)
  return {
    centerBody,
    orbitingBody
  }
}

function createPathFromEndToCom (mappedOrbits, orbitingBody) {
  const positionFromCom = findDistanceFromCom(mappedOrbits, orbitingBody)
  let currentOrbitingBody = orbitingBody.centerBody
  let path = [orbitingBody]
  for (let level = positionFromCom - 1; level >= 0; level--) {
    const planetOnThePath = mappedOrbits[level].find(orbitPairs => currentOrbitingBody === orbitPairs.orbitingBody)
    path = [planetOnThePath, ...path]
    currentOrbitingBody = planetOnThePath.centerBody
  }
  return path.reverse()
}

function findDistanceFromCom (mappedOrbitLevels, orbitingBody) {
  const orbitlevels = Object.keys(mappedOrbitLevels)
  let positionFromCom
  orbitlevels.forEach(level => {
    const placeInMap = mappedOrbitLevels[level].indexOf(orbitingBody)
    if (placeInMap > -1) {
      positionFromCom = level
    }
  })
  return positionFromCom
}
