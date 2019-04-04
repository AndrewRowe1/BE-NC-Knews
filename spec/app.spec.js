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
      it('PATCH status:405 and returns method not allowed', () => {
        return request
          .patch('/api/topics')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('POST status:405 and returns method not allowed', () => {
        return request
          .post('/api/topics')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('DELETE status:405 and returns method not allowed', () => {
        return request
          .delete('/api/topics')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
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
            expect(body.articles[3].article_id).to.equal(4);
            expect(body.articles[3].topic).to.equal('mitch');
            expect(body.articles[3].votes).to.equal(0);
            expect(body.articles[3].comment_count).to.equal('0');
          });
      });
      it('PATCH status:405 and returns method not allowed', () => {
        return request
          .patch('/api/articles')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('POST status:405 and returns method not allowed', () => {
        return request
          .post('/api/articles')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('DELETE status:405 and returns method not allowed', () => {
        return request
          .delete('/api/articles')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
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
        it('GET status:400 and returns articles data sorted by nonsense', () => {
          return request
            .get('/api/articles?sort_by=nonsense')
            .expect(400)
            .then((body) => {
              expect(body.text).to.equal('Bad Request');
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
        it('GET status:400 and returns articles data ordered by nonsense', () => {
          return request
            .get('/api/articles?order=nonsense')
            .expect(400)
            .then((body) => {
              expect(body.text).to.equal('Bad Request');
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
        it('PATCHES articles data with status 200 incrementing vote by 1', () => {
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
        it('PATCHES articles data with status 200 incrementing vote by -10', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: -10 })
            .expect(200)
            .then(({ body }) => {
              expect(body.articlePatch.article_id).to.equal(2);
              expect(body.articlePatch.author).to.equal('icellusedkars');
              expect(body.articlePatch.topic).to.equal('mitch');
              expect(body.articlePatch.title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.articlePatch.votes).to.equal(-10);
            });
        });
        it('PATCHES articles data with status 404 article_id does not exist, incrementing vote by -10', () => {
          return request
            .patch('/api/articles/9999')
            .send({ inc_votes: -10 })
            .expect(404)
            .then((body) => {
              expect(body.text).to.equal('Article not found');
            });
        });
        it('DELETES articles data with status 204 with the requested article_id to delete', () => {
          return request
            .delete('/api/articles/2')
            .expect(204)
            .then(({ body }) => {
              expect(body).to.eql({});
              expect(body.articleDelete).to.equal(undefined);
            });
        });
        it('DELETES articles data with status 404 with an invalid requested article_id to delete', () => {
          return request
            .delete('/api/articles/9999')
            .expect(404)
            .then((body) => {
              expect(body.text).to.equal('Article not found');
            });
        });
        it('POST status:405 and returns method not allowed', () => {
          return request
            .post('/api/articles/1')
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal('Method Not Allowed');
            });
        });
        describe('/comments', () => {
          it('GETS comments data with status 200 for a given article_id', () => {
            return request
              .get('/api/articles/5/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.have.lengthOf(2);
                expect(body.comments[0].author).to.equal('icellusedkars');
                expect(body.comments[0].article_id).to.equal(5);
                expect(body.comments[0].comment_id).to.equal(14);
                expect(body.comments[0].votes).to.equal(16);
                expect(body.comments[0].body).to.equal('What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.');
              });
          })
          it('GETS comments data with status 200 for a given article_id and sorts by author', () => {
            return request
              .get('/api/articles/1/comments?sort_by=body')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0]).to.contain.keys('author', 'article_id', 'comment_id', 'votes', 'created_at', 'body')
                expect(body.comments).to.have.lengthOf(13);
                expect(body.comments[0].author).to.equal('butter_bridge');
                expect(body.comments[0].article_id).to.equal(1);
                expect(body.comments[0].comment_id).to.equal(18);
                expect(body.comments[0].votes).to.equal(16);
                expect(body.comments[0].body).to.equal('This morning, I showered for nine minutes.');
              });
          });
          it('GETS comments data with status 200 for a given article_id and orders ascending', () => {
            return request
              .get('/api/articles/5/comments?order=asc')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.have.lengthOf(2);
                expect(body.comments[0].author).to.equal('butter_bridge');
                expect(body.comments[0].article_id).to.equal(5);
                expect(body.comments[0].comment_id).to.equal(15);
                expect(body.comments[0].votes).to.equal(1);
                expect(body.comments[0].body).to.equal(`I am 100% sure that we're not completely sure.`);
              });
          });
          it('POSTS comments data with status 201 for a given article_id', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(201)
              .send({ username: 'icellusedkars', body: 'This is a great read, invest in your time and read this!' })
              .then(({ body }) => {
                expect(body.comments).to.have.lengthOf(1);
                expect(body.comments[0].comment_id).to.equal(19);
                expect(body.comments[0].author).to.equal('icellusedkars');
                expect(body.comments[0].article_id).to.equal(5);
                expect(body.comments[0].votes).to.equal(0);
                expect(body.comments[0].body).to.equal('This is a great read, invest in your time and read this!');
              });
          });
          it('POSTS comments data with status 404 for an invalid article_id', () => {
            return request
              .post('/api/articles/9999/comments')
              .expect(404)
              .send({ username: 'icellusedkars', body: 'This is a great read, invest in your time and read this!' })
              .then(({ body }) => {
                expect(body.msg).to.equal(`Page not found`)
              });
          });
          it('PATCH status:405 and returns method not allowed', () => {
            return request
              .patch('/api/articles/1/comments')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method Not Allowed');
              });
          });
          it('DELETE status:405 and returns method not allowed', () => {
            return request
              .delete('/api/articles/1/comments')
              .expect(405)
              .then(({ body }) => {
                expect(body.msg).to.equal('Method Not Allowed');
              });
          });
        });
      });
    });
    describe('/comments/:comment_id', () => {
      it('PATCHES comments data for the relevant comment_id with status 200 incrementing vote by -2', () => {
        return request
          .patch('/api/comments/2')
          .send({ inc_votes: -2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.commentPatch.comment_id).to.equal(2);
            expect(body.commentPatch.author).to.equal('butter_bridge');
            expect(body.commentPatch.article_id).to.equal(1);
            expect(body.commentPatch.body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
            expect(body.commentPatch.votes).to.equal(12);
          });
      });
      it('PATCHES comments data for the relevant comment_id with status 200 incrementing vote by 2', () => {
        return request
          .patch('/api/comments/2')
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.commentPatch.comment_id).to.equal(2);
            expect(body.commentPatch.author).to.equal('butter_bridge');
            expect(body.commentPatch.article_id).to.equal(1);
            expect(body.commentPatch.body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
            expect(body.commentPatch.votes).to.equal(16);
          });
      });
      it('PATCHES comments data with status 404 comment_id does not exist, incrementing vote by -10', () => {
        return request
          .patch('/api/comments/9999')
          .send({ inc_votes: -10 })
          .expect(404)
          .then((body) => {
            expect(body.text).to.equal('Comment not found');
          });
      });
      it('DELETES comments data with status 204 with the requested comment_id to delete', () => {
        return request
          .delete('/api/comments/2')
          .expect(204)
          .then(({ body }) => {
            expect(body).to.eql({});
            expect(body.commentDelete).to.equal(undefined);
          });
      });
      it('DELETES comments data with status 404 with an invalid requested comment_id to delete', () => {
        return request
          .delete('/api/comments/9999')
          .expect(404)
          .then((body) => {
            expect(body.text).to.equal('Comment not found');
          });
      });
      it('GET status:405 and returns method not allowed', () => {
        return request
          .get('/api/comments/1')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('POST status:405 and returns method not allowed', () => {
        return request
          .post('/api/comments/1')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
    describe('/users/:username', () => {
      it('GETS users data with status 200 for a given username', () => {
        return request
          .get('/api/users/rogersop')
          .expect(200)
          .then(({ body }) => {
            expect(body.users).to.have.lengthOf(1);
            expect(body.users[0]).to.contain.keys('username', 'avatar_url', 'name')
            expect(body.users[0].username).to.equal('rogersop');
            expect(body.users[0].avatar_url).to.equal('https://avatars2.githubusercontent.com/u/24394918?s=400&v=4');
            expect(body.users[0].name).to.equal('paul');
          });
      });
      it('POST status:405 and returns method not allowed', () => {
        return request
          .post('/api/users/rogersop')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('PATCH status:405 and returns method not allowed', () => {
        return request
          .patch('/api/users/rogersop')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
      it('DELETE status:405 and returns method not allowed', () => {
        return request
          .delete('/api/users/rogersop')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          });
      });
    });
  });
});
