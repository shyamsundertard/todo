CREATE DATABASE todobase;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    type VARCHAR(50),
    content VARCHAR(300)
);