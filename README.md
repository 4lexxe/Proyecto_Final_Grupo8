# Proyecto Grupo 8 — Instrucciones rápidas

Pasos mínimos (Windows — PowerShell): clonar, instalar dependencias y ejecutar servidor y cliente.

Requisitos
- Node.js (v16+)
- npm
- MongoDB si usas base de datos local

Pasos

1) Clonar y entrar en la carpeta del proyecto

```powershell
git clone https://github.com/4lexxe/Proyecto_Final_Grupo8.git
cd Proyecto_Final_Grupo8
```

2) Instalar dependencias del backend (raíz)

```powershell
npm install
```

3) Iniciar el servidor

```powershell
# opción simple
node server.js
# o si existe script
npm start
```

4) Instalar y ejecutar el cliente

```powershell
cd client
npm install
npm run dev
```

5) Abrir la app
- Cliente: http://localhost:5173 (o el puerto que muestre Vite)
- API: http://localhost:5000

Notas rápidas
- Si `npm install` ya instala paquetes como `express`, `cors`, `dotenv` y `mongoose`, no necesitas instalarlos manualmente. Si faltan, instálalos con: `npm install express cors dotenv mongoose`.
