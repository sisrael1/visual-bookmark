INSERT INTO user (
	username,
	password,
	email
) VALUES
	('Tom', '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881', 'Tom@example.com'),
	('Bob', '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881', 'Bob@example.com'),
	('Jerry', '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881', 'Jerry@example.com'),
	('Laura', '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881', 'Laura@example.com'),
	('Violet', '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881', 'Violet@example.com');

INSERT INTO bookmark (
	user_id,
	title,
	url
) VALUES
	(1, 'Cats', 'http://www.cats.com'),
	(2, 'Dogs', 'http://www.dogs.com'),
	(3, 'Penguins', 'http://www.penguins.com'),
	(4, 'Wolves', 'http://www.wolves.com'),
	(4, 'Pigs', 'http://www.pigs.com'),
	(5, 'Sheep', 'http://www.sheep.com');

INSERT INTO tag (
	text,
	bookmark_id
) VALUES
	('video', 1),
	('video', 2),
	('video', 3),
	('video', 4),
	('video', 5),
	('video', 6),
	('funny', 6);