import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);

//Test the route of petition
  
describe('petition routes test', () => {
    it('it should GET all the petitions', (done) => {
      chai.request(app)
          .get('/api/v1/petition')
          .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');  
            done();
          });
    });
    
    it('it should be able to Create a petiton', (done)=>{
        const petitions={
            id:1,
        createdon:1,
        createdby:1,
        office:3,
        body:"i don't agree with final votes",

        };
        chai.request(app)
            .post('/api/v1/petition')
            .send(petitions)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should GET a single petition', (done)=>{
        chai.request(app)
            .get('/api/v1/petition/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not  GET a single petition', (done)=>{
        chai.request(app)
            .get('/api/v1/petition/6')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });


    


    it('it should be able to Delete a petiton', (done)=>{
        chai.request(app)
            .delete('/api/v1/petition/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Delete a petiton', (done)=>{
        chai.request(app)
            .delete('/api/v1/petition/7')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });


});