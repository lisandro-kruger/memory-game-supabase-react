# Memory Game App

## Descripción

Este proyecto es un juego de memoria interactivo. Los jugadores pueden iniciar el juego, jugar hasta que se acabe el tiempo, y luego guardar su puntuación con su nombre. Las puntuaciones se guardan en una base de datos y se muestran en una tabla de clasificación.

## Componentes Principales

El proyecto consta de los siguientes componentes principales:

- **App**: Este es el componente principal que maneja el estado del juego y coordina los otros componentes.
- **Cards**: Este componente maneja la lógica del juego y muestra las cartas en la interfaz de usuario.
- **Ranking**: Este componente recupera y muestra la tabla de clasificación de la base de datos.
- **Timer**: Este componente maneja la lógica del temporizador del juego.

## Despliegue

El proyecto se ha desplegado utilizando Vercel.

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías y librerías:

- @emotion/react y @emotion/styled
- @material-ui/core y @mui/material
- @supabase/supabase-js
- axios
- react-canvas-confetti
- react-countdown
