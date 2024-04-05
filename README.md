# DynaViz

Aplicación Web DynaViz sobre el Trabajo Fin de Grado de Sergio García Muñoz

## Requisitos

- Tener un gestor de paquetes (como pnpm) para instalar dependencias
- Tener una base de datos de mongo en local

## Guía de Uso

**Servidor**
- Ir a la carpeta de servidor: ```cd /server```
- Instalar dependencias: ```pnpm install```
- Ejecutar el servidor: ```pnpm run dev```

**Cliente**
- Ir a la carpeta de cliente: ```cd /../client```
- Instalar dependencias: ```pnpm install```
- Ejecutar el cliente: ```pnpm run dev```
- Ir a [http://localhost:5173/](http://localhost:5173/)

**Generar datos**
- Ejecutar el comando ```pnpm run generate```
- Ir a la base de datos llamada "*dynaviz*" y elegir un *correo* de un usuario (admin o doctor)
- Iniciar sesión con correo electrónico y con la contraseña "*admin*" o "*doctor*" según el rol del usuario con el que se quiere iniciar sesión