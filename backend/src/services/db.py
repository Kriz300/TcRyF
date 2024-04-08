#Basic imports
import sqlite3

#Connection with database
def get_db_connection():
    try:
        return sqlite3.connect('DB/DB.db')
    
    except Exception as ex:
        print(ex)
        return None

#Function to insert elements into the database
def insert_restaurant(name, locate, food, score, visited):
    conn = get_db_connection()
    try:
        conn.execute('''INSERT INTO restaurant (name, locate, food, score, visited) 
                     VALUES (?, ?, ?, ?, ?)''', [name, locate, food, score, visited])
        conn.commit()
        conn.close()
        return True
    
    except Exception as ex:
        print(ex)
        conn.close()
        return False 

#Function to update elements into the database
def update_restaurant(id, name, locate, food, score, visited):
    conn = get_db_connection()
    try:
        conn.execute('''UPDATE restaurant SET name=?, locate=?, food=?, score=?, visited=?
                      WHERE restaurant_ID=?''', [name, locate, food, score, visited, id])
        conn.commit()
        conn.close()
        return True
    
    except Exception as ex:
        print(ex)
        conn.close()
        return False

#Function to delete elements into the database
def delete_restaurant(id):
    conn = get_db_connection()
    try:
        conn.execute('''DELETE FROM restaurant
                      WHERE restaurant_ID=?''', [id])
        conn.commit()
        conn.close()
        return True
    
    except Exception as ex:
        print(ex)
        conn.close()
        return False