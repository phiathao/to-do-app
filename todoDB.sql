CREATE TABLE "todolist" (
	"task" VARCHAR(255) NOT NULL,
	"important" BOOLEAN,
	"complete" BOOLEAN DEFAULT '0',
	"id" SERIAL PRIMARY KEY
);

INSERT INTO "todolist" ("task", "important") VALUES('Wash the dish', '0'), 
('Wipe the window', '0'),
('Take out the trash', '0'),
('Buy a chicken for dinner', '1'),
('Cook dinner', '0');

INSERT INTO "todolist" ("task", "important", "complete") VALUES('Sweep the floor', '0', '1');