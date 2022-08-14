const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const server = require('../server');
let convertHandler = new ConvertHandler();
chai.use(chaiHttp);
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite('Functional Tests', function () {
    suite('Convertion Test', function () {

        test('gal to L', function () {
            assert.equal(convertHandler.convert(1, 'gal'), (galToL).toFixed(5), '1 gal should convert to 3.78541 L');
        })
        test('L to gal', function () {
            assert.equal(convertHandler.convert(1, 'L'), (1 / galToL).toFixed(5), '1 L should convert to 0.26417 gal');
        })


        test('lbs to kg', function () {
            assert.equal(convertHandler.convert(1, 'lbs'), (lbsToKg).toFixed(5), '1 lbs should convert to 0.26417 kg');
        })

        test('kg to lbs', function () {
            assert.equal(convertHandler.convert(1, 'kg'), (1 / lbsToKg).toFixed(5), '1 kg should convert to 3.78541 lbs');
        })

        test('mi to km', function () {
            assert.equal(convertHandler.convert(1, 'mi'), (miToKm).toFixed(5), '1 mi should convert to 3.78541 km');
        })
        test('km to mi', function () {
            assert.equal(convertHandler.convert(1, 'km'), (1 / miToKm).toFixed(5), '1 km should convert to 0.26417 mi');
        })
    })
});

suite('HTTP call', function () {
    test("GET /api/convert?input=10L", (done) => {
        chai
            .request(server)
            .get("/api/convert?input=10L")
            .end((req, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, {
                    initNum: 10,
                    initUnit: "L",
                    returnNum: 2.64172,
                    returnUnit: "gal",
                    string: "10 liters converts to 2.64172 gallons",
                });
                done();
            });
    }) 
    test("GET /api/convert?input=32g", (done) => {
        chai
          .request(server)
          .get("/api/convert?input=32g")
          .end((req, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid unit");
            done();
          });
      });
      test("GET /api/convert?input=3/7.2/4kg", (done) => {
        chai
          .request(server)
          .get("/api/convert?input=3/7.2/4kg")
          .end((req, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number");
            done();
          });
      });
      test("GET /api/convert?input=3/7.2/4kilomegagram", (done) => {
        chai
          .request(server)
          .get("/api/convert?input=3/7.2/4kilomegagram")
          .end((req, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number and unit");
            done();
          });
      });
      test("GET /api/convert?input=kg", (done) => {
        chai
          .request(server)
          .get("/api/convert?input=kg")
          .end((req, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {
              initNum: 1,
              initUnit: "kg",
              returnNum: 2.20462,
              returnUnit: "lbs",
              string: "1 kilograms converts to 2.20462 pounds",
            });
            done();
          });
      });


})
