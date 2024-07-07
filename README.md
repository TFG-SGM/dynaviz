# DynaViz

<img src="./client/dist/dynaviz.png" width=100px>

## Sobre la App
Este proyecto es parte del Trabajo Fin de Grado de Ingeniería Informática.

**Características**
- Dos roles: administrador y médico.
- Funciones de administrador:
  - Gestionar otros administradores, médicos y pacientes.
  - Editar datos de su cuenta.
- Funciones de médico:
  - Gestionar pacientes.
  - Gestionar pruebas de pacientes.
  - Editar datos de su cuenta.  
- Diseño responsive.

**Tecnología y Herramientas**
- TypeScript
- MongoDB
- Express
- React
- Node
- Cypress
- Vite

## Prerrequisitos e Instalación 

Para utilizar DynaViz de manera local es necesario contar con la instalación previa del gestor de
paquetes *pnpm* y el gestor de base de datos *MongoDB Compass*.

Una vez completada la instalación de la tecnología requerida, se pueden seguir los siguientes
pasos para desplegar la aplicación:

1. Iniciar la aplicación Web con `pnpm install`, seguido de `pnpm run dev`.

2. Generar los datos aleatorios con `pnpm run generate`.

3. Iniciar sesión con el correo del administrador o médico (el cual se puede ver en la BD de
MongoDB Compass) y usando la contraseña “admin” o “doctor” según el rol con el que se este iniciando sesión.

Por otro lado si se quiere iniciar las pruebas de *cypress* se utilizará el comando `pnpm run test`.

## Memoria

La [memoria del proyecto](https://github.com/TFG-SGM/memoria/blob/main/templateAPP/output/tfgii.pdf) se ha escrito utilizando la [plantilla](https://www.felixalbertos.com/resources/downloads/tfg_template.html) del tutor Félix Albertos Marco.

## Demo
En este [vídeo](./assets/dynaviz-video.mp4) se muestra una demostración de la aplicación Web tanto con el rol de administrador como con el de médico.

## Autores
- Autor: Sergio García Muñoz.
- Tutores: Félix Albertos Marco y Juan Enrique Garrido Navarro.

## Licencia
Este proyecto es de código abierto y está disponible bajo la [licencia MIT](./LICENSE).