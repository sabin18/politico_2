import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);



//Test the route of user

describe('user routes test', () => {
    it('it should GET all the users', (done) => {
      chai.request(app)
          .get('/api/v1/user')
          .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');  
            done();
          });
    });
    

    it('it should be able to Create a user', (done)=>{
        const users={
            id:1,
            firstname:"kwizera",
            lastname:"kivin", 
            othername:"keke",
            email:"kiki@getMaxListeners.com",
            phonenumber:"083744783892",
            passporturl:"images/arist.jpg",
            isadmin:false,
        };
        chai.request(app)
            .post('/api/v1/user')
            .send(users)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should GET a single user', (done)=>{
        chai.request(app)
            .get('/api/v1/user/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not GET a single user', (done)=>{
        chai.request(app)
            .get('/api/v1/user/7')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

    

    it('it should be able to Update a user', (done)=>{
        const users={
            id:1,
            firstname:"kwizera" ,
            lastname:"kivin", 
            othername:"keke",
            email:"kiki@getMaxListeners.com",
            phonenumber:"083744783892",
            passporturl:"images/arist.jpg",
            isadmin:false,
        };
        chai.request(app)
            .put('/api/v1/user/1')
            .send(users)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Update a user', (done)=>{
        const users={
            id:1,
            firstname:"kwizera" ,
            lastname:"kivin", 
            othername:"keke",
            email:"kiki@getMaxListeners.com",
            phonenumber:"083744783892",
            passporturl:"images/arist.jpg",
            isadmin:false,
        };
        chai.request(app)
            .put('/api/v1/user/6')
            .send(users)
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should be able to Delete a user', (done)=>{
        chai.request(app)
            .delete('/api/v1/user/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Delete a user', (done)=>{
        chai.request(app)
            .delete('/api/v1/user/955')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

});

