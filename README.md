# Proyecto Backend en TypeScript con TypeORM
![TypeScript](https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png)
![TypeORM](https://typeorm.io/img/logo.png)

Este proyecto es un backend desarrollado en TypeScript utilizando TypeORM como ORM, Express para la gestión de rutas y JWT para la autenticación.

## Tecnologias utilizadas

- **Node.js** - Entorno de ejecucion de JavaScript
- **Express** - Framework minimalista para crear los servidores
- **TypeScript** - Superset de JavaScript con tipado estatico
- **TypeORM** - ORM para trabajar con bases de datos SQL.
- **bcrypt** - Para encriptación de contraseñas.
- **jsonwebtoken (JWT)** - Para autenticación basada en tokens.
- **ts-node-dev** - Para ejecutar TypeScript en desarrollo con recarga en caliente.

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