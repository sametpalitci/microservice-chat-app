const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

chai.use(chaiHttp);

describe('API GATEWAY TESTS', () => {
    it('(POST /) USERS API', (done) => {
        chai.request(server).post('/api/v1/api-gateway/users/graphql').send({
            query: `mutation{login(email:"johndoe@gmail.com",password:"1234"){token}}`
        }).end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        })
    });
    it('(POST /) CHAT GROUP API', (done) => {
        chai.request(server).post('/api/v1/api-gateway/chat-group/graphql').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh5b3JheEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMDY5ODgxfQ.2mQ-WG7fHA_6K6ZM_CaWNpT5dikrPn4lZH2bj1Q_vX4').send({
            query: `query{ getGroup { name } }`
        }).end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        })
    });
    it('(GET /) CHAT API', (done) => {
        chai.request(server).get('/api/v1/api-gateway/chat/helloTest').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh5b3JheEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMDY5ODgxfQ.2mQ-WG7fHA_6K6ZM_CaWNpT5dikrPn4lZH2bj1Q_vX4').send({
            query: `query{ getGroup { name } }`
        }).end((err, res) => {
            chai.expect(res).to.have.status(404);
            done();
        })
    });
})