//Test 6  (POST 404)

const request = require('supertest');
const app = require('../../index');

describe('API Combates', () => {
    test('POST /api/combates con IDs inexistentes devuelve 404', async () => {
        const res = await request(app)
            .post('/api/combates')
            .send({ id1: 999999, id2: 888888 });
        
        expect(res.statusCode).toBe(404);
    });
});