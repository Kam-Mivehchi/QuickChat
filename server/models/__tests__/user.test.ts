import "mocha"
import chai from 'chai';
import mongoose from 'mongoose';
import { User, INewUser } from '../'

chai.should();
describe('User Model', () => { // the tests container
   let user: INewUser = {
      username: "TestSuiteUserModel",
      email: "TestSuiteUserModel@test.com",
      password: "asdfasdf"
   };
   before(() => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')
   });

   after(async () => {
      // Disconnect from the test database
      await User.deleteOne({ username: "TestSuiteUserModel" })

      await mongoose.disconnect();
   });

   it('should create new User', async () => { // the single test

      const userDocument = new User(user)
      await userDocument.save()

      //verify id and user creation
      userDocument._id.should.exist;
      //verify email
      userDocument.email.should.equal(user.email);

      //verify firstName
      userDocument.username.should.equal(user.username);
   });

   it('should hash a users password', async () => { // the single test

      const userDocument = await User.findOne({ username: "TestSuiteUserModel" })



      // testing hashing pre function
      userDocument!.password.should.not.equal(user.password);

      const comparePSW = await userDocument!.isCorrectPassword(user.password)
      comparePSW.should.equal(true)

   });
   it('should compare and validate a users password to the hashed password', async () => { // the single test
      const userDocument = await User.findOne({ username: "TestSuiteUserModel" })

      const comparePSW = await userDocument!.isCorrectPassword(user.password)
      comparePSW.should.equal(true)

   });
});
