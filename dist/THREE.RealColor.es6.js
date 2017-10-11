const chroma = require('chroma-js')
const randomcolor = require('randomcolor')

function RealColor (r, g, b) {
  THREE.Color.call(this, r, g, b)
}

RealColor.prototype = Object.create(THREE.Color.prototype)

RealColor.prototype.constructor = RealColor

function convertToChromaJs (color) {
  return chroma(getChromaJsCompatible(color))
}

function getChromaJsCompatible (color) {
  if (color && color.isColor) {
    color = color.toArray255()
  }

  return color
}

function convertFromChromaJs (color) {
  const c = color.gl()

  this.r = c[0]
  this.g = c[1]
  this.b = c[2]

  return this
}

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
 * Get a random attractive color.
 * Based on https://github.com/davidmerfield/randomColor
 *
 * @param {Object} options See https://github.com/davidmerfield/randomColor
 */
function attractiveRandom (options) {
  return this.setStyle(randomcolor(options))
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
 * Blends startColor and endColor, based on progress (value from 0 to 1).
 * @param startColor Color 1
 * @param endColor Color 2
 * @param progress Value from 0 to 1
 * @param mode Color mode can be rgb, hsl, lab, lch
 */
function mix (startColor, endColor, progress, mode = 'rgb') {
  startColor = getChromaJsCompatible(startColor)
  endColor = getChromaJsCompatible(endColor)

  console.log(startColor, endColor)

  const mixed = chroma.mix(startColor, endColor, progress, mode)

  return this.convertFromChromaJs(mixed)
}

/**
 * Mix From To [STATIC]
 *
 * Same as Mix but returns a new RealColor instance.
 */
function mixFromTo (startColor, endColor, progress, mode = 'rgb') {
  var color = new RealColor()

  color.mix(startColor, endColor, progress, mode)

  return color
}

function darken (value) {
  const c = convertToChromaJs(this).darken(value)
  return this.convertFromChromaJs(c)
}

function brighten (value) {
  const c = convertToChromaJs(this).brighten(value)
  return this.convertFromChromaJs(c)
}

function saturate (value) {
  const c = convertToChromaJs(this).saturate(value)
  return this.convertFromChromaJs(c)
}

function desaturate (value) {
  const c = convertToChromaJs(this).desaturate(value)
  return this.convertFromChromaJs(c)
}

// Methods
RealColor.prototype.darken = darken
RealColor.prototype.brighten = brighten
RealColor.prototype.saturate = saturate
RealColor.prototype.desaturate = desaturate
RealColor.prototype.convertFromChromaJs = convertFromChromaJs
RealColor.prototype.attractiveRandom = attractiveRandom
RealColor.prototype.random = random
RealColor.prototype.formatted = formatted
RealColor.prototype.toArray255 = toArray255
RealColor.prototype.fromArray255 = fromArray255
RealColor.prototype.to255 = to255
RealColor.prototype.mix = mix

// Static methods
RealColor.convertToChromaJs = convertToChromaJs
RealColor.getChromaJsCompatible = getChromaJsCompatible
RealColor.mixFromTo = mixFromTo

global.RealColor = RealColor
module.exports = RealColor
