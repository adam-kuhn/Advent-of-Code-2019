const fs = require('fs')
fs.readFile('../problem-data/day_1.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const modulesMass = contents.split('\n').map(mass => Number(mass))
  const totalFuel = modulesMass.map(mass => Math.floor(mass / 3) - 2).reduce((a, b) => a + b)
  console.log(totalFuel)
})
