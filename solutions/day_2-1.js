const fs = require('fs')
fs.readFile('../problem-data/day_2.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const intCodes = contents.split(',').map(intCode => Number(intCode))
  for (let i = 0; i < intCodes.length; i += 4) {
    const opCode = intCodes[i]
    const firstPosition = intCodes[i + 1]
    const secondPosition = intCodes[i + 2]
    const resultPosition = intCodes[i + 3]
    if (opCode === 1) {
      intCodes[resultPosition] = intCodes[firstPosition] + intCodes[secondPosition]
    }
    if (opCode === 2) {
      intCodes[resultPosition] = intCodes[firstPosition] * intCodes[secondPosition]
    }
    if (opCode === 99) {
      console.log(intCodes[0])
    }
  }
})
// answer: 11590668