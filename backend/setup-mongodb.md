# 🔧 Configuración de MongoDB Atlas

## 📋 Pasos para Configurar el Backend

### 1. Crear archivo `.env` en el directorio `backend/`

```bash
# Crear el archivo .env
touch backend/.env
```

### 2. Configurar variables de entorno

Agregar al archivo `backend/.env`:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@ac-gwnaxwm-shard-00-00.4yyngfr.mongodb.net:27017,ac-gwnaxwm-shard-00-01.4yyngfr.mongodb.net:27017,ac-gwnaxwm-shard-00-02.4yyngfr.mongodb.net:27017/asistencias?ssl=true&replicaSet=atlas-28oh9y-shard-0&authSource=admin&retryWrites=true&w=majority

# Puerto del servidor
PORT=4000

# Configuración de CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Obtener credenciales de MongoDB Atlas

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com)
2. Inicia sesión en tu cuenta
3. Selecciona tu cluster
4. Ve a "Database Access" → "Add New Database User"
5. Crea un usuario con permisos de lectura/escritura
6. Ve a "Network Access" → "Add IP Address"
7. Agrega tu IP actual o `0.0.0.0/0` para permitir todas las IPs

### 4. Obtener la cadena de conexión

1. En tu cluster, haz clic en "Connect"
2. Selecciona "Connect your application"
3. Copia la cadena de conexión
4. Reemplaza `<username>`, `<password>` y `<dbname>` con tus valores

### 5. Reiniciar el backend

```bash
cd backend
npm start
```

## 🔍 Verificación

Una vez configurado, deberías ver:

```
Servidor backend escuchando en puerto 4000
```

En lugar del error de MongoDB.

## 🚨 Solución de Problemas

### Error: "IP not whitelisted"

- Ve a MongoDB Atlas → Network Access
- Agrega tu IP actual o `0.0.0.0/0`

### Error: "Authentication failed"

- Verifica usuario y contraseña en la cadena de conexión
- Asegúrate de que el usuario tenga permisos de lectura/escritura

### Error: "Connection timeout"

- Verifica que la cadena de conexión sea correcta
- Asegúrate de que el cluster esté activo en MongoDB Atlas




