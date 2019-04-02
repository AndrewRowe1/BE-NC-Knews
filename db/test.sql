\c nc_news_test;

SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, count(comment_id)
FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.author = 'butter_bridge' GROUP BY articles.article_id;