# DynaViz

Aplicación Web DynaViz sobre el Trabajo Fin de Grado de Sergio García Muñoz

## Requisitos

- Tener el gestor de paquetes *pnpm* 
- Tener una base de datos de mongo en local

## Guía de Uso

**Iniciar App**

```pnpm install```

```pnpm run dev```

**Generar datos**

```pnpm run generate```

**Testear interfaz con cypress**

```pnpm run test```

**Iniciar sesión**
- Ejecutar el comando: ```pnpm run generate```
- Ir a la base de datos llamada "*dynaviz*" y elegir un *correo* de un usuario (admin o doctor).
- Iniciar sesión con correo electrónico y con la contraseña "*admin*" o "*doctor*" según el rol del usuario con el que se quiere iniciar sesión.