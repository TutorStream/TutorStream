DROP DATABASE IF EXISTS TutorStream;
CREATE DATABASE TutorStream;

USE TutorStream;

CREATE TABLE users (
  ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name varchar(255) NOT NULL,
  Password varchar(255) NOT NULL,
  Email varchar(255) NOT NULL UNIQUE,
  Tutor int NOT NULL,
  Bio varchar(255)
);

CREATE TABLE tutors (
  ID int,
  Bio varchar(255) NOT NULL,
  Price int NOT NULL,
  Rating int NOT NULL,
  FOREIGN KEY (ID) references users(id)
);

CREATE TABLE tests (
  ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name varchar(255) NOT NULL UNIQUE,
  Description varchar(255) NOT NULL
);

CREATE TABLE user_tests (
  user_id int,
  test_id int,
  FOREIGN KEY (user_id) references users(id),
  FOREIGN KEY (test_id) references tests(id) 
);

CREATE TABLE tutor_tests (
  tutor_id int,
  test_id int,
  FOREIGN KEY (tutor_id) references tutors(id),
  FOREIGN KEY (test_id) references tests(id)
);

CREATE TABLE sessions (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  test_id int,
  tutor_id int,
  student_id int,
  date DATE NOT NULL,
  time TIME NOT NULL,
  FOREIGN KEY (test_id) references tests(id),
  FOREIGN KEY (tutor_id) references tutors(id),
  FOREIGN KEY (student_id) references users(id)
);

CREATE TABLE feedback (
  ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  tutor_id int,
  rating int,
  content varchar(255),
  date DATE NOT NULL,
  time TIME NOT NULL,
  FOREIGN KEY (user_id) references users(id),
  FOREIGN KEY (tutor_id) references tutors(id)
);