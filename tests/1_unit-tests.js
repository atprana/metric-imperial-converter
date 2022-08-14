const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Unit Tests', function(){
     suite('Test Input Number', function() {
         test('Whole number input', function() {
             assert.strictEqual(convertHandler.getNum("5gal"), 5, "5gal should return 5 as a number")
             assert.strictEqual(convertHandler.getNum("3L"), 3, "3L should return 3 as a number")
             assert.strictEqual(convertHandler.getNum("1lbs"), 1, "1lbs should return 1 as a number")
             assert.strictEqual(convertHandler.getNum("15kg"), 15, "5kg should return 15 as a number")
             assert.strictEqual(convertHandler.getNum("25mi"), 25, "25mi should return 25 as a number")
             assert.strictEqual(convertHandler.getNum("51km"), 51, "51km should return 51 as a number")
             assert.strictEqual(convertHandler.getNum("km"), 1, "empty input number should return 1 as number")
         })
         test('Decimal number input', function() {
             assert.strictEqual(convertHandler.getNum("1.5gal"), 1.5, "1.5gal should return 1.5 as a decimal number")
      
         })
     
         test('Fractional number input', function() {
             assert.strictEqual(convertHandler.getNum("1/5gal"), 0.2, "1/5gal should return 0.2 as a decimal number")
         })
     
         test('Fractional number with decimal input', function() {
             assert.strictEqual(convertHandler.getNum("1/1.5gal"), 0.66667, "1/5gal should return 0.2 as a decimal number")
         })
     
         test('Invalid Fractional number with double fraction input', function() {
             assert.equal(convertHandler.getNum("2/1/5gal"), 0, "2/1/5gal should return NaN")
         })
          
         test('No number input', function() {
             assert.equal(convertHandler.getNum("gal"), 1, "No number input should return 1 as Number")
         })
     })
     
suite('Test Input Unit & lower and uppercase unit ', function () {
    test('gal Test', function() {
        assert.equal(convertHandler.getUnit("11gal"), "gal", "11gal should return gal unit as string")
    })
    test('Liters Test', function() {
        assert.equal(convertHandler.getUnit("11L"), "L", "11L should return L unit as string")
    })
    test('lbs Test', function() {
        assert.equal(convertHandler.getUnit("11lBs"), "lbs", "11lbs should return lbs unit as string")
    })
    test('kg Test', function() {
        assert.equal(convertHandler.getUnit("11kg"), "kg", "1gal should return kg unit as string")
    })
    test('mill Test', function() {
        assert.equal(convertHandler.getUnit("11mi"), "mi", "11mi should return mi unit as string")
    })
    test('km Test', function() {
        assert.equal(convertHandler.getUnit("11km"), "km", "11km should return km unit as string")
    })
    test('Invalid unit test', function() {
        assert.equal(convertHandler.getUnit('10Kgr'), '', 'Should check for invalid unit')
    })

})

    suite('Test conversion unit', function() {
        
        test('gal to L ', function() {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'Should convert gal to L')
        }) 
        test('L to gal', function() {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'Should convert L to gal')
        }) 
        test('lbs to kg ', function() {
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg', 'Should convert lbs to kg')
        }) 
        test('kg to lbs', function() {
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs', 'Should convert kg to lbs')
        }) 
        test('mi to km ', function() {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'Should convert mi to km')
        }) 
        test('km to mi', function() {
            assert.equal(convertHandler.getReturnUnit('km'), 'mi', 'Should convert km to mi')
        }) 
    })


});