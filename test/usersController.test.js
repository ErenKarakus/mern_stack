const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const User = require('../models/User');
const { getAllUsers, createNewUser, updateUser, deleteUser } = require('../controllers/usersController');

const app = express();
app.use(express.json());
app.get('/users', getAllUsers);
app.post('/users', createNewUser);
app.patch('/users', updateUser);
app.delete('/users', deleteUser);

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

describe('User Controller', () => {
    afterEach(async () => {
        await User.deleteMany({});
    });

    test('GET /users - get all users', async () => {
        const user1 = new User({ username: 'testUser1', password: 'testPassword1' });
        const user2 = new User({ username: 'testUser2', password: 'testPassword2' });
        await user1.save();
        await user2.save();

        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test('POST /users - create new user', async () => {
        const response = await request(app).post('/users').send({
            username: 'testUser',
            password: 'testPassword',
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toMatch(/New user testUser created/);
    });

    test('PATCH /users - update user', async () => {
        const user = new User({ username: 'testUser', password: 'testPassword', roles: ['admin'], active: true });
        await user.save();

        const response = await request(app).patch('/users').send({
            id: user._id,
            username: 'updateUser',
            roles: ['user'],
            active: false,
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/updateUser updated/);
    });

});
