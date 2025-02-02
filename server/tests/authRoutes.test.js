const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('Auth Routes', () => {
    describe('POST /login', () => {
        it('should login a user with valid credentials', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: 'validUser',
                    password: 'validPassword'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should not login a user with invalid credentials', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: 'invalidUser',
                    password: 'invalidPassword'
                });
            expect(res.statusCode).toEqual(401);
        });
    });

    describe('POST /register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'newUser',
                    password: 'newPassword'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });

        it('should not register a user with an existing username', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    username: 'existingUser',
                    password: 'password'
                });
            expect(res.statusCode).toEqual(400);
        });
    });
});
