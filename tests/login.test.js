const request = require('supertest');
const app = require('../server');

describe('POST /login', () => {
  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful.');
  });

  it('should fail when username or password missing', async () => {
    const res = await request(app)
      .post('/login')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Username and password are required.');
  });
});
