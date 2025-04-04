var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;

// Test Data
var testInput_firstname = "Test";
var testInput_lastname =  "User";
var testInput_email = "test.user@gmail.com";
var testInput_password = "password123";
var propertyid = 1;
var bookingid = 1;

// Base URL for rent_an_event API
const baseUrl = 'http://localhost:3001/rent_an_event';

describe('Rent An Event Test Cases:', () => {

    // Get Property details
    it("Test Case 1 - Get Property Details", (done) => {
        chai.request(baseUrl)
        .get(`/property/${propertyid}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('array');
            res.status.should.be.equal(200);  
            done();
        });
    });

    // Get Booking details
    it("Test Case 2 - Get Booking Details", (done) => {
        chai.request(baseUrl)
        .get(`/bookings/${bookingid}`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('array');
            res.status.should.be.equal(200);
            done();
        });
    });

    // SignUp User
    it("Test Case 3 - User SignUp", (done) => { 
        const userSignupData = {
            "firstname" : testInput_firstname, 
            "lastname" : testInput_lastname,
            "email": testInput_email,
            "password" : testInput_password
        };

        chai.request(baseUrl)
        .post('/user/signup')
        .send(userSignupData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('responseMessage').equal('User Added');
            done();
        });
    });

    // Login as User
    it("Test Case 4 - User Login", (done) => {
        const userLoginData = {
            "email": testInput_email,
            "password" : testInput_password
        };

        chai.request(baseUrl)
        .post('/user/login')
        .send(userLoginData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            res.body.should.have.property('responseMessage').equal('Login Successful');
            done();
        });
    });

    // Search for Property listings
    it("Test Case 5 - Search for Property Listings", (done) => {
        const propertySearchData = {
            city : "delhi",
            startDate : "2025-04-01",
            endDate : "2025-04-05",
            noOfGuests: "4"
        };

        chai.request(baseUrl)
        .post('/property/search')
        .send(propertySearchData)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
            res.should.be.json;
            expect(res.body).to.be.an('array');
            done();
        });
    });

    // Get User Profile details
    it("Test Case 6 - Get User Profile Details", (done) => {
        chai.request(baseUrl)
        .post('/profile')
        .send({"email": testInput_email})
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
            res.should.be.json;
            var obj = JSON.parse(res.text);
            expect(obj[0].firstname).to.equal(testInput_firstname);
            expect(obj[0].lastname).to.equal(testInput_lastname);
            done();
        });
    });
});
