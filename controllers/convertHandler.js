function ConvertHandler() {
  const re = RegExp('[a-zA-Z]');
  const units = ['gal', 'mi', 'lbs', 'L', 'km', 'kg']
  const convertUnits = ['L', 'km', 'kg', 'gal', 'mi', 'lbs']
  const spells = ['gallons', 'miles', 'pounds', 'liters', 'kilometers', 'kilograms']

  this.getNum = function (input) {
    let result;
    let firstChar = re.exec(input).index;
    let x = input.substring(0, firstChar) || '1'

    var y = x.split(' '); //   '1 1/2'  => '1' '1/2'
    if (y.length > 1) {
      var z = y[1].split['/']; // '1/2' => '1' '2'
      result = (parseFloat(0) + (parseFloat(z[0]) / parseFloat(z[1]))).toFixed(5)
    }
    else { // no spaces
      var z = y[0].split('/');
      if(z.length > 2) {
        result = null
      } else
      if (z.length > 1) {
        // console.log('fraction  length: ', z.length)
        result = (parseFloat(z[0]) / parseFloat(z[1])).toFixed(5);
      } else
      result = parseFloat(z[0]);
    }

    // console.log('init number: ', result, Number(result))
    return Number(result);
  };

  this.getUnit = function (input) {
    let result;
    let x;
    result = RegExp('[a-zA-Z]+').exec(input)[0] ;
    x = units.findIndex(unit => unit.toUpperCase() == result.toUpperCase() )
    result = x >=0 ? units[x]: ''
  
    return  result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    let temp = initUnit.toUpperCase()
    temp = temp == 'L' ? 'L' : temp.toLowerCase()
    result = convertUnits[units.indexOf(temp)] || ''
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    result = spells[units.indexOf(unit)]
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result; 
    switch (initUnit) {
      case 'gal': { result = (initNum * galToL); break; }
      case 'lbs': { result = (initNum * lbsToKg); break; }
      case 'mi': { result = (initNum * miToKm); break; }
      case 'L': { result = (initNum / galToL); break; }
      case 'kg': { result = (initNum / lbsToKg); break; }
      case 'km': { result = (initNum / miToKm); break; }
      default: result = initNum;
    };
    return  Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result
  };

}

module.exports = ConvertHandler;
