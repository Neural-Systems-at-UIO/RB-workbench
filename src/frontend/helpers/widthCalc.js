export function widthCalc (columnName, font) {
  let width = columnName.length

  if (typeof font === 'undefined') {
    font = '1.25'
    if (width < 11) {
      width = 11
      font = '1.25'
    }
  } else {
    if (width < 11) {
      width = 11
      font = '1.35'
    }
    if (width > 11) {
      font = '1.35'
    }
    // if (width > 16) {
    //   // width = 11
    //   font = '1.2'
    // }
    // if (width > 20) {
    //   // width = 11
    //   font = '1.1'
    // }
    // if (width > 25) {
    //   // width = 11
    //   font = '1.0'
    // }
  }

  const cssValue = 'calc(' + font + 'em * ' + width + ')'
  // console.log('cssValue', cssValue)
  return cssValue
}
export function widthCalcDropdown (input, font) {
  // console.log('input', input)
  // console.log('font', font)
  let width = input.length
  // console.log('width', width)
  let cssValue = 'calc(' + font + 'em * ' + width + ')'
  // console.log('bool', ((parseFloat(font))))
  if ((parseFloat(width) * parseFloat(font)) < 1.25 * 11) {
    // convert string to int
    width = 11
    font = '1.25'
  }
  cssValue = 'calc(' + font + 'em * ' + width + ')'

  return cssValue
}
