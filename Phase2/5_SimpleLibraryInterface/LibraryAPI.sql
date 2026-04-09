IF OBJECT_ID('dbo.BorrowedBooks', 'U') IS NOT NULL
BEGIN
	DROP TABLE BorrowedBooks
END;

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
BEGIN
	DROP TABLE Users
END;

IF OBJECT_ID('dbo.Books', 'U') IS NOT NULL
BEGIN
	DROP TABLE Books
END;

CREATE TABLE Users(
	id INT IDENTITY(1,1) PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE Books(
	id INT IDENTITY(1,1) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	author VARCHAR(255) NOT NULL,
	isAvailable BIT NOT NULL DEFAULT 1
);

CREATE TABLE BorrowedBooks(
	id INT IDENTITY(1,1) PRIMARY KEY,

	user_id INT NOT NULL,
	book_id INT NOT NULL,

	borrow_date DATETIME DEFAULT GETDATE(),
	return_date DATETIME NULL,

	FOREIGN KEY (user_id) REFERENCES Users(id),
	FOREIGN KEY (book_id) REFERENCES Books(id)
)

INSERT INTO Books(title, author, isAvailable) 
OUTPUT INSERTED.*
VALUES
	('Atomic Habits', 'James Clear', 1),
	('Deep Work', 'Cal Newport', 1),
	('The Pragmatic Programmer', 'Andrew Hunt', 1),
	('Clean Code', 'Robert C. Martin', 1),
	('Design Patterns', 'Erich Gamma', 1),
	('You Don''t Know JS', 'Kyle Simpson', 1),
	('The Psychology of Money', 'Morgan Housel', 1),
	('Rich Dad Poor Dad', 'Robert Kiyosaki', 1),
	('1984', 'George Orwell', 1),
	('To Kill a Mockingbird', 'Harper Lee', 1),
	('The Hobbit', 'J.R.R. Tolkien', 1),
	('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 1),
	('The Lean Startup', 'Eric Ries', 1),
	('Zero to One', 'Peter Thiel', 1),
	('Cracking the Coding Interview', 'Gayle Laakmann McDowell', 1);