IF OBJECT_ID('dbo.Notes', 'U') IS NOT NULL
BEGIN
	DROP TABLE Notes
END;

CREATE TABLE Notes(
	id INT IDENTITY(1,1) PRIMARY KEY,
	notes NVARCHAR(MAX) NOT NULL,
	date_time DATETIME2 DEFAULT SYSDATETIME(),
);

INSERT INTO Notes(notes)
OUTPUT INSERTED.*
VALUES
	('The Fall at Dawn''s Rise'),
	('For the Sun is Set to Die'),
	('As Tomorrow Became Yesterday'),
	('The Dream Yet to Be Dreamed');