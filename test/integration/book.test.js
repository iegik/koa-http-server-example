'use strict';

const supertest = require('supertest');
const app = require('../../app');


describe('Book', () => {
  const request = supertest(app.listen());

  describe('GET /book', () => {
    it('<200> should return info from db', async () => {
      const res = await request
        .get('/book')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status, data } = res.body;
      const expected = ['id', 'title', 'date', 'author', 'description', 'image'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });
});
