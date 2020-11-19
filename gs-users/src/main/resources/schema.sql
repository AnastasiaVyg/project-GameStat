CREATE SCHEMA IF NOT EXISTS schema_users;

CREATE TABLE IF NOT EXISTS schema_users.users (
  id SERIAL PRIMARY KEY,
  guid uuid NOT NULL,
  email varchar(100) NOT NULL,
  user_name varchar(100) NOT NULL,
  time_authent timestamp NOT NULL
);
