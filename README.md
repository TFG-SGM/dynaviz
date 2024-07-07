# DynaViz

<img src="./client/dist/dynaviz.png" width=100px>

## Sobre la App
DynaViz es una aplicación Web diseñada para ayudar en el diagnóstico de patologías, centrada inicialmente en la fibromialgia como caso de estudio.

Esta herramienta forma parte del proyecto DIPAMIA (Diagnóstico de Patologías a través del Análisis del Movimiento utilizando Inteligencia Artificial), el cual cuenta con la colaboración de diversos centros en Talavera de la Reina, Ciudad Real e Igualada.

El desarrollo de DynaViz se llevó a cabo como parte del Trabajo de Fin de Grado en Ingeniería Informática realizado por Sergio García Muñoz.

### Características
- Dos roles: administrador y médico.
- Funciones de administrador:
  - Gestionar otros administradores, médicos y pacientes.
  - Editar datos de su cuenta.
- Funciones de médico:
  - Gestionar pacientes.
  - Gestionar pruebas de pacientes.
  - Editar datos de su cuenta.  
- Diseño responsive.

### Tecnología y Herramientas
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

En la [memoria del proyecto](https://github.com/TFG-SGM/memoria/blob/main/templateAPP/output/tfgii.pdf) se puede encontrar una descripción detallada que incluye la introducción, el estado del arte, la propuesta, los resultados, las evaluaciones y las conclusiones, acompañadas de varios anexos.

Cabe resaltar que la memoria se ha escrito utilizando la [plantilla](https://www.felixalbertos.com/resources/downloads/tfg_template.html) del tutor Félix Albertos Marco.

## Demo
En este [vídeo](./assets/dynaviz-video.mp4) se muestra una demostración de la aplicación Web, destacando las funcionalidades disponibles tanto para el rol de administrador como para el de médico.

## Autores
- Autor: Sergio García Muñoz.
- Tutores: Félix Albertos Marco y Juan Enrique Garrido Navarro.

## Licencia
Este proyecto es de código abierto y está disponible bajo la [licencia MIT](./LICENSE).