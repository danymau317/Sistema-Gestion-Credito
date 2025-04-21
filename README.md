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
   git clone https://github.com/tu-usuario/Sistema-Gestion-Credito.git
   ```

2. Dirigete a la carpeta del backend
   `cd backend`

3. Instala dependencias
   `pip install -r requirements.txt`

4. Inicializa la base de datos (Solo la primera vez)
   `python data/init_db.py`

5. Ejecuta el servidor flask
   `pyhon app.py`

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
