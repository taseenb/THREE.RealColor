const chroma = require('chroma-js')

function RealColor (r, g, b) {
  THREE.Color.call(this, r, g, b)
}

RealColor.prototype = Object.create(THREE.Color.prototype)

RealColor.prototype.constructor = RealColor

/**
 * Mix
 *
 * Returns the linear blend of startColor and endColor, based on progress (value from 0 to 1).
 * @param startColor Color 1
 * @param endColor Color 2
 * @param progress Value from 0 to 1
 * @param mode Color mode can be rgb, hsl, lab, lch
 */
function mix (targetColor, progress, mode = 'rgb') {
  // chroma.mix(startColor, endColor, this.progress(), 'lab').gl()

  if (targetColor && targetColor.isColor) {
    targetColor = targetColor.getHex()
  }

  const thisColor = this.getHex()
  const mixed = chroma.mix(thisColor, targetColor, progress, mode).gl()
  this.r = mixed[0]
  this.g = mixed[1]
  this.b = mixed[2]

  return this
}

RealColor.prototype.mix = mix

global.RealColor = RealColor
module.exports = RealColor
