# Mus-Match Frontend

Interfaz de usuario para la aplicación Mus-Match, una plataforma para conectar jugadores de mus y gestionar partidas online.

## 🚀 Características

- 👤 Autenticación de usuarios (registro e inicio de sesión)
- 🎮 Creación y gestión de partidas
- 💬 Chat en tiempo real entre jugadores
- 📱 Diseño responsive
- 🔔 Sistema de notificaciones
- 👥 Tabla de jugadores
- 📊 Gestión de perfiles

## 🛠️ Tecnologías

- React + Vite
- Context API para gestión de estado
- CSS para estilos
- Axios para peticiones HTTP
- React Router para navegación

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── GameChat       # Componente de chat
│   ├── GamePlayersTable
│   ├── HomeComp
│   ├── Navbar
│   └── Notification
├── context/           # Context API
│   └── AuthContext
├── pages/             # Páginas de la aplicación
│   ├── AllGamesPage
│   ├── GameDetailsPage
│   ├── LoginPage
│   ├── NewGame
│   ├── ProfilePage
│   ├── SignUpPage
│   └── UpdateGamePage
└── assets/           # Recursos estáticos
```

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Oscarigu/mus-match-frontend.git
```

2. Instala las dependencias:
```bash
cd mus-match-frontend
npm install
```

3. Crea un archivo `.env` con las siguientes variables:
```
VITE_API_URL=http://localhost:5005/api
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔍 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Previsualiza la build de producción

## 📱 Páginas y Rutas

- `/` - Página principal
- `/login` - Inicio de sesión
- `/signup` - Registro de usuarios
- `/profile` - Perfil de usuario
- `/games` - Lista de partidas
- `/games/new` - Crear nueva partida
- `/games/:id` - Detalles de partida
- `/games/:id/edit` - Editar partida

## 🤝 Integración con Backend

La aplicación se comunica con el backend a través de una API REST. Asegúrate de que el servidor backend esté corriendo en `http://localhost:5005` o actualiza la URL en el archivo `.env` según corresponda.

## 🔒 Seguridad

- Autenticación mediante JWT
- Rutas protegidas
- Validación de formularios
- Manejo seguro de tokens

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
