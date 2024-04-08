import sqlite3

conn = sqlite3.connect('./DB.db')

#Create table
with open('schemes.sql') as f:
    conn.executescript(f.read())

#List of data of restaurants
restaurants = [
    ("Restaurante A", "Roma, Italia", "Italiano, Pizza", 4.5, 1),
    ("Restaurante B", "Mexico, Mexico", "Carne, Tacos", 3.8, 0),
    ("Restaurante C", "Tokyo, Japón", "Sashimi, Sushi", 4.2, 1),
    ("Restaurante D", "NY, EEUU", "Pizza, Hamburguesas", 4.0, 1),
    ("Restaurante E", "Talca, Chile", "Hamburguesas, Completos", 4.7, 0),
    ("Restaurante F", "Santiago, Chile", "Tortas, Baguettes", 3.9, 1),
    ("Restaurante G", "Rancagua, Chile", "Vegetariano, Ensaladas", 4.1, 0),
    ("Restaurante H", "Beijing, China", "Asiatica, Curry", 4.3, 1),
    ("Restaurante I", "Guadalajara, Mexico", "Burritos, Tandoori", 4.6, 0),
    ("Restaurante J", "Toronto, Canada", "Pizza, Sushi", 3.5, 1)
]

# Insert restaurants in database
for restaurant in restaurants:
    conn.execute('''INSERT INTO restaurant (name, locate, food, score, visited)
                    VALUES (?, ?, ?, ?, ?)''', restaurant)

conn.commit()
conn.close()