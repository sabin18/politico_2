import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import uuidv1 from 'uuid/v1';
import jwt from 'jwt-simple';

chai.should();
chai.use(chaiHttp);
let token;
let adminToken;

//Test the route of offices



//Test the route of parties
  
describe('Parties routes test', () => {
    it('it should GET all the parties', (done) => {
      chai.request(app)
          .get('/api/v1/parties')
          .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');  
            done();
          });
    });
    
    it('it should be able to Create a party', (done)=>{
        const party={
            id:1,
            name:"RPF",
            HQAddress:"Rusororo",
            logourl:"images/Audio.jpg",
        };
        chai.request(app)
            .post('/api/v1/parties')
            .send(party)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    

    it('it should GET a single party', (done)=>{
        chai.request(app)
            .get('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not GET a single party', (done)=>{
        chai.request(app)
            .get('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e54')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

    

    it('it should be able to Update a party', (done)=>{
        const party={
            id:1,
            name:"RPF",
            HQAddress:"Intare Arena",
            logourl:"images/Audio.jpg",
        };
        chai.request(app)
            .put('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e')
            .send(party)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should be not be able to Update a party', (done)=>{
        const party={
            id:1,
            name:"RPF",
            HQAddress:"Intare Arena",
            logourl:"images/Audio.jpg",
        };
        chai.request(app)
            .put('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e')
            .send(party)
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });
    
    
    it('it should be able to Update a name of a party', (done)=>{
        const party={
            id:1,
            name:"RPF",
        };
        chai.request(app)
            .patch('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e/RPF')
            .send(party)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Update a name of a party', (done)=>{
        const party={
            id:1,
            name:"RPF",
        };
        chai.request(app)
            .patch('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e/RPFu')
            .send(party)
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should be able to Delete a party', (done)=>{
        chai.request(app)
            .delete('/api/v1/parties/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Delete a party', (done)=>{
        chai.request(app)
            .delete('/api/v1/parties/y')
            .end((err, res)=>{
                res.should.have.property('status').eql(400);
                res.body.should.be.a('object');
            done();
            });
    });

});


//invalid
  
before('Create a user who will create a party', (done) => {
    const user = {
      firstname: 'eric',
      lastname: 'turibo',
      phone: '2507123234',
      email: 'hiyyff@gmail.com',
      password: 'ahfahdafd',
      isadmin: 'User',
    };
    chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
      if (error) done(error);
      token = res.body.token;
      done();
    });
  });
  
  describe('It should test party creation', () => {
    beforeEach('Clear data from database', (done) => {
      chai.request(app).delete('/api/v1/parrties').end((error, res) => {
        if (error) done(error);
        done();
      });
    });
    describe('Successful party creation', () => {
      it('It should acknowledge that party was created with created object', (done) => {
        const party = {
          name: 'FPR',
          hqaddress: 'Kigali',
          logourl: 'hhjjffdd',
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('The party was successfully created');
            res.body.should.have.property('re');
            res.body.response.should.have.property('name').eql('FPR');
            res.body.response.should.have.property('hqaddress').eql('Kigali');
            res.body.response.should.have.property('logourl').eql('hhjjffdd');
            done();
          });
      });
    });
  
    describe('invalid input', () => {
      it('It should display an invalid logourl error', (done) => {
        const party = {
            name: 'FPR',
            hqaddress: 'Kigali',
            logourl: '12'
           
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
  
      it('It should display an invalid name error', (done) => {
        const party = {
            name: '33',
            hqaddress: 'Kigali',
            logourl: 'hhjjffdd'
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
  
      it('It should display an invalid hqaddress error', (done) => {
        const party = {
            name: 'FPR',
            hqaddress: '23',
            logourl: 'hhjjffdd'
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
  
    });
  
  
    describe('Absence of a field', () => {
      it('It should display a missing name error', (done) => {
        const party = {
            hqaddress: 'Kigali',
            logourl: 'hhjjffdd'
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('It should display missing hqaddress error', (done) => {
        const party = {
            name: 'FPR',
            logourl: 'hhjjffdd'
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      it('It should display missing  logourl error', (done) => {
        const party = {
            name: 'FPR',
            hqaddress: 'Kigali',
           
        };
        chai.request(app).post('/api/v1/parties').send(party)
          .end((error, res) => {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  
});
  describe('It should get all the parties ', () => {
    let id;
    before('Create a record', (done) => {
      const party = {
        name: 'FPR',
        hqaddress: 'Kigali',
        logourl: 'hhjjffdd',
      };
      chai.request(app).post('/api/v1/parties/1e545b50-35ad-11e9-94fb-5f8a0102205e').send(party)
        .end((error, res) => {
          id = res.body.response.id;
          if (error) done(error);
          done();
        });
    });
    it('it should return a party with a given id', (done) => {
      chai.request(app).get(`/api/v1/parties/${id}`).end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.response.should.have.property('name').eql('FPR');
        res.body.response.should.have.property('hqaddress').eql('Kigali');
        res.body.response.should.have.property('logourl').eql('hhjjffdd');
  
        done();
      });
    });
});