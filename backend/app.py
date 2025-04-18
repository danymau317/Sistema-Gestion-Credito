from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)
DATABASE = "data/database.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/creditos', methods=['GET'])
def credit_list():
    conn = get_db_connection()
    credits = conn.execute('SELECT * FROM creditos').fetchall()
    conn.close()
    return jsonify([dict(row) for row in credits])


@app.route('/api/creditos', methods=['POST'])
def add_credit():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute('''
    INSERT INTO creditos (cliente, monto, tasa_interes, plazo, fecha_otorgamiento)
    VALUES (?, ?, ?, ?, ?)
''', (data['cliente'], data['monto'], data['tasa_interes'], data['plazo'], data['fecha_otorgamiento']))

    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Credito Registrado Correctamente"}),201 
    
@app.route('/api/creditos/<int:id>', methods=['PUT'])
def update_credit(id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    cliente = data.get('cliente')
    monto = data.get('monto')
    tasa_interes = data.get('tasa_interes')
    plazo = data.get('plazo')
    fecha_otorgamiento = data.get('fecha_otorgamiento')

    conn = get_db_connection()
    conn.execute('''
        UPDATE creditos SET cliente=?, monto=?, tasa_interes=?, plazo=?, fecha_otorgamiento=?
        WHERE id=?
    ''', (cliente, monto, tasa_interes, plazo, fecha_otorgamiento, id))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Crédito actualizado correctamente"}), 200


# Ruta para eliminar un crédito
@app.route('/api/creditos/<int:id>', methods=['DELETE'])
def delete_credit(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM creditos WHERE id=?', (id,))
    conn.commit()
    conn.close()
    return jsonify({"mensaje": "Crédito eliminado correctamente"})

if __name__ == '__main__':
    app.run(debug=True)

#! POST (AGREGAR)
#curl.exe -X POST http://127.0.0.1:5000/api/creditos -H "Content-Type: application/json" -d '{\"cliente\": \"Juan Pérez\", \"monto\": 10000, \"tasa_interes\": 5.5, \"plazo\": 12, \"fecha_otorgamiento\": \"2025-04-17\"}'

#! GET (OBTENER)
# curl.exe -X GET http://127.0.0.1:5000/api/creditos

#! PUT (ACTUALIZAR EXISTENTE)
# curl.exe -X PUT http://127.0.0.1:5000/api/creditos/1 -H "Content-Type: application/json" -d '{\"cliente\": \"Juan Pérez\", \"monto\": 12000, \"tasa_interes\": 6.0, \"plazo\": 14, \"fecha_otorgamiento\": \"2025-04-17\"}'

#! DELETE (ELIMINAR POR ID)
# curl.exe -X DELETE http://127.0.0.1:5000/api/creditos/1

