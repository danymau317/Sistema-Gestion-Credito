import sqlite3

connection = sqlite3.connect("data/database.db")
cursor = connection.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS creditos(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
cliente TEXT NOT NULL, 
monto REAL NOT NULL,
tasa_interes REAL NOT NULL, 
plazo INTEGER NOT NULL,
fecha_otorgamiento TEXT NOT NULL 
)
'''    
)

connection.commit()
connection.close() 	