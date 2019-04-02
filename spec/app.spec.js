process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request
        .get('/api')
        .expect(200)

    });
    describe('/topics', () => {
      it('GET status:200 and returns topics data', () => {
        return request
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(body.topics[0]).to.contain.keys('description', 'slug');
            expect(body.topics[0].slug).to.equal('mitch');
            expect(body.topics[0].description).to.equal('The man, the Mitch, the legend');
          });
      });
    });
  });
});
