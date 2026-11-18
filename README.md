
# Pulso Abierto - Actividad 2

## Descripción

Pulso Abierto es una aplicación web desarrollada
con React y TypeScript que permite consultar
precios de criptomonedas mediante la API de CoinGecko.

Proyecto realizado para Programación Web - Módulo 2.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Zod
- CSS
- API pública de CoinGecko

## Funcionalidades

- Consulta de precios de Bitcoin, Ethereum y Solana.
- Búsqueda de criptomonedas por nombre.
- Agregar y quitar criptomonedas favoritas.
- Navegación entre páginas mediante React Router.
- Página de detalle de criptomonedas.
- Página de error 404.
- Formulario de registro con validación Zod.
- Estados de carga, error y ausencia de resultados.
- Componentes reutilizables.

## Estructura del proyecto

src/
  components/
    CryptoCard.tsx
    CryptoControls.tsx
    CryptoForm.tsx
    CryptoList.tsx
    CryptoStatus.tsx
  pages/
    CryptoDetail.tsx
    NotFound.tsx
  services/
    cryptoService.ts
  types/
    crypto.ts
  App.tsx
  main.tsx

## Instalación

1. Instalar Node.js.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

   npm install

4. Iniciar el servidor:

   npm run dev

5. Abrir la dirección local indicada por Vite.

## Compilación de producción

Ejecutar:

npm run build

Para probar la compilación:

npm run preview

## Validaciones

El formulario utiliza Zod para validar el nombre
y la categoría seleccionada.

La aplicación comprueba las respuestas HTTP y
los datos recibidos desde la API.

## Observaciones

Los precios dependen de la disponibilidad de CoinGecko.

Los favoritos se mantienen durante la sesión de
la aplicación, pero no se guardan permanentemente.

El formulario valida y muestra el registro, pero
no almacena información en una base de datos.



## Refactorización y mejora de mantenibilidad – Módulo 4

**Problema identificado:** En el componente `App.tsx`, la normalización del texto de búsqueda se realizaba dentro del método `filter()`, repitiendo la operación para cada criptomoneda.

**Cambio realizado:** Se creó la constante `normalizedSearch` para convertir el texto a minúsculas y eliminar espacios innecesarios antes de ejecutar el filtrado. De esta manera, se evita repetir la operación y se mejora la legibilidad del código.

**Verificación realizada:** Después de la modificación, se ejecutaron los comandos `npm test` y `npm run build`. Las 12 pruebas automatizadas finalizaron correctamente y el proyecto generó el build productivo sin errores.

**Resultado:** Se mejoró la mantenibilidad del código sin modificar el comportamiento esperado de la aplicación.