# Cap&Sock

Sistema de gestión y venta de gorras y medias con panel administrativo y API REST.

## Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Autores](#-autores)

## ✨ Características

### Panel Administrativo
- 🔐 Sistema de autenticación con sesiones
- 📊 Dashboard
- 📦 CRUD completo de productos
- 🏷️ Gestión de categorías
- 📋 Visualización de ventas
- ✅ Activación/Desactivación de productos

### API REST
- 🔑 Autenticación JWT
- 📱 Endpoints RESTful
- 🔒 Middleware de autorización
- ✅ Validación de datos
- 📄 Paginación de resultados

### Tienda Online
- 🛍️ Catálogo de productos
- 🔍 Filtrado por categorías

## 🛠️ Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Base de datos
- **bcrypt** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **express-session** - Manejo de sesiones

### Frontend
- **EJS** - Motor de plantillas
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconografía

### Herramientas
- **Multer** - Upload de archivos
- **dotenv** - Variables de entorno
- **Postman** - Testing de API

## 📦 Requisitos Previos

```bash
node --version  # v18.0.0 o superior
mysql --version # 8.0 o superior
npm --version   # 9.0.0 o superior
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/cap-and-sock.git
cd cap-and-sock
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

```sql
CREATE DATABASE programacion3_tp;
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DB_DATABASE=programacion3_tp
DB_USER=root
DB_PASSWORD=tu_password
# Server
PORT=3000
```

### 5. Inicializar la base de datos

```bash
node seedDatabase.js
```

Este comando creará todas las tablas e insertará datos de prueba:
- 2 usuarios administradores
- 2 categorías (Gorras y Medias)
- 16 productos
- 3 órdenes

### 6. Iniciar el servidor

```bash
node app.js
```

El servidor estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Credenciales de prueba

**Panel Administrativo:**
- Email: `tomas@example.com`
- Password: `password123`

**Alternativa:**
- Email: `jacob@example.com`
- Password: `password123`

### Estructura de carpetas para imágenes

Las imágenes de productos se guardan en:
```
public/assets/img/
```

Formatos soportados: `.jpg`, `.jpeg`, `.png`, `.webp`

## 🎯 Uso

### Acceder al Panel Administrativo

1. Navega a `http://localhost:3000/admin/login`
2. Ingresa las credenciales de prueba
3. Accede al dashboard

### Usar la API

1. **Obtener token de autenticación:**

```bash
POST http://localhost:3000/admin/api/login
Content-Type: application/json

{
  "email": "tomas@example.com",
  "password": "password123"
}
```

2. **Usar el token en las peticiones:**

```bash
GET http://localhost:3000/admin/api/products
Authorization: Bearer tu_token_jwt
```

## 📁 Estructura del Proyecto

```plaintext
cap-and-sock/
├── controllers/
├── db/               
├── middleware/
├── models/
├── public/
├── routes/
├── views/
├── .env                               
├── .gitignore                         
├── app.js                             
├── seedDatabase.js                   
├── package.json                       
└── README.md                         
```

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/admin/api/register` | Registrar nuevo usuario | ❌ |
| POST | `/admin/api/login` | Iniciar sesión y obtener JWT | ❌ |

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/admin/api/products` | Listar productos (paginado) | ✅ |
| GET | `/admin/api/products/:id` | Obtener producto por ID | ✅ |
| POST | `/admin/api/products` | Crear nuevo producto | ✅ |
| PUT | `/admin/api/products/:id` | Actualizar producto | ✅ |
| PATCH | `/admin/api/products/:id/desactivar` | Desactivar producto | ✅ |
| DELETE | `/admin/api/products/:id` | Eliminar producto | ✅ |

### Órdenes

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/admin/api/orders` | Listar todas las órdenes | ✅ |

### Ejemplos de uso

#### Crear producto (JSON)
```http
POST /admin/api/products
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Gorra Negra Trucker",
  "id_category": 1,
  "color": "Negro",
  "price": "12000",
  "stock": 10,
  "status": true,
  "attributes": {
    "tipo": "Trucker"
  }
}
```

**Response (201 Created):**
```json
{
  "id": 17,
  "title": "Gorra Negra Trucker",
  "id_category": 1,
  "color": "Negro",
  "price": "12000",
  "stock": 10,
  "status": true,
  "image_url": "/assets/img/placeholder.png",
  "attributes": {
    "tipo": "Trucker"
  }
}
```

#### Obtener productos con paginación
```http
GET /admin/api/products?page=1&limit=10
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "productos": [...],
  "totalPages": 2,
  "currentPage": 1,
  "total": 16
}
```

## 🗃️ Base de Datos

### Tablas

**admin_users**
- Usuarios administradores del sistema
- Contraseñas hasheadas con bcrypt

**product_categories**
- Categorías de productos (Gorras, Medias)

**product_items**
- Productos del catálogo
- Atributos dinámicos en formato JSON
- Campo status para activar/desactivar

**orders**
- Órdenes de compra de clientes

**product_orders**
- Tabla pivot entre órdenes y productos
- Almacena cantidad y precio al momento de la compra

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (salt rounds: 10)
- ✅ Tokens JWT con expiración de 8 horas
- ✅ Validación de inputs en middleware
- ✅ Protección de rutas con autenticación
- ✅ Validación de tipos de archivo para uploads
- ✅ Sanitización de datos con Sequelize

## 👥 Autores

- Cristopher Jacob
- Tomás Blanco