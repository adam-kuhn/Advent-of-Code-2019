// range of numbers for password 284639-748759
const rangeMin = 284639
const rangeMax = 748759
const possiblePassWords = []
for (let currentNumber = rangeMin; currentNumber < rangeMax; currentNumber++) {
  const digitsOfCurrentNumber = currentNumber.toString().split('')
  let valuesAscend = true
  let isDoubleValue = false
  const repeatedDigits = {}
  digitsOfCurrentNumber.forEach((digit, index, self) => {
    const nextDigit = self[index + 1]
    if (digit > nextDigit) {
      valuesAscend = false
    }
    if (digit === nextDigit) {
      if (!repeatedDigits[digit]) {
        repeatedDigits[digit] = 0
        for (let i = 0; i < self.length; i++) {
          if (digit === self[i]) {
            repeatedDigits[digit]++
          }
        }
      }
    }
  })
  const numberOfRepeatedDigits = Object.values(repeatedDigits)
  if (numberOfRepeatedDigits.indexOf(2) >= 0) {
    isDoubleValue = true
  }
  if (valuesAscend && isDoubleValue) {
    possiblePassWords.push(currentNumber)
  }
}
console.log(possiblePassWords.length) // 591 is correct answer
