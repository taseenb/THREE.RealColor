const chroma = require('chroma-js')

function RealColor (r, g, b) {
  THREE.Color.call(this, r, g, b)
}

RealColor.prototype = Object.create(THREE.Color.prototype)

RealColor.prototype.constructor = RealColor

/**
 * Random
 *
 * Set the color to a random color.
 */
function random () {
  this.setStyle(chroma.random())

  return this
}

/**
 * Formatted
 *
 * Returns a formatted string with RGB values from 0 to 255.
 * @param separator The separtor between the values. Default is a space.
 */
function formatted (separator = ' ') {
  const c = this.to255()

  return c.r + separator + c.g + separator + c.b
}

/**
 * To Array 255
 *
 * Same as toArray but with RGB values from 0 to 255
 */
function toArray255 () {
  return this.toArray().map(v => Math.round(v * 255))
}

/**
 * From Array 255
 *
 * Same as toArray but with RGB values from 0 to 255
 */
function fromArray255 (array) {
  this.r = array[0] / 255
  this.g = array[1] / 255
  this.b = array[2] / 255

  return this
}

/**
 * To 255
 *
 * Return an object with RGB values from 0 to 255
 */
function to255 () {
  return {
    r: Math.round(this.r * 255),
    g: Math.round(this.g * 255),
    b: Math.round(this.b * 255)
  }
}

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

/**
 * Mix From To
 *
 * Same as Mix but returns a new RealColor instance. It also requires a start color.
 */
function mixFromTo (startColor, targetColor, progress, mode = 'rgb') {
  var c = chroma.mix(startColor, targetColor, progress, mode).gl()

  // {r: c[0], g: c[1], b: c[2]}

  return new RealColor(c[0], c[1], c[2])
}

// Methods
RealColor.prototype.random = random
RealColor.prototype.formatted = formatted
RealColor.prototype.toArray255 = toArray255
RealColor.prototype.fromArray255 = fromArray255
RealColor.prototype.to255 = to255
RealColor.prototype.mix = mix

// Static methods
RealColor.mixFromTo = mixFromTo

global.RealColor = RealColor
module.exports = RealColor
