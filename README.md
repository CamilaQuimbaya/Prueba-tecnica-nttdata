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

Elegí **React con TypeScript** por su ecosistema moderno, excelente soporte de herramientas (Vite, Redux Toolkit, Testing Library), capacidad de escalar el proyecto por dominio y el control total sobre el tipado y flujo de datos.

Además, **Redux Toolkit** permitió manejar el estado de autenticación y notas de forma clara y centralizada.  
**TailwindCSS** me ayudó a lograr una interfaz limpia y responsiva con rapidez.

## ⏱️ Tiempo estimado de desarrollo

Aproximadamente **12 horas** distribuidas así:

- 3h estructura inicial + autenticación
- 4h notas (CRUD + validaciones)
- 2h diseño responsive
- 1h testing y detalles finales
- 2h despliegue, documentación y pruebas cruzadas

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
