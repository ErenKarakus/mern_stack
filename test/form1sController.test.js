const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const Form1 = require('../models/Form1');
const User = require('../models/User');
const { getAllForm1s, createNewForm1, updateForm1, deleteForm1 } = require('../controllers/form1sController');

const app = express();
app.use(express.json());
app.get('/form1s', getAllForm1s);
app.post('/form1s', createNewForm1);
app.patch('/form1s', updateForm1);
app.delete('/form1s', deleteForm1);


let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}, 10000);

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
    await Form1.deleteMany({});
  });

describe('POST /form1s', () => {
    it('should create a new form1 and return a success message', async () => {
      const user = new User({ username: 'user', password: 'testPassword' });
      await user.save();
  
      const newForm1 = {
        user: user._id,
        q1: '01/01/2000',
        q2: 'form1 q2',
        q3a: 'form1 q3a',
        q3b: 'form1 q3b',
        q3c: 'form1 q3c',
        q3d: 'form1 q3d',
        q3e: 'form1 q3e',
        q4: 'form1 q4',
        q5: 'form1 q5',
      };
  
      const response = await request(app).post('/form1s').send(newForm1);
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'New form1 created' });
    });
  
    it('should return an error message if any field is missing', async () => {
      const user = new User({ username: 'user', password: 'testPassword' });
      await user.save();
  
      const newForm1 = {
        user: user._id,
        q1: '01/01/2000',
        q2: 'form1 q2',
        q3a: 'form1 q3a',
        q3b: 'form1 q3b',
        q3c: 'form1 q3c',
        q3d: 'form1 q3d',
        q3e: 'form1 q3e',
        q4: 'form1 q4',
        // missingq5: 'form1 q5',
      };
  
      const response = await request(app).post('/form1s').send(newForm1);
  
      console.log(response.body); // Add this line for debugging

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'All fields are required' });
    });
  });
 