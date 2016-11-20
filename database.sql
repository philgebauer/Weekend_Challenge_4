CREATE TABLE todos(
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  description VARCHAR(3000),
  completed BOOLEAN DEFAULT false
);
