export function width_calc(column_name, font) {
  var width = column_name.length;

  if (typeof font === 'undefined') {
    font = '1.25';
    if (width < 11) {
      width = 11;
      font = '1.25';

    }
  }
  else {
    if (width < 11) {
      width = 11;
      font = '1.35';

    }
    if (width > 11) {
      font = '1.35';

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

  var css_value = "calc(" + font + "em * " + width + ")";
  // console.log('css_value', css_value)
  return css_value;
}
export function width_calc_dropdown(input, font) {

  // console.log('input', input)
  // console.log('font', font)
  var width = input.length;
  // console.log('width', width)
  var css_value = "calc(" + font + "em * " + width + ")";
  // console.log('bool', ((parseFloat(font))))
  if ((parseFloat(width) * parseFloat(font)) < 1.25 * 11) {
    // convert string to int
    var width = 11;
    var font = '1.25';
  }
  var css_value = "calc(" + font + "em * " + width + ")";

  return css_value;
}
