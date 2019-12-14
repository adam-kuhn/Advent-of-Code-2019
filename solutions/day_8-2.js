const fs = require('fs')
const fileContents = fs.readFileSync('../problem-data/day_8.txt', 'utf-8')

const pixelData = fileContents.split('').map(Number)
// 25 wide 6 tall
// pixel colors: 0 = black, 1 = white, 2 = transparent
const pictureWidth = 25
const pictureHeight = 6
const pixelsPerLayer = pictureWidth * pictureHeight
let visiblePixels = new Array(pixelsPerLayer).fill(2)
for (let i = 0; i < pixelData.length; i += pixelsPerLayer) {
  const pixelsInLayer = pixelData.slice(i, pixelsPerLayer + i)
  pixelsInLayer.forEach((pixel, index) => {
    if (visiblePixels[index] === 2) {
      visiblePixels[index] = pixel
    }
  })
}
const createImage = (pixels) => {
  let image = ''
  for (let i = 0; i < pixels.length; i += pictureWidth) {
    const pixelRow = pixels.slice(i, pictureWidth + i)
    const line = pixelRow.map(pixel => pixel === 1 ? 'X' : ' ')
    image += line + '\n'
  }
  console.log(image) // solution HCGFE
}
createImage(visiblePixels)
