const fs = require('fs')
fs.readFile('../problem-data/day_2.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const intCodesOriginal = contents.split(',').map(intCode => Number(intCode))
  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      intCodesOriginal[1] = noun
      intCodesOriginal[2] = verb
      const valueAtPositionZero = parseIntCode(intCodesOriginal)
      if (valueAtPositionZero === 19690720) {
        const solution = 100 * intCodesOriginal[1] + intCodesOriginal[2]
        console.log(solution)
      }
    }
  }
})

const parseIntCode = (intCodes) => {
  const intCodesClones = [...intCodes]
  for (let i = 0; i < intCodesClones.length; i += 4) {
    const opCode = intCodesClones[i]
    const firstPosition = intCodesClones[i + 1]
    const secondPosition = intCodesClones[i + 2]
    const resultPosition = intCodesClones[i + 3]
    if (opCode === 1) {
      intCodesClones[resultPosition] = intCodesClones[firstPosition] + intCodesClones[secondPosition]
    }
    if (opCode === 2) {
      intCodesClones[resultPosition] = intCodesClones[firstPosition] * intCodesClones[secondPosition]
    }
    if (opCode === 99) {
      return intCodesClones[0]
    }
  }
}

// solution 2254