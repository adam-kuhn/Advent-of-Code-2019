const fs = require('fs')
const fileContents = fs.readFileSync('../problem-data/day_8.txt', 'utf-8')

const pixelData = fileContents.split('').map(Number)
const pictureWidth = 25
const pictureHeight = 6
const pixelsPerLayer = pictureWidth * pictureHeight
let largestAmountOfNonZeroPixels = 0
let mostNonZeroPixels
for (let i = 0; i < pixelData.length; i += pixelsPerLayer) {
  const pixelsInLayer = pixelData.slice(i, pixelsPerLayer + i)
  const nonZeroPixels = pixelsInLayer.filter(pixel => pixel !== 0)
  if (nonZeroPixels.length > largestAmountOfNonZeroPixels) {
    largestAmountOfNonZeroPixels = nonZeroPixels.length
    mostNonZeroPixels = nonZeroPixels
  }
}
const numberOfOnePixels = mostNonZeroPixels.filter(pixel => pixel === 1).length
const numberOfTwoPixels = mostNonZeroPixels.filter(pixel => pixel === 2).length
console.log(numberOfOnePixels * numberOfTwoPixels) // solution 1703
