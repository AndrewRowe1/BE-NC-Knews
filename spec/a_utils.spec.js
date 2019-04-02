const { expect } = require('chai');
const { dateToSqlArticle, formatComments, createArticleRef, getArticleId } = require('../db/utils/referenceFuncs');

describe('Testing dateToSqlArticle function', () => {
  it('returns an empty array when passed an empty array', () => {
    const expected = [];
    const actual = dateToSqlArticle([]);
    expect(actual).to.be.an('Array');
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(expected);
  });
  it('returns an array with the correct data when passed an article array', () => {
    const expected = [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    }];
    const actual = dateToSqlArticle([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100
    }]);
    expect(actual[0]).to.contain.keys('title', 'topic', 'author', 'body', 'created_at', 'votes');
    expect(actual[0].title).to.eql('Living in the shadow of a great man');
    expect(actual[0].topic).to.eql('mitch');
    expect(actual[0].author).to.eql('butter_bridge');
    expect(actual[0].body).to.eql('I find this existence challenging');
    expect(actual[0].votes).to.eql(100);
  });
});

describe('Testing createArticleRef function', () => {
  it('returns an empty array when passed an empty array', () => {
    const expected = [];
    const actual = createArticleRef([]);
    expect(actual).to.be.an('Array');
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(expected);
  });
  it('returns an array with the correct data when passed an article array', () => {
    const expected = [{ 'Moustache': 12 }];
    const actual = createArticleRef([{
      article_id: 12,
      title: 'Moustache',
      body: 'Have you seen the size of that thing?',
      votes: 0,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: 1542284514171,
    }]);
    expect(actual[0]).to.contain.keys('Moustache');
    expect(actual).to.eql(expected);
  });
});

describe('Testing getArticleId function', () => {
  it('returns undefined when passed an empty array and empty string', () => {
    const actual = getArticleId([], '');
    const expected = undefined;
    expect(actual).to.equal(expected);
  });
  it('returns undefined when passed an array and empty string', () => {
    const actual = getArticleId([{ 'Living in the shadow of a great man': 1 }], '');
    const expected = undefined;
    expect(actual).to.equal(expected);
  });
  it('returns the value of the object inside the array when passed an array with string matching the key of the object inside the array', () => {
    const actual = getArticleId([{ 'Living in the shadow of a great man': 1 }], 'Living in the shadow of a great man');
    const expected = 1;
    expect(actual).to.equal(expected);
  });
});

describe('Testing formatComments function', () => {
  it('returns an empty array when passed an empty array of comments, and an empty articleId', () => {
    const expected = [];
    const actual = formatComments([], []);
    expect(actual).to.be.an('Array');
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(expected);
  });

  it('returns an empty array when passed an empty array of comments, and an articleId', () => {
    const expected = [];
    const actual = formatComments([], [{ 'Living in the shadow of a great man': 1 }]);
    expect(actual).to.be.an('Array');
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(expected);
  });

  it('returns correct formatted data when passed comment data and a lookup article_id reference', () => {
    const actual = formatComments([{
      body: 'This morning, I showered for nine minutes.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 975242163389
    }], [{ 'Living in the shadow of a great man': 1 }]);
    expect(actual).to.be.an('Array');
    expect(actual[0]).to.be.an('Object');
    expect(actual[0].article_id).to.equal(1);
    expect(actual[0].author).to.equal('butter_bridge');
    expect(actual[0].body).to.equal('This morning, I showered for nine minutes.');
    expect(actual[0].votes).to.equal(16);
  });
});