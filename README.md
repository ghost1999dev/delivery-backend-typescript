# Proyecto Delivery Backend en TypeScript con TypeORM
<p align="center">
  <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="TypeScript" width="150" />
  <img src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4" alt="TypeORM" width="150" />
  <img src="https://www.angularminds.com/tech-logos/nodejs-logo.svg" alt="TypeORM" width="150" />
  
</p>

Este proyecto es un backend desarrollado en TypeScript utilizando TypeORM como ORM, Express para la gestión de rutas y JWT para la autenticación.

## Instrucciones para crear un proyecto backend con el patron repositorio
```sh
npm init -y 
npm i express morgan dotenv
npm i typescript @types/express @types/morgan ts-node-dev tsconfig-paths
npx tsc --init
```
## Tecnologias utilizadas

- **Node.js** - Entorno de ejecucion de JavaScript
- **Express** - Framework minimalista para crear los servidores
- **TypeScript** - Superset de JavaScript con tipado estatico
- **TypeORM** - ORM para trabajar con bases de datos SQL.
- **bcrypt** - Para encriptación de contraseñas.
- **jsonwebtoken (JWT)** - Para autenticación basada en tokens.
- **ts-node-dev** - Para ejecutar TypeScript en desarrollo con recarga en caliente.
- **dotenv** - Para manejar variables de entorno.
- **morgan** - Middleware para registrar solicitudes HTTP.
- **mysql2** - Cliente de MySQL para Node.js
- **reflect-metadata** - Requerido para el funcionamiento de TypeORM

## Estructura del Proyecto

```
/src
 ├── config/        # Configuración de la base de datos
 ├── controllers/   # Controladores para gestionar las solicitudes
 ├── models/        # Modelos de TypeORM
 ├── repositories/  # Repositorios que interactúan con la base de datos
 ├── services/      # Lógica de negocio
 ├── types/         # Definiciones de tipos para TypeScript
 ├── routes/        # Definición de rutas Express
 ├── app.ts         # Punto de entrada de la aplicación
```
## Instalacion de dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```sh
npm install
```

### Dependencias principales:

```json
{
  "bcrypt": "^5.1.1",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "morgan": "^1.10.0",
  "mysql2": "^3.14.0",
  "reflect-metadata": "^0.2.2",
  "typeorm": "^0.3.21"
}

```

### Dependencias de desarrollo:

```json
{
  "@types/bcrypt": "^5.0.2",
  "@types/express": "^5.0.1",
  "@types/jsonwebtoken": "^9.0.9",
  "@types/morgan": "^1.9.9",
  "ts-node-dev": "^2.0.0",
  "tsconfig-paths": "^4.2.0",
  "typescript": "^5.8.2"
}

```
## Configuracion del entorno

Crea un archivo `.env` en la raiz del proyecto y define las variables de entorno necesarias:

```
DB_HOST=localhost
DB_PORT=tu_puerto
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=nombre_base_datos
JWT_SECRET=tu_clave_secreta

```

## Ejecucion del proyecto

Para iniciar el servidor en modo desarrollo con recargar en caliente, usa:

```sh
npm run dev
```
### Explicacion del script de desarrollo:
```json
"dev": "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/app.ts"
```

- `ts-node-dev` → Ejecuta TypeScript en tiempo real con recarga automática.
- `--respawn` → Reinicia el proceso automáticamente al detectar cambios.
- `--transpile-only` → Solo transcompila TypeScript sin verificar errores de tipos (para acelerar la ejecución en desarrollo).
- `-r tsconfig-paths/register` → Soporta alias de importación definidos en `tsconfig.json`.

## Licencia

Este proyecto esta bajo la licencia MIT 

## © Copyright
&copy; 2025 [ghost1999dev](https://github.com/ghost1999dev). Todos los derechos reservados.