USE bookstore;
CREATE TABLE books
(
  id int unsigned NOT NULL auto_increment,
  title varchar(255) NOT NULL,
  author varchar(255) NOT NULL, 
  price decimal(10,2) NOT NULL,
  PRIMARY KEY     (id)
);