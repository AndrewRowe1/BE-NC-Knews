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
            expect(body.topics).to.contain.keys('description', 'slug');
            expect(body.topics.slug).to.equal('mitch');
            expect(body.topics.description).to.equal('The man, the Mitch, the legend');
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
            expect(body.articles).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
            expect(body.articles.author).to.equal('butter_bridge');
            expect(body.articles.title).to.equal(`Living in the shadow of a great man`);
            expect(body.articles.article_id).to.equal(1);
            expect(body.articles.topic).to.equal('mitch');
            expect(body.articles.votes).to.equal(100);
            expect(body.articles.comment_count).to.equal('13');
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
              expect(body.articles.title).to.equal('Living in the shadow of a great man');
              expect(body.articles.article_id).to.equal(1);
              expect(body.articles.votes).to.equal(100);
            });
        });
        it('GET status:404 and returns articles data queried by author that does not exist', () => {
          return request
            .get('/api/articles?author=andrew_rowe')
            .expect(404)
            .then((body) => {
              expect(body.text).to.equal('Author not found');
            });
        });
        it('GET status:200 and returns no articles data queried by author that exists with no articles - note created freddieflintoff in testdata as an author', () => {
          return request
            .get('/api/articles?author=freddieflintoff')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.eql([]);
            });
        });
      });
      describe('?topic', () => {
        it('GET status:200 and returns articles data queried by topic', () => {
          return request
            .get('/api/articles?topic=mitch')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.title).to.equal('Living in the shadow of a great man');
              expect(body.articles.article_id).to.equal(1);
              expect(body.articles.votes).to.equal(100);
              expect(body.articles.comment_count).to.equal('13');
            });
        });
        it('GET status:404 and returns topics data queried by topic that does not exist', () => {
          return request
            .get('/api/articles?topic=andrew_rowe')
            .expect(404)
            .then((body) => {
              expect(body.text).to.equal('Topic not found');
            });
        });
        it('GET status:200 and returns no articles data queried by topic that exists with no articles - note created brexitchaos as a topic', () => {
          return request
            .get('/api/articles?topic=brexitchaos')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.eql([]);
            });
        });
      });
      describe('?sort_by', () => {
        it('GET status:200 and returns articles data sorted by title', () => {
          return request
            .get('/api/articles?sort_by=title')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.author).to.equal('icellusedkars');
              expect(body.articles.title).to.equal('Z');
              expect(body.articles.article_id).to.equal(7);
              expect(body.articles.votes).to.equal(0);
              expect(body.articles.comment_count).to.equal('0');
            });
        });
        it('GET status:400 and returns articles data sorted by nonsense', () => {
          return request
            .get('/api/articles?sort_by=nonsense')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Bad Request');
            });
        });
      });
      describe('?sort_by', () => {
        it('GET status:200 and returns articles data sorted by default(date)', () => {
          return request
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.author).to.equal('butter_bridge');
              expect(body.articles.title).to.equal('Living in the shadow of a great man');
              expect(body.articles.article_id).to.equal(1);
              expect(body.articles.votes).to.equal(100);
              expect(body.articles.comment_count).to.equal('13');
            });
        });
      });
      describe('?order', () => {
        it('GET status:200 and returns articles data ordered descending by date', () => {
          return request
            .get('/api/articles?order=asc')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.author).to.equal('butter_bridge');
              expect(body.articles.title).to.equal('Moustache');
              expect(body.articles.article_id).to.equal(12);
              expect(body.articles.votes).to.equal(0);
              expect(body.articles.comment_count).to.equal('0');
            });
        });
        it('GET status:200 and returns articles data ordered descending by date', () => {
          return request
            .get('/api/articles?order=desc')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.author).to.equal('butter_bridge');
              expect(body.articles.title).to.equal('Living in the shadow of a great man');
              expect(body.articles.article_id).to.equal(1);
              expect(body.articles.votes).to.equal(100);
              expect(body.articles.comment_count).to.equal('13');
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
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
              expect(body.article.author).to.equal('butter_bridge');
              expect(body.article.title).to.equal('Living in the shadow of a great man');
              expect(body.article.article_id).to.equal(1);
              expect(body.article.votes).to.equal(100);
              expect(body.article.comment_count).to.equal('13');
            });
        });
        it('GET status:200 and returns article data for the article_id requested', () => {
          return request
            .get('/api/articles/2')
            .expect(200)
            .then(({ body }) => {
              expect(body.article.author).to.equal('icellusedkars');
              expect(body.article.title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.article.article_id).to.equal(2);
              expect(body.article.votes).to.equal(0);
              expect(body.article.comment_count).to.equal('0');
            });
        });
        it('GET status:404 and returns article data for the non-existant article_id requested', () => {
          return request
            .get('/api/articles/2000')
            .expect(404)
            .then((body) => {
              expect(body.text).to.equal('Page not found');
            });
        });
        it('GET status:400 and returns article data for an invalid article_id requested', () => {
          return request
            .get('/api/articles/cat')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Bad Request');
            });
        });
        it('PATCHES articles data with status 200 incrementing vote by 1', () => {
          return request
            .patch('/api/articles/1')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.article_id).to.equal(1);
              expect(body.article.author).to.equal('butter_bridge');
              expect(body.article.topic).to.equal('mitch');
              expect(body.article.title).to.equal('Living in the shadow of a great man');
              expect(body.article.votes).to.equal(101);
            });
        });
        it('PATCHES articles data with status 200 incrementing vote by 1', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.article_id).to.equal(2);
              expect(body.article.author).to.equal('icellusedkars');
              expect(body.article.topic).to.equal('mitch');
              expect(body.article.title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.article.votes).to.equal(1);
            });
        });
        it('PATCHES articles data with status 200 incrementing vote by -10', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: -10 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.article_id).to.equal(2);
              expect(body.article.author).to.equal('icellusedkars');
              expect(body.article.topic).to.equal('mitch');
              expect(body.article.title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.article.votes).to.equal(-10);
            });
        });
        it('PATCHES articles data with status 200 with no incrementing vote', () => {
          return request
            .patch('/api/articles/2')
            .send({})
            .expect(200)
            .then(({ body }) => {
              expect(body.article.article_id).to.equal(2);
              expect(body.article.author).to.equal('icellusedkars');
              expect(body.article.topic).to.equal('mitch');
              expect(body.article.title).to.equal('Sony Vaio; or, The Laptop');
              expect(body.article.votes).to.equal(0);
            });
        });
        it('PATCHES articles data with status 400 with invalid incrementing vote', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: 'cat' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Bad Request');
            });
        });
        it('PATCHES articles data with status 400 with invalid incrementing vote', () => {
          return request
            .patch('/api/articles/2')
            .send({ inc_votes: 'cat', name: 'rogersop' })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal('Bad Request');
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
              expect(body.article).to.equal(undefined);
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
          it('GETS comments data with status 200 for a given article_id of 1', () => {
            return request
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments.author).to.equal('butter_bridge');
                expect(body.comments.article_id).to.equal(1);
                expect(body.comments.comment_id).to.equal(2);
                expect(body.comments.votes).to.equal(14);
                expect(body.comments.body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
              });
          })
          it('GETS comments data with status 200 for a given article_id of 5', () => {
            return request
              .get('/api/articles/5/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments.author).to.equal('icellusedkars');
                expect(body.comments.article_id).to.equal(5);
                expect(body.comments.comment_id).to.equal(14);
                expect(body.comments.votes).to.equal(16);
                expect(body.comments.body).to.equal('What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.');
              });
          })
          it('GETS comments data with status 200 for a given article_id of 2 which has no comments', () => {
            return request
              .get('/api/articles/2/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.eql([]);
              });
          })
          it('GET status:404 for the non-existant article_id requested', () => {
            return request
              .get('/api/articles/2000/comments')
              .expect(404)
              .then((body) => {
                expect(body.text).to.equal('Page not found');
              });
          });
          it('GET status:400 and returns article data for an invalid article_id requested', () => {
            return request
              .get('/api/articles/cat/comments')
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal('Bad Request');
              });
          });
          it('GETS comments data with status 200 for a given article_id and sorts by author', () => {
            return request
              .get('/api/articles/1/comments?sort_by=body')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.contain.keys('author', 'article_id', 'comment_id', 'votes', 'created_at', 'body')
                expect(body.comments.author).to.equal('butter_bridge');
                expect(body.comments.article_id).to.equal(1);
                expect(body.comments.comment_id).to.equal(18);
                expect(body.comments.votes).to.equal(16);
                expect(body.comments.body).to.equal('This morning, I showered for nine minutes.');
              });
          });
          it('GETS comments data with status 200 for a given article_id and orders ascending', () => {
            return request
              .get('/api/articles/5/comments?order=asc')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments.author).to.equal('butter_bridge');
                expect(body.comments.article_id).to.equal(5);
                expect(body.comments.comment_id).to.equal(15);
                expect(body.comments.votes).to.equal(1);
                expect(body.comments.body).to.equal(`I am 100% sure that we're not completely sure.`);
              });
          });
          it('GETS comments data with status 200 for a given article_id and sorts by votes', () => {
            return request
              .get('/api/articles/5/comments?sort_by=votes')
              .expect(200)
              .then(({ body }) => {
                expect(body.comments.author).to.equal('icellusedkars');
                expect(body.comments.article_id).to.equal(5);
                expect(body.comments.comment_id).to.equal(14);
                expect(body.comments.votes).to.equal(16);
                expect(body.comments.body).to.equal(`What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.`);
              });
          });
          it('POSTS comments data with status 201 for a given article_id', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(201)
              .send({ username: 'icellusedkars', body: 'This is a great read, invest in your time and read this!' })
              .then(({ body }) => {
                expect(body.comments.comment_id).to.equal(19);
                expect(body.comments.author).to.equal('icellusedkars');
                expect(body.comments.article_id).to.equal(5);
                expect(body.comments.votes).to.equal(0);
                expect(body.comments.body).to.equal('This is a great read, invest in your time and read this!');
              });
          });
          it('POSTS comments data with status 400 for a given article_id of 1, does not include body key', () => {
            return request
              .post('/api/articles/1/comments')
              .expect(400)
              .send({ username: 'icellusedkars' })
              .then(({ body }) => {
                expect(body.msg).to.equal('Bad Request');
              });
          });
          it('POSTS comments data with status 400 for a given article_id, invalid usernome key', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(400)
              .send({ usernome: 'rogersop', body: 'This is a great read, invest in your time and read this!' })
              .then((body) => {
                expect(body.text).to.equal(`No username key on request`)
              });
          });
          it('POSTS comments data with status 400 for a given article_id, invalid username', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(400)
              .send({ username: 'andrew_rowe1', body: 'This is a great read, invest in your time and read this!' })
              .then((body) => {
                expect(body.text).to.equal(`Author does not exist`)
              });
          });
          it('POSTS comments data with status 400 for a given article_id, invalid username of an integer', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(400)
              .send({ username: 505, body: 'This is a great read, invest in your time and read this!' })
              .then((body) => {
                expect(body.text).to.equal(`Author does not exist`)
              });
          });
          it('POSTS comments data with status 400 for a given article_id, no body along with username', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(400)
              .send({ username: 'rogersop' })
              .then(({ body }) => {
                expect(body.msg).to.equal(`Bad Request`)
              });
          });
          it('POSTS comments data with status 400 for a given article_id, no username along with body', () => {
            return request
              .post('/api/articles/5/comments')
              .expect(400)
              .send({ body: 'This is a great read, invest in your time and read this!' })
              .then((body) => {
                expect(body.text).to.equal(`No username key on request`)
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
            expect(body.comment.comment_id).to.equal(2);
            expect(body.comment.author).to.equal('butter_bridge');
            expect(body.comment.article_id).to.equal(1);
            expect(body.comment.body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
            expect(body.comment.votes).to.equal(12);
          });
      });
      it('PATCHES comments data for the relevant comment_id with status 200 incrementing vote by 2', () => {
        return request
          .patch('/api/comments/2')
          .send({ inc_votes: 2 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.comment_id).to.equal(2);
            expect(body.comment.author).to.equal('butter_bridge');
            expect(body.comment.article_id).to.equal(1);
            expect(body.comment.body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
            expect(body.comment.votes).to.equal(16);
          });
      });
      it('PATCHES comments data for the relevant comment_id with status 200 with no incrementing vote', () => {
        return request
          .patch('/api/comments/2')
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.comment_id).to.equal(2);
            expect(body.comment.author).to.equal('butter_bridge');
            expect(body.comment.article_id).to.equal(1);
            expect(body.comment.body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
            expect(body.comment.votes).to.equal(14);
          });
      });
      it('PATCHES comments data with status 400 for the relevant comment_id, invalid inc_vates key', () => {
        return request
          .patch('/api/comments/2')
          .send({ inc_vates: 2 })
          .expect(400)
          .then((body) => {
            expect(body.text).to.equal(`No inc_votes key on request`)
          });
      });
      it('POSTS comments data with status 404 for an invalid comment_id', () => {
        return request
          .patch('/api/comments/9999')
          .expect(404)
          .send({ inc_votes: 2 })
          .then((body) => {
            expect(body.text).to.equal(`Comment not found`)
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
            expect(body.comment).to.equal(undefined);
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
            expect(body.users).to.contain.keys('username', 'avatar_url', 'name')
            expect(body.users.username).to.equal('rogersop');
            expect(body.users.avatar_url).to.equal('https://avatars2.githubusercontent.com/u/24394918?s=400&v=4');
            expect(body.users.name).to.equal('paul');
          });
      });
      it('GETS users data with status 404 for a nonsense username', () => {
        return request
          .get('/api/users/nonsense')
          .expect(404)
          .then((body) => {
            expect(body.text).to.equal('Page not found');
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
