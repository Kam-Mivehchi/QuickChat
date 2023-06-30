import chai, { expect } from 'chai';
import User, { INewUser, IUser } from '../../models/user'
import Chatroom, { IChatroom } from '../../models/chatroom'
import chaiHttp from 'chai-http';
import mongoose, { ObjectId } from 'mongoose';
chai.use(chaiHttp);
const request = chai.request("http://localhost:3001");


describe('User Routes', () => {

   let token: string;
   let userId: ObjectId;
   let member1: IUser;
   before(async () => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')
      member1 = await User.create({
         username: "User-controller-test_Member1",
         email: "User-controller-test_Member1@test.com",
         password: "asdfasdf"
      } as INewUser)

   });
   after(async () => {
      // Disconnect from the test database
      await User.deleteOne({ username: "controller-test-user" })
      await User.deleteOne({ username: "updated-controller-test-user" })
      await User.deleteOne({ username: "User-controller-test_Member1" })

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

         token = response.body.token
         userId = response.body.user._id
      });
      it('getUsers', async () => {
         const response = await request
            .get('/api/users').set("Authorization", "Bearer " + token)
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);

         expect(response.body).to.be.an('array');
         // expect(response.body).to.have.lengthOf.at.least(1);
      });

      it("getMe", async () => {

         const response = await request.get(`/api/users/${test_user._id}`).set("Authorization", "Bearer " + token)
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("get all chats for single User", async () => {

         const response = await request.get(`/api/users/chats`).set("Authorization", "Bearer " + token)

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('array');
         // expect(response.body[0]).to.have.all.keys('_id', "roomName", "members", "lastMessage", "admin", "isGroup");

         //add code to make sure the user is in each chat

      });

      it("update username", async () => {

         const response = await request.put(`/api/users/${test_user._id}`).set("Authorization", "Bearer " + token).send({ username: "updated-controller-test-user" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);

         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         expect(response.body.username).to.equal("updated-controller-test-user");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("update bio", async () => {

         const response = await request.put(`/api/users/${test_user._id}`).set("Authorization", "Bearer " + token).send({ bio: "updated bio" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         expect(response.body.bio).to.equal("updated bio");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });
      it("update avatar", async () => {

         const response = await request.put(`/api/users/${test_user._id}`).set("Authorization", "Bearer " + token).send({ avatar: "update" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
         expect(response.body.avatar).to.equal("update");
         // expect(response.body).to.have.lengthOf.at.least(1);
      });

      it("update password", async () => {

         const response = await request.put(`/api/users/${test_user._id}/recovery`).set("Authorization", "Bearer " + token).send({ password: "newpassword" })
         // allUsers.res.should.have.lengthOf.at.least(1);
         expect(response.status).to.equal(200);


         expect(response.body).to.be.an('object');

         // expect(response.body).to.have.all.keys('token', 'user');
         expect(response.body).to.have.all.keys('_id', "username", "email", "bio", "avatar");

         const checkPSW = await request.post('/api/users/login').send({
            email: "controller-test-user@email.com",
            password: "newpassword"
         })

         expect(checkPSW.status).to.equal(200);
         expect(checkPSW.body).to.be.an('object');
         expect(checkPSW.body).to.have.all.keys('token', 'user');
         expect(checkPSW.body.user).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");

      });


      it('delete a user', async () => {
         const response = await request.delete(`/api/users/${test_user._id}`).set("Authorization", "Bearer " + token)
         expect(response.status).to.equal(200);



      })

   })
});
