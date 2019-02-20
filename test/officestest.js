import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);


//Test the route of offices
  
describe('office routes test', () => {
    it('it should GET all the offices', (done) => {
      chai.request(app)
          .get('/api/v1/office')
          .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');  
            done();
          });
    });

    it('it should be able to Create an office', (done)=>{
        const offices={
            id:1,
            type:"federal",
            name:"police",
        };
        chai.request(app)
            .post('/api/v1/office')
            .send(offices)
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should be able to Update an office', (done)=>{
        const offices={
            id:1,
            type:"federal",
            name:"police",
        };
        chai.request(app)
            .put('/api/v1/office/1')
            .send(offices)
            .end((err, res)=>{
                console.log(res.body);
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Update an office', (done)=>{
        const offices={
            id:1,
            type:"fedelal" ,
            name:"police",
        };
        chai.request(app)
            .put('/api/v1/parties/14')
            .send(offices)
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });


    it('it should GET a single office', (done)=>{
        chai.request(app)
            .get('/api/v1/office/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not GET a single office', (done)=>{
        chai.request(app)
            .get('/api/v1/office/45')
            .end((err, res)=>{
                res.should.have.property('status').eql(400);
                res.body.should.be.a('object');
            done();
            });
    });

    
    
    

    it('it should be able to Delete an office', (done)=>{
        chai.request(app)
            .delete('/api/v1/office/1')
            .end((err, res)=>{
                res.should.have.property('status').eql(200);
                res.body.should.be.a('object');
            done();
            });
    });

    it('it should not be able to Delete an office', (done)=>{
        chai.request(app)
            .delete('/api/v1/office/12')
            .end((err, res)=>{
                res.should.have.property('status').eql(404);
                res.body.should.be.a('object');
            done();
            });
    });

});