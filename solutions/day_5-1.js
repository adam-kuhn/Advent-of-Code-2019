const fs = require('fs')
const OP_ADD = 1
const OP_MULTI = 2
const OP_WRITE = 3
const OP_OUTPUT = 4
const OP_END = 99
fs.readFile('../problem-data/day_5.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const input = 1
  const intCodes = contents.split(',').map(intCode => Number(intCode))
  console.log(intCodes)
  for (let i = 0; i < intCodes.length; i++) {
    const testCode = intCodes[i]
    const iterableTestCode = testCode.toString().padStart(5, '0').split('').map(Number)
    const opCode = Number(iterableTestCode.slice(3, 5).join(''))
    const firstParamValue = intCodes[i + 1]
    const secondParamValue = intCodes[i + 2]
    const resultPosition = intCodes[i + 3]
    const [lastMode, secondMode, firstMode] = iterableTestCode
    const getValue = (mode, value) => mode === 0 ? intCodes[value] : value
    switch (opCode) {
      case OP_ADD: {
        const firstNumber = getValue(firstMode, firstParamValue)
        const secondNumber = getValue(secondMode, secondParamValue)
        intCodes[resultPosition] = firstNumber + secondNumber
        i += 3
        break
      }
      case OP_MULTI: {
        const firstNumber = getValue(firstMode, firstParamValue)
        const secondNumber = getValue(secondMode, secondParamValue)
        intCodes[resultPosition] = firstNumber * secondNumber
        i += 3
        break
      }
      case OP_WRITE: {
        intCodes[firstParamValue] = input
        i++
        break
      }
      case OP_OUTPUT: {
        const output = getValue(firstMode, firstParamValue)
        console.log(output) // solution/final outpust 13547311
        i++
        break
      }
      case OP_END: {
        return
      }
      default:
        console.log(`Error: recieved invalid OP Code: ${opCode}`)
    }
  }
})
