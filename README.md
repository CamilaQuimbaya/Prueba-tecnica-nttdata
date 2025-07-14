# 📒 My Note App

Aplicación web de notas desarrollada como solución a una prueba técnica para la vacante de frontend developer.

## 🎯 Objetivo General

Diseñar una aplicación web clara, responsiva y funcional que consuma datos desde un backend simulado o real, cumpliendo con buenas prácticas de desarrollo, tipado fuerte en TypeScript, manejo de estado, validaciones y pruebas básicas.

## 🚀 Demo desplegado

🔗 [Ver aplicación en producción (Vercel)](https://prueba-tecnica-nttdata.vercel.app/login)  
🔗 [Backend desplegado (Railway)](https://backend-crud-y-jwt-production.up.railway.app)

## 🧱 Estructura del Proyecto

```
my-note-app/
├── public/
├── src/
│   ├── api/               # Axios instance y servicios HTTP
│   ├── app/               # Redux store y hooks globales
│   ├── auth/              # Dominio de autenticación
│   ├── notes/             # Dominio de notas (crear, listar, editar, eliminar)
│   ├── components/        # Navbar, Spinner, etc.
│   ├── routes/            # Rutas protegidas
│   ├── styles/            # Estilos globales o Tailwind config
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.html
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## ⚙️ Tecnologías y Librerías

- **React + Vite + TypeScript**
- **Redux Toolkit** (manejo de estado)
- **Axios** (llamadas a la API)
- **React Router v6**
- **TailwindCSS** (diseño responsivo)
- **Jest + React Testing Library** (pruebas)
- **Vercel** (frontend desplegado)
- **Railway** (backend desplegado: Express + MongoDB)
- **Framer Motion** (animaciones suaves y controladas)
- **React Icons** (íconos SVG personalizables)

## ✅ Funcionalidades

- ✅ Autenticación (login / registro)
- ✅ Listar tareas/notas
- ✅ Crear nuevas tareas
- ✅ Marcar como completada o pendiente
- ✅ Eliminar tarea
- ✅ (Opcional) Editar título y contenido de la tarea
- ✅ Responsive Design (móvil y escritorio)
- ✅ Validaciones de formulario
- ✅ Prueba unitaria con Testing Library

## 🧪 Pruebas

Incluye al menos una prueba unitaria usando **Jest + React Testing Library**.  
Ejemplo: prueba para verificar que el componente `NotaCard` renderiza correctamente su contenido y botones.

```bash
npm run test

```

## 🧠 Justificación tecnológica

Elegí trabajar con **React y TypeScript** porque es un stack moderno que me permite desarrollar interfaces reactivas, escalables y mantenibles. TypeScript me ayuda muchísimo a evitar errores en tiempo de desarrollo gracias al tipado fuerte, y además mejora mucho la experiencia al trabajar en equipo o mantener el código a largo plazo.

Usé **Vite** como bundler porque es súper rápido y simplifica mucho la configuración inicial. Me permitió enfocarme directamente en la lógica y la estructura del proyecto, sin perder tiempo en configuraciones complejas.

Para manejar el estado decidí usar **Redux Toolkit** porque me permite estructurar el estado global por dominios (como auth y notas) de forma clara y con menos código repetido. También se integra muy bien con TypeScript y hace que el flujo de datos sea predecible y fácil de depurar.

Con **Axios** gestioné todas las peticiones HTTP. Me gusta usarlo porque puedo crear una instancia personalizada para tener una configuración global (como headers, interceptores, etc.) y centralizar toda la lógica de red.

El diseño lo hice con **TailwindCSS** porque me permite crear interfaces modernas, responsivas y bien organizadas sin escribir tanto CSS. Me ayudó a avanzar rápido en el diseño y mantener consistencia visual en todos los componentes.

También agregué **Framer Motion** para darle vida a la app con animaciones suaves, y **React Icons** para mejorar la estética y la usabilidad con íconos accesibles y ligeros.

Por último, incluí pruebas con **Vitest**, **Jest** y **React Testing Library** porque considero importante asegurar que los componentes clave funcionen correctamente, y me gusta mantener una base mínima de tests incluso en proyectos pequeños.

## ⏱️ Tiempo estimado de desarrollo

Aproximadamente **12 horas** distribuidas así:

- 3h estructura inicial + autenticación
- 4h notas (CRUD + validaciones)
- 2h diseño responsive
- 1h testing y detalles finales
- 2h despliegue, documentación y pruebas cruzadas

## 🗂️ Organización del proyecto

Decidí organizar las carpetas siguiendo una estructura por dominios, lo cual facilita el mantenimiento, escalabilidad y separación de responsabilidades. Cada carpeta dentro de `src/` agrupa funcionalidad relacionada de forma coherente:

- `api/`: Contiene la configuración de Axios y los servicios HTTP reutilizables para centralizar la lógica de red.
- `app/`: Incluye el store de Redux y los hooks globales de acceso al estado. Esta carpeta representa la configuración base de la aplicación.
- `auth/`: Aglutina todo lo relacionado con autenticación: componentes, páginas, servicios y slice de Redux, siguiendo el principio de separación por dominio.
- `notes/`: Contiene toda la lógica y componentes relacionados con la gestión de notas/tareas. Al igual que `auth`, mantiene su lógica encapsulada y clara.
- `components/`: Guarda componentes compartidos entre distintos dominios, como Navbar o Spinner.
- `routes/`: Contiene la definición de rutas protegidas para el acceso condicional según la autenticación.
- `styles/`: Centraliza los estilos globales y configuraciones personalizadas de Tailwind si son necesarias.

Esta estructura ayuda a mantener el código modular, facilita la reutilización y hace que escalar el proyecto (por ejemplo, agregando nuevos dominios como "profile" o "settings") sea más sencillo y limpio.

## 📦 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/CamilaQuimbaya/Prueba-tecnica-nttdata
cd my-note-app

# 2. Instalar dependencias
npm install


# 3. Ejecutar en modo desarrollo
npm run dev
```

## 👩‍💻 Autor

Desarrollado con amor por [Laura Camila Quimbaya Hernández](https://github.com/CamilaQuimbaya) ✨
