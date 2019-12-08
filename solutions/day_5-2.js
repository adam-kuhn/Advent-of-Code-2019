const fs = require('fs')
const OP_ADD = 1
const OP_MULTI = 2
const OP_WRITE = 3
const OP_OUTPUT = 4
const OP_JUMP_IF_TRUE = 5
const OP_JUMP_IF_FALSE = 6
const OP_LESS_THAN = 7
const OP_EQUALS = 8
const OP_END = 99
const INC_BY_2 = 2
const INC_BY_3 = 3
const INC_BY_4 = 4
const DONT_INC = 0
fs.readFile('../problem-data/day_5.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const input = 5
  const intCodes = contents.split(',').map(intCode => Number(intCode))
  let inc = 0
  for (let i = 0; i < intCodes.length; i += inc) {
    const testCode = intCodes[i]
    const iterableTestCode = testCode.toString().padStart(5, '0').split('').map(Number)
    const opCode = Number(iterableTestCode.slice(3, 5).join(''))
    const firstParamValue = intCodes[i + 1]
    const secondParamValue = intCodes[i + 2]
    const resultPosition = intCodes[i + 3]
    const [lastMode, secondMode, firstMode] = iterableTestCode
    const getValue = (mode, value) => mode === 0 ? intCodes[value] : value
    const jumpIfTrue = () => {
      if (firstNumber !== 0) {
        i = secondNumber
        inc = DONT_INC
      } else {
        inc = INC_BY_3
      }
    }
    const jumpIfFalse = () => {
      if (firstNumber === 0) {
        i = secondNumber
        inc = DONT_INC
      } else {
        inc = INC_BY_3
      }
    }
    const firstNumber = getValue(firstMode, firstParamValue)
    const secondNumber = getValue(secondMode, secondParamValue)
    switch (opCode) {
      case OP_ADD: {
        intCodes[resultPosition] = firstNumber + secondNumber
        inc = INC_BY_4
        break
      }
      case OP_MULTI: {
        intCodes[resultPosition] = firstNumber * secondNumber
        inc = INC_BY_4
        break
      }
      case OP_WRITE: {
        intCodes[firstParamValue] = input
        inc = INC_BY_2
        break
      }
      case OP_OUTPUT: {
        console.log(firstNumber) // solution/final output 236453
        break
      }
      case OP_JUMP_IF_TRUE: {
        jumpIfTrue(firstNumber, secondNumber)
        break
      }
      case OP_JUMP_IF_FALSE: {
        jumpIfFalse()
        break
      }
      case OP_LESS_THAN: {
        intCodes[resultPosition] = firstNumber < secondNumber ? 1 : 0
        inc = INC_BY_4
        break
      }
      case OP_EQUALS: {
        intCodes[resultPosition] = firstNumber === secondNumber ? 1 : 0
        inc = INC_BY_4
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
