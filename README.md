# Sistema de Gestión de Créditos

Esta es una aplicación web para **registrar y visualizar créditos** construida con:

- 🐍 **Flask** (backend)
- 🌐 **HTML**, **CSS** y **JavaScript** (frontend)
- 📊 Librería de gráficos **Chart.js**
- 💾 Base de datos **SQLite**

---

## 🚀 Funcionalidades

- 📥 Registro de créditos (nombre del cliente, monto, tasa de interés, plazo en meses y fecha de expedición)
- 📋 Visualización de créditos en una tabla dinámica
- 🗑️ Eliminación de créditos existentes
- ✏️ Edición y actualización de créditos registrados
- 💾 Persistencia de datos con base de datos SQLite
- ⚙️ Operaciones **CRUD** mediante una API REST con Flask
- 📈 Cálculo dinámico de:
  - Número total de créditos
  - Monto total otorgado
  - Monto promedio
- 📊 Visualización de métricas mediante gráficas con Chart.js
- 📱 Diseño responsive para dispositivos móviles, tablets y escritorios
- ✅ Validación de campos del formulario (formato correcto, fechas válidas, etc.)
- 🔢 Generación automática de IDs únicos para cada crédito

---

## 🛠️ Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/danymau317/Sistema-Gestion-Credito
   cd Sistema-Gestion-Credito/backend
   ```

2. Crea un entorno vitual (recomendado)

   ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instala dependencias
   `pip install -r requirements.txt`

4. Inicializa la base de datos (Solo la primera vez)
   `python data/init_db.py`

5. Ejecuta el servidor flask
   `pyhon app.py`

## 🔌 API ENDPOINTS

Base URL: `http://localhost:5000/api/creditos`

| Método | Endpoint             | Descripción                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/api/creditos`      | Lista todos los créditos       |
| POST   | `/api/creditos`      | Crea un nuevo crédito          |
| PUT    | `/api/creditos/<id>` | Actualiza un crédito existente |
| DELETE | `/api/creditos/<id>` | Elimina un crédito por ID      |

## Ejemplos con CURL

- Crea un Crédito

  ```bash
  curl -X POST http://127.0.0.1:5000/api/creditos \
  -H "Content-Type: application/json" \
  -d '{"cliente": "Juan Pérez", "monto": 10000, "tasa_interes": 5.5, "plazo": 12, "fecha_otorgamiento": "2025-04-17"}'
  ```

- Listar Creditos

  ```bash
  curl -X GET http://127.0.0.1:5000/api/creditos
  ```

- Actualizar un Crédito

  ```bash
  curl -X PUT http://127.0.0.1:5000/api/creditos/1 \
  -H "Content-Type: application/json" \
  -d '{"cliente": "Juan Pérez", "monto": 12000, "tasa_interes": 6.0, "plazo": 14, "fecha_otorgamiento": "2025-04-17"}'
  ```

- Eliminar un Crédito

  ```bash
  curl -X DELETE http://127.0.0.1:5000/api/creditos/1
  ```

## 📙 Requisitos

- Python 3.x
- pip (Gestor de paquetes de Python)

## 🦴 Estructura del Proyecto

Sistema-Gestion-Credito/
│
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── data/
│ ├── database.db  
│ └── init_db.py  
│
├── public/
│ ├── index.html
│ ├── assets/
│ │ └── icons/
│ └── styles/
│ └── main.css
│
└── src/
└── js/
├── state.js
├── stats.js
├── credit.js
└── utils.js
