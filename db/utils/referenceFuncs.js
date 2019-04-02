function dateToSqlArticle (data) {
  const articleObj = data.map(element => ({
    title: element.title,
    body: element.body,
    votes: element.votes,
    topic: element.topic,
    author: element.author,
    created_at: new Date(element.created_at),
  }));
  return articleObj;
}

function getArticleId (articleLookup, titleLookup) {
  for (let i = 0; i < articleLookup.length; i++) {
    const articleLookupObj = articleLookup[i];
    const articleTitle = Object.keys(articleLookupObj)[0];
    if (articleTitle === titleLookup) return Object.values(articleLookupObj)[0];
  }
}

function formatComments (commentData, lookup) {
  const commentObj = commentData.map((element) => {
    const articleId = getArticleId(lookup, element.belongs_to);
    return {
      author: element.created_by,
      article_id: articleId,
      votes: element.votes,
      created_at: new Date(element.created_at),
      body: element.body,
    };
  });
  return commentObj;
}

function createArticleRef (articleRows) {
  const articleObj = articleRows.map((element) => {
    const titleKey = element.title;
    return {
      [titleKey]: element.article_id,
    };
  });
  return articleObj;
}

module.exports = {
  dateToSqlArticle, formatComments, createArticleRef, getArticleId,
};
