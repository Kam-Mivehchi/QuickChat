import chai, { expect } from 'chai';
import User, { INewUser, IUser } from '../../models/user'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const request = chai.request("http://localhost:3001");


describe('UserController', () => {
   before(() => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')
   });

   after(async () => {
      // Disconnect from the test database
      await User.deleteOne({ username: "controller-test-user" })
      await User.deleteOne({ username: "updated-controller-test-user" })

      await mongoose.disconnect();
   });


   describe("/api/users", () => {
      const newUser: INewUser = {
         username: "controller-test-user",
         email: "controller-test-user@email.com",
         password: "asdfasdf"
      }
      let test_user: IUser;

      it('Register', async () => {

         const response = await request.post('/api/users/register').send(newUser)
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);

         test_user = response.body.user;

         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body.user).to.have.all.keys("__v", "_id", "username", "email", "password", "bio", "avatar");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("Login", async () => {

         const response = await request.post('/api/users/login').send({
            email: "controller-test-user@email.com",
            password: "asdfasdf"
         })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body.user).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it('getUsers', async () => {
         const response = await request
            .get('/api/users')
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);

         expect(response.body).to.be.an('array');
         // expect(response.body).to.have.lengthOf.at.least(1);
      });

      it("getMe", async () => {

         const response = await request.get(`/api/users/${test_user._id}`)
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });

      it("update username", async () => {

         const response = await request.put(`/api/users/${test_user._id}`).send({ username: "updated-controller-test-user" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         expect(response.body.username).to.equal("updated-controller-test-user");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("update bio", async () => {

         const response = await request.put(`/api/users/${test_user._id}`).send({ bio: "updated bio" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         expect(response.body.bio).to.equal("updated bio");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("update avatar", async () => {

         const response = await request.put(`/api/users/${test_user._id}`).send({ avatar: "update" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         expect(response.body.avatar).to.equal("update");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("update password", async () => {

         const response = await request.put(`/api/users/${test_user._id}/recovery`).send({ password: "newpassword" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");

         const checkPSW = await request.post('/api/users/login').send({
            email: "controller-test-user@email.com",
            password: "newpassword"
         })

         expect(checkPSW.status).to.equal(200);
         expect(checkPSW.body).to.be.an('object');
         expect(checkPSW.body).to.have.all.keys('token', 'user');
         expect(checkPSW.body.user).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");

      });



   })
});
