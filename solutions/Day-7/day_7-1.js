const fs = require('fs')
const fileContents = fs.readFileSync('../../problem-data/day_7.txt', 'utf-8')
const {OP_ADD, OP_MULTI, OP_WRITE, OP_OUTPUT, OP_JUMP_IF_TRUE, OP_JUMP_IF_FALSE, OP_LESS_THAN, OP_EQUALS, OP_END} = require('./op-codes.js')
const {INC_BY_2, INC_BY_3, INC_BY_4, DONT_INC} = require('./increments')

const intCodesOriginal = fileContents.split(',').map(intCode => Number(intCode))
const phaseInputs = [0, 1, 2, 3, 4]
let input = 0
let inc = 0
let maxThrusterValue = 0

const allPossiblePhaseInputs = generateAllPhaseCombinations(phaseInputs)
const runAmplifiers = (phaseInputs) => {
  input = 0
  inc = 0
  phaseInputs.forEach(phase => {
    runProgram(phase, intCodesOriginal)
  })
}

allPossiblePhaseInputs.forEach(phaseInputInstructions => runAmplifiers(phaseInputInstructions))

function runProgram (phaseInput, intCodes) {
  let tick = 0
  const copyOfIntCodes = [...intCodes]
  for (let i = 0; i < copyOfIntCodes.length; i += inc) {
    const testCode = copyOfIntCodes[i]
    const iterableTestCode = testCode.toString().padStart(5, '0').split('').map(Number)
    const opCode = Number(iterableTestCode.slice(3, 5).join(''))
    const firstParamValue = copyOfIntCodes[i + 1]
    const secondParamValue = copyOfIntCodes[i + 2]
    const resultPosition = copyOfIntCodes[i + 3]
    const [lastMode, secondMode, firstMode] = iterableTestCode
    const getValue = (mode, value) => mode === 0 ? copyOfIntCodes[value] : value
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
        copyOfIntCodes[resultPosition] = firstNumber + secondNumber
        inc = INC_BY_4
        break
      }
      case OP_MULTI: {
        copyOfIntCodes[resultPosition] = firstNumber * secondNumber
        inc = INC_BY_4
        break
      }
      case OP_WRITE: {
        copyOfIntCodes[firstParamValue] = tick === 0 ? phaseInput : input
        tick++
        inc = INC_BY_2
        break
      }
      case OP_OUTPUT: {
        input = firstNumber
        maxThrusterValue = firstNumber > maxThrusterValue ? firstNumber : maxThrusterValue
        inc = INC_BY_2
        console.log(maxThrusterValue) // 43812
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
        copyOfIntCodes[resultPosition] = firstNumber < secondNumber ? 1 : 0
        inc = INC_BY_4
        break
      }
      case OP_EQUALS: {
        copyOfIntCodes[resultPosition] = firstNumber === secondNumber ? 1 : 0
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
}
// found this code online - not my algorithim, adapted it to produce combinations "https://rextester.com/OUC90847"
function generateAllPhaseCombinations (phaseInputs) {
  let uniqueCombination = []
  let usedIndexes = []
  let allCombinations = []
  function generateCombination (combinationNumber, start) {
    for (let i = 0; i < phaseInputs.length; i++) {
      if (!usedIndexes[i]) {
        usedIndexes[i] = true
        uniqueCombination[combinationNumber] = phaseInputs[i]
        if (combinationNumber < phaseInputs.length - 1) {
          generateCombination(combinationNumber + 1)
        } else {
          uniqueCombination = [...uniqueCombination]
          allCombinations.push(uniqueCombination)
        }
        usedIndexes[i] = false
      }
    }
  }
  generateCombination(0, 0)
  return allCombinations
}
