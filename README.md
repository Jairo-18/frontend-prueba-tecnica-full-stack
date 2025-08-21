# ⚡ Frontend con Next.js + Tailwind + Shadcn/ui

Este proyecto es un **frontend moderno** desarrollado en **Next.js 14** que consume el backend en FastAPI desplegado en **Render** (con base de datos Neon).  

Incluye:  
- **Next.js 14** con App Router.  
- **TailwindCSS** para estilos.  
- **Shadcn/ui** y **Lucide Icons** para componentes.  
- **Autenticación con JWT** contra el backend.  
- **Context API / Hooks** para manejar sesión y estado global.  

---

## 🚀 Requisitos

- Node.js **18+**  
- npm o yarn  

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
https://github.com/Jairo-18/frontend-prueba-tecnica-full-stack.git
cd frontend-prueba-tecnica-full-stack

2. Instalar dependencias

npm install
# o
yarn install

3. Crear un archivo .env.local en la raíz del proyecto con:

# URL del backend en Render
NEXT_PUBLIC_API_URL=https://backend-prueba-tecnica-full-stack.onrender.com

4. Iniciar Servidor Local:

npm run dev
