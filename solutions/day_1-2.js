const fs = require('fs')
fs.readFile('../problem-data/day_1.txt', 'utf-8', (err, contents) => {
  if (err) {
    console.error(err)
  }
  const modulesMass = contents.split('\n').map(mass => Number(mass))
  let fuelTotal = 0
  const calculateFuel = (mass) => Math.floor(mass / 3) - 2
  const totalUpFuelCount = (mass) => {
    const fuelAmount = calculateFuel(mass)
    if (fuelAmount > 0) {
      fuelTotal += fuelAmount
      totalUpFuelCount(fuelAmount)
    }
  }
  modulesMass.forEach(mass => totalUpFuelCount(mass))
  console.log(fuelTotal)
})
