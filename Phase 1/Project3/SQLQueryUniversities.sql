IF OBJECT_ID('dbo.Universities', 'U') IS NOT NULL
BEGIN 
	DROP TABLE Universities
END

CREATE TABLE Universities (
 id INT IDENTITY(1,1) PRIMARY KEY,
 uni_name VARCHAR(225) NOT NULL,
 uni_acronym VARCHAR(5) NOT NULL
);

DBCC CHECKIDENT ('Universities', RESEED, 1); -- Reset identity seed to 1

INSERT INTO Universities (uni_name, uni_acronym)
VALUES
	('SINGAPORE MANAGEMENT UNIVERSITY', 'SMU'),
	('NANYANG TECHNOLOGY UNIVERSITY', 'NTU'),
	('NATIONAL UNIVERSITY SINGAPORE', 'NUS');

SELECT * FROM Universities;