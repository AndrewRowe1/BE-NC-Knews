process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const connection = require('../db/connection');
const request = supertest(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('non-existant route', () => {
    it('status:404 for route that does not exist', () => {
      return request.get('/non-existant route').expect(404).then(({ body }) => {
        expect(body.msg).to.equal('Route Not Found');
      });
    });
  });

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
    describe('/articles', () => {
      it('GET status:200 and returns articles data', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
            expect(body.articles[3].author).to.equal('rogersop');
            expect(body.articles[3].title).to.equal(`Student SUES Mitch!`);
            //expect(body.articles[3].title).to.equal(`They\'re not exactly dogs, are they?`);
            expect(body.articles[3].article_id).to.equal(4);
            expect(body.articles[3].topic).to.equal('mitch');
            expect(body.articles[3].votes).to.equal(0);
            expect(body.articles[3].comment_count).to.equal('0');
          });
      });
      describe('?author', () => {
        it('GET status:200 and returns articles data queried by author', () => {
          return request
            .get('/api/articles?author=butter_bridge')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.have.lengthOf(3);
              expect(body.articles[0].title).to.equal('Living in the shadow of a great man');
              expect(body.articles[0].article_id).to.equal(1);
              expect(body.articles[0].votes).to.equal(100);
            });
        });
      });
      describe('?topic', () => {
        it('GET status:200 and returns articles data queried by topic', () => {
          return request
            .get('/api/articles?topic=mitch')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.have.lengthOf(11);
              expect(body.articles[0].title).to.equal('Living in the shadow of a great man');
              expect(body.articles[0].article_id).to.equal(1);
              expect(body.articles[0].votes).to.equal(100);
              expect(body.articles[0].comment_count).to.equal('13');
            });
        });
      });
      describe('?sort_by', () => {
        it('GET status:200 and returns articles data sorted by title', () => {
          return request
            .get('/api/articles?sort_by=title')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.have.lengthOf(12);
              expect(body.articles[0].author).to.equal('icellusedkars');
              expect(body.articles[0].title).to.equal('Z');
              expect(body.articles[0].article_id).to.equal(7);
              expect(body.articles[0].votes).to.equal(0);
              expect(body.articles[0].comment_count).to.equal('0');
            });
        });
      });
      describe('?sort_by', () => {
        it('GET status:200 and returns articles data sorted by default(date)', () => {
          return request
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.have.lengthOf(12);
              expect(body.articles[1].author).to.equal('icellusedkars');
              expect(body.articles[1].title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.articles[1].article_id).to.equal(2);
              expect(body.articles[1].votes).to.equal(0);
              expect(body.articles[1].comment_count).to.equal('0');
            });
        });
      });
      describe('?order', () => {
        it('GET status:200 and returns articles data ordered descending by date', () => {
          return request
            .get('/api/articles?order=desc')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.have.lengthOf(12);
              expect(body.articles[0].author).to.equal('butter_bridge');
              expect(body.articles[0].title).to.equal('Living in the shadow of a great man');
              expect(body.articles[0].article_id).to.equal(1);
              expect(body.articles[0].votes).to.equal(100);
              expect(body.articles[0].comment_count).to.equal('13');
            });
        });
      });
      describe(':article_id', () => {
        it('GET status:200 and returns article data for the article_id requested', () => {
          return request
            .get('/api/articles/2')
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.have.lengthOf(1);
              expect(body.article[0].author).to.equal('icellusedkars');
              expect(body.article[0].title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.article[0].article_id).to.equal(2);
              expect(body.article[0].votes).to.equal(0);
              expect(body.article[0].comment_count).to.equal('0');
            });
        });
      });
      it('PATCHES articles data with status 200 with keys of article_id, title, topic, created_at, votes', () => {
        return request
          .patch('/api/articles/2')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.articlePatch.article_id).to.equal(2);
            expect(body.articlePatch.author).to.equal('icellusedkars');
            expect(body.articlePatch.topic).to.equal('mitch');
            expect(body.articlePatch.title).to.equal('Sony Vaio; or, The Laptop');
            expect(body.articlePatch.votes).to.equal(1);
          });
      });
    });
  });
});
