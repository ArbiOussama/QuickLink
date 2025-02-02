const request = require('supertest');
const app = require('../app');

describe('URL Routes', () => {
    describe('GET /urls', () => {
        it('should return a list of URLs', async () => {
            const res = await request(app).get('/urls');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /urls', () => {
        it('should create a new URL', async () => {
            const res = await request(app)
                .post('/urls')
                .send({
                    url: 'http://example.com'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });

        it('should not create a URL with invalid data', async () => {
            const res = await request(app)
                .post('/urls')
                .send({
                    url: 'invalid-url'
                });
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /urls/user-urls', () => {
        it('should return a list of user URLs', async () => {
            const res = await request(app).get('/urls/user-urls');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
});
