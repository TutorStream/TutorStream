DROP DATABASE IF EXISTS TutorStream;
CREATE DATABASE TutorStream;

USE TutorStream;

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  Name varchar (255) NOT NULL,
  Password varchar (255) NOT NULL,
  Email varchar (255) NOT NULL UNIQUE UNIQUE,
  Tutor int NOT NULL,
  Bio TEXT
);

CREATE TABLE tutors (
  id int,
  Name varchar(255) NOT NULL,
  Bio TEXT,
  Price int NOT NULL,
  Rating int DEFAULT 0,
  FOREIGN KEY (id) references users(id)
);

CREATE TABLE tests (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  Name varchar (255) NOT NULL UNIQUE,
  Description TEXT NOT NULL
);

CREATE TABLE user_tests (
  user_id int,
  test_id int,
  FOREIGN KEY (user_id) references users(id),
  FOREIGN KEY (test_id) references tests(id)
)

CREATE TABLE tutor_tests (
  tutor_id int,
  test_id int,
  FOREIGN KEY (tutor_id) references tutors(id),
  FOREIGN KEY (test_id) references tests(id)
);

CREATE TABLE sessions (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  test_id int,
  tutor_id int,
  student_id int,
  date DATE NOT NULL,
  time TIME NOT NULL,
  complete TINYINT(1) DEFAULT 0,
  current_rate int DEFAULT 0,
  FOREIGN KEY (test_id) references tests (id),
  FOREIGN KEY (tutor_id) references tutors (id),
  FOREIGN KEY (student_id) references users (id)
);


CREATE TABLE feedback (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  user_id int,
  tutor_id int,
  rating int,
  content TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  FOREIGN KEY (user_id) references users (id),
  FOREIGN KEY (tutor_id) references tutors (id)
);

CREATE TABLE photos (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  user_id int,
  location varchar(255),
  FOREIGN KEY (user_id) references users(id)
);

CREATE TABLE earnings (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
  date DATE NOT NULL,
  tutor_id int,
  day_earnings int DEFAULT 0,
  FOREIGN KEY (tutor_id) references tutors (id)
);
