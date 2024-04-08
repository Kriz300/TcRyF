DROP TABLE IF EXISTS restaurant;

CREATE TABLE restaurant(
    restaurant_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    locate TEXT NOT NULL,
    food TEXT NOT NULL,
    score INTEGER,
    visited INTEGER NOT NULL
);