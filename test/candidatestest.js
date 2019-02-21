import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);

//Test the route of candidates
  
describe('candidates routes test', () => {
    it('it should GET all the candidates', (done) => {
      chai.request(app)
          .get('/api/v1/candidates')
          .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.body.should.be.an('object');  
            done();
          });
    });
    
    it('it should be able to Create a candidates', (done)=>{
        const candidates={
            id:1,
        office:1,
        party:1,
        candidate:1,
        };
        chai.request(app)
            .post('/api/v1/candidates')
            .send(candidates)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
            
    });

    it('it should GET a single candidate', (done)=>{
        chai.request(app)
            .get('/api/v1/candidates/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should GET a single candidate', (done)=>{
        chai.request(app)
            .get('/api/v1/candidates/11')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

    


    it('it should be able to Delete a candidate', (done)=>{
        chai.request(app)
            .delete('/api/v1/candidates/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should be not able to Delete a candidate', (done)=>{
        chai.request(app)
            .delete('/api/v1/candidates/9')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

});


