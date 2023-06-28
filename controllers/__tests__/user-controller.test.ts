import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import chaiHttp from 'chai-http';
import { getUsers } from '../user-controller'; // Your Express app instance or middleware
chai.use(chaiHttp);



describe('UserController', () => {
   it('should return a list of users', async () => {
      const response = await chai.request("http://localhost:3001")
         .get('/api/users')
      // allUsers.res.should.have.lengthOf.at.least(1);
      expect(response.status).to.equal(200);
      console.log(response.body)
      expect(response.body).to.be.an('array');
      // expect(response.body).to.have.lengthOf.at.least(1);
   });

   // it('should create a new user', async () => {
   //    const response = await request.post('/users').send({ username: 'JohnDoe' });

   //    expect(response.status).to.equal(201);
   //    expect(response.body).to.be.an('object');
   //    expect(response.body).to.have.property('id');
   //    expect(response.body).to.have.property('username', 'JohnDoe');
   // });

   // Add more test cases as needed
});
