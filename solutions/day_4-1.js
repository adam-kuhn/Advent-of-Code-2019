// range of numbers for password 284639-748759
const rangeMin = 284639
const rangeMax = 748759
const possiblePassWords = []
for (let currentNumber = rangeMin; currentNumber < rangeMax; currentNumber++) {
  const digitsOfCurrentNumber = currentNumber.toString().split('')
  let valuesAscend = true
  let isDoubleValue = false
  digitsOfCurrentNumber.forEach((digit, index, self) => {
    const nextDigit = self[index + 1]
    if (digit > nextDigit) {
      valuesAscend = false
    }
    if (digit === nextDigit) {
      isDoubleValue = true
    }
  })
  if (valuesAscend && isDoubleValue) {
    possiblePassWords.push(currentNumber)
  }
}
console.log(possiblePassWords.length) // 895 is correct answer
