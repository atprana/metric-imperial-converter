'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res) {
    let par = req.query.input;
    let num = convertHandler.getNum(par);
    let unit = convertHandler.getUnit(par);

    let retUnit = convertHandler.getReturnUnit(unit)
    let retNum = convertHandler.convert(num,unit)
    let strResult = convertHandler.getString(num,unit, retNum,retUnit)
    let result = {initNum: num, 
                  initUnit: unit,
                  returnNum: retNum, 
                  returnUnit: retUnit, 
                  string: strResult }

    let errmsg = ''
    let validNumber = num != 0;
    if ( !validNumber & (unit=='')) errmsg = 'invalid number and unit' 
       else if (!validNumber) errmsg = 'invalid number'
       else if (unit == '') errmsg ='invalid unit';

    console.log('Input: ', par, '=>',result);
    if (errmsg) res.send(errmsg)
    else res.json(result)
  });
};
