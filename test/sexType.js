var mongoose     =   require("mongoose");
// set Promise provider to bluebird
mongoose.Promise =   require('bluebird');
//model for test
var SexType      =   require('../models/sexType');
//Require the dev-dependencies
var chai         =   require('chai');
var chaiHttp     =   require('chai-http');
//For work whit environment variable.
require('dotenv').config();
//server for test
var server       =  process.env.API_SERVER_TEST;
//For send request to server
chai.use(chaiHttp);

var resource = process.env.API_RESOURCE_ROOT + '/sexTypes';
var resourceBar = resource + '/';

describe('SexTypes', () => {
    beforeEach((done) => {
        SexType.remove({}, (err) => { 
           done();         
        });
    });
  describe('/GET sexTypes ' + server, () => {
      it('it should GET all the sexTypes', () => {
             chai.request(server)
            .get(resource)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eql(0);
            })
            .catch(function (err) {
                console.log("Promise Rejected");
            });
      });
  });

  describe('/POST sexType', () => {
      it('when missing item in payload, should return a 400 ok response and a single error', () => {
        var sexType = {
                code: "MEDICO"
            }
            chai.request(server)
            .post(resource)
            .send(sexType)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.have.property('description');
            })
            .catch(function (err) {
                console.log("Promise Rejected");
            })
      });
      it('it should POST a sexType ', () => {
        var sexType = {
                code: "Hombre",
                description: "H"
            }
            chai.request(server)
            .post(resource)
            .send(sexType)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('message').eql('SexType successfully added!');
                expect(res.body.sexType).to.have.property('code');
                expect(res.body.sexType).to.have.property('description');
                expect(res.body.sexType).to.have.property('enabled');
            })
            .catch(function (err) {
                console.log("Promise Rejected");
            });
      });
  });
  describe('/GET/:id sexType', () => {
      it('it should GET a sexType by the given id', () => {
        var sexType = new SexType({ 
                              code: "Mujer",
                              description: "M"
                            });
        sexType.save((err, sexType) => {
            chai.request(server)
            .get(resource)
            .send(sexType)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.sexType).to.have.property('code');
                expect(res.body.sexType).to.have.property('description');
                expect(res.body.sexType).to.have.property('enabled');
                expect(res.body).to.have.property('_id').eql(sexType.id);
            })
            .catch(function (err) {
                console.log("Promise Rejected");
            });
        });

      });
  });
  describe('/PUT/:id sexType', () => {
      it('it should UPDATE a sexType given the id', () => {
        var sexType = new SexType({ 
                            code: "T",
                            description: "Travesti"
                            })
        sexType.save((err, sexType) => {
                chai.request(server)
                .put(resourceBar + sexType.id)
                .send({ code: "T",
                        description: "Transexual"
                    })
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('message').eql('SexType successfully updated.');
                    expect(res.body.sexType).to.have.property('description').eql("Transexual");
                })
                .catch(function (err) {
                    console.log("Promise Rejected");
                });
          });
      });
  });
  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id sexType', () => {
      it('it should DELETE a sexType given the id', () => {
        var sexType = new SexType({  
                            code: "MAS",
                            description: "Masajista"
                            })
        sexType.save((err, sexType) => {
                chai.request(server)
                .DELETE(resourceBar + sexType.id)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('message').eql('SexType successfully deleted.');
                    expect(res.body.result).to.have.property('ok').eql(1);
                })
                .catch(function (err) {
                    console.log("Promise Rejected");
                });
          });
      });
  });
});