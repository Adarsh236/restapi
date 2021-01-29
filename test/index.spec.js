let mongooseDB = require('../src/db/connection');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../index.js');

chai.use(chaiHttp);

//Our parent block
describe('Test RandomNumber', () => {
    before((done) => {
        mongooseDB
            .connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    /*
     * Test the /GET route
     */
    describe('/GET RandomNumbers', () => {
        it('it should GET all the RandomNumber', (done) => {
            chai.request(server)
                .get('/randomNumber')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result').be.a('array');
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id RandomNumbers', () => {
        it('it return new generated Random Number', (done) => {
            const input = 2;
            chai.request(server)
                .get('/randomNumber/' + input)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('id');
                    res.body.result.should.have.property('number');
                    res.body.result.should.have.property('size').eql(input);
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id RandomNumbers', () => {
        it('it return an error after passing string', (done) => {
            const input = 's2s5d';
            const actual = 'Please provide valid number greater than 0';
            chai.request(server)
                .get('/randomNumber/' + input)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(actual);
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id RandomNumbers', () => {
        it('it return new generated Random Number before passed string begin', (done) => {
            const input = '5s5d';
            const actual = 5;
            chai.request(server)
                .get('/randomNumber/' + input)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('id');
                    res.body.result.should.have.property('number');
                    res.body.result.should.have.property('size').eql(actual);
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id RandomNumbers', () => {
        it('it return an error after passing negative number', (done) => {
            const input = -1;
            const actual = 'Please provide valid number greater than 0';
            chai.request(server)
                .get('/randomNumber/' + input)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(actual);
                    done();
                });
        });
    });
    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id RandomNumbers', () => {
        it('it return an error after passing not possible combination', (done) => {
            // The random number should be 13 digits in length.
            const lengthOfRN = 13;
            // Total unique possible RN to be generated
            const possibleCombination = Math.pow(2, lengthOfRN);
            const input = possibleCombination + 1;
            const actual = 'Please try again later! limit exceeded';
            chai.request(server)
                .get('/randomNumber/' + input)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(actual);
                    done();
                });
        });
    });
});
