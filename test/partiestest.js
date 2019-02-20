import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);

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
            .get('/api/v1/parties/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not GET a single party', (done)=>{
        chai.request(app)
            .get('/api/v1/parties/11')
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
            .put('/api/v1/parties/1')
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
            .put('/api/v1/parties/12')
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
            .patch('/api/v1/parties/1/RPF')
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
            .patch('/api/v1/parties/12/RPFu')
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