# SportMatch

**SportMatch** es una plataforma tecnológica integral y una red social gamificada diseñada para la comunidad de entusiastas de los deportes al aire libre (Running, Hiking, Trail).

Conecta a deportistas locales, gamifica su progreso mediante insignias y proporciona a los organizadores de eventos un potente SaaS para la gestión automatizada y el seguimiento GPS en tiempo real de sus participantes.

---

## Características Principales

### Para la Comunidad (Corredores y Senderistas)

* **Onboarding Inteligente:** Perfilamiento inicial basado en preferencias, nivel de experiencia y métricas corporales.
* **Feed de Eventos:** Descubre carreras, caminatas grupales y retos locales con mapas de ruta y niveles de dificultad.
* **Vitrina de Logros:** Sistema de gamificación que otorga *Insignias* automáticas al validar rutas completadas por GPS.
* **SportShorts (Reels):** Sección estilo TikTok para compartir videos cortos de rutas, paisajes y entrenamientos.
* **Social & Match:** Conecta con amigos, organiza salidas y utiliza dinámicas lúdicas como la "Cartulina Digital" para interactuar con la comunidad.

### Para Organizadores (SaaS B2B)

* **Gestión de Eventos:** Creación de rutas, descripción, dificultad y gestión de inscripciones sin papel.
* **Live Tracking & Seguridad:** Monitoreo en tiempo real de todos los participantes durante la carrera mediante GPS, con alertas de retraso o desvío de ruta.
* **Pase de Lista Digital:** Automatización de la asistencia mediante validación GPS o código QR.

---

## Stack Tecnológico

**Frontend (Aplicación Web)**

* [React.js](https://react.dev/) - Biblioteca para la construcción de interfaces web
* [Vite](https://vite.dev/) - Herramienta de desarrollo y construcción
* [React Router](https://reactrouter.com/) - Enrutamiento de la aplicación web
* [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para el diseño de la interfaz

**Backend & Servicios Externos (API Independiente)**

* API Pyhton
* PostgreSQL
* JWT (JSON Web Tokens) para autenticación segura


## Arquitectura del Proyecto

El proyecto sigue una arquitectura **Feature-Based** escalable, combinando un menú lateral (`Drawer`) con pestañas inferiores (`Bottom Tabs`):

```text
SportMatch/
│
├── public/                              # Archivos públicos
│   └── ...
│
├── src/                                 # Código fuente de la aplicación
│   │
│   ├── assets/                          # Recursos estáticos
│   │   ├── images/                      # Imágenes de la aplicación
│   │   │   ├── Logo-SportMatch.webp     # Logo principal
│   │   │   ├── events/                  # Imágenes de eventos
│   │   │   ├── profiles/                # Fotos de perfiles
│   │   │   ├── badges/                  # Imágenes de insignias
│   │   │   └── shorts/                  # Imágenes de SportShorts
│   │   │
│   │   └── icons/                       # Iconos SportMatch
│   │
│   ├── components/                      # Componentes reutilizables
│   │   │
│   │   ├── ui/                          # Componentes visuales genéricos
│   │   │   ├── Button/
│   │   │   │   └── Button.tsx           # Botones
│   │   │   ├── Card/
│   │   │   │   └── Card.tsx             # Tarjetas
│   │   │   ├── Input/
│   │   │   │   └── Input.tsx            # Campos de entrada
│   │   │   ├── Modal/
│   │   │   │   └── Modal.tsx            # Ventanas modales
│   │   │   ├── Avatar/
│   │   │   │   └── Avatar.tsx           # Avatar de usuario
│   │   │   ├── Badge/
│   │   │   │   └── Badge.tsx            # Insignias
│   │   │   ├── Loader/
│   │   │   │   └── Loader.tsx           # Indicador de carga
│   │   │   ├── Tabs/
│   │   │   │   └── Tabs.tsx             # Pestañas
│   │   │   └── Select/
│   │   │       └── Select.tsx            # Selector
│   │   │
│   │   ├── layout/                      # Estructura de la interfaz
│   │   │   ├── Navbar.tsx                # Barra superior
│   │   │   ├── Sidebar.tsx               # Menú lateral
│   │   │   ├── Footer.tsx                # Pie de página
│   │   │   └── BottomNavigation.tsx      # Navegación móvil
│   │   │
│   │   └── common/                      # Componentes propios de SportMatch
│   │       ├── EventCard.tsx             # Tarjeta de evento
│   │       ├── UserCard.tsx              # Tarjeta de usuario
│   │       ├── AchievementCard.tsx       # Tarjeta de logro
│   │       ├── ActivityCard.tsx          # Tarjeta de actividad
│   │       ├── Map.tsx                   # Componente de mapa
│   │       ├── SearchBar.tsx             # Barra de búsqueda
│   │       └── EmptyState.tsx            # Estado sin contenido
│   │
│   ├── pages/                           # Pantallas completas
│   │   │
│   │   ├── auth/                      # Páginas públicas
│   │   │   ├── Inicio.tsx                # Página principal
│   │   │   ├── Login.tsx                 # Inicio de sesión
│   │   │   ├── Registro.tsx              # Registro
│   │   │   └── RecuperarPassword.tsx     # Recuperación de contraseña
│   │   │
│   │   ├── onboarding/                  # Configuración inicial
│   │   │   ├── Onboarding.tsx            # Flujo de onboarding
│   │   │   ├── Preferencias.tsx          # Preferencias deportivas
│   │   │   ├── Experiencia.tsx           # Nivel deportivo
│   │   │   └── Objetivos.tsx             # Objetivos del usuario
│   │   │
│   │   ├── usuario/                     # Área del deportista
│   │   │   ├── Feed.tsx                  # Feed principal
│   │   │   ├── Perfil.tsx                # Perfil del usuario
│   │   │   ├── EditarPerfil.tsx          # Edición del perfil
│   │   │   ├── Amigos.tsx                # Amigos y conexiones
│   │   │   └── Configuracion.tsx         # Configuración
│   │   │
│   │   ├── eventos/                     # Eventos deportivos
│   │   │   ├── Eventos.tsx               # Lista de eventos
│   │   │   ├── DetalleEvento.tsx         # Detalle del evento
│   │   │   ├── CrearEvento.tsx           # Crear evento
│   │   │   └── EditarEvento.tsx          # Editar evento
│   │   │
│   │   ├── actividades/                 # Actividades deportivas
│   │   │   ├── Actividades.tsx           # Historial de actividades
│   │   │   ├── IniciarActividad.tsx      # Iniciar actividad
│   │   │   ├── SeguimientoGPS.tsx        # Seguimiento GPS
│   │   │   └── ResumenActividad.tsx      # Resumen de actividad
│   │   │
│   │   ├── logros/                      # Sistema de gamificación
│   │   │   ├── Logros.tsx                # Lista de logros
│   │   │   └── DetalleLogro.tsx          # Detalle del logro
│   │   │
│   │   ├── sportshorts/                 # Videos deportivos
│   │   │   ├── SportShorts.tsx           # Feed de videos
│   │   │   ├── CrearShort.tsx            # Crear video
│   │   │   └── ShortDetalle.tsx           # Detalle del video
│   │   │
│   │   └── organizer/                   # Área de organizadores
│   │       ├── Dashboard.tsx             # Panel principal
│   │       ├── MisEventos.tsx             # Eventos administrados
│   │       ├── Participantes.tsx          # Participantes
│   │       ├── LiveTracking.tsx           # GPS en tiempo real
│   │       ├── Asistencia.tsx             # Control de asistencia
│   │       └── Alertas.tsx                # Alertas de seguridad
│   │
│   ├── routes/                           # Configuración de navegación
│   │   ├── AppRoutes.tsx                 # Rutas principales
│   │   ├── ProtectedRoute.tsx            # Rutas autenticadas
│   │   └── OrganizerRoute.tsx            # Rutas de organizadores
│   │
│   ├── services/                         # Comunicación con backend
│   │   ├── api.ts                        # Cliente HTTP
│   │   ├── authService.ts                # Autenticación
│   │   ├── userService.ts                # Usuarios
│   │   ├── eventService.ts               # Eventos
│   │   ├── activityService.ts            # Actividades
│   │   ├── achievementService.ts         # Logros
│   │   └── organizerService.ts            # Organizadores
│   │
│   ├── hooks/                            # Hooks personalizados
│   │   ├── useAuth.ts                    # Estado de autenticación
│   │   ├── useEvents.ts                  # Lógica de eventos
│   │   ├── useGeolocation.ts             # Geolocalización
│   │   ├── useActivity.ts                # Lógica de actividades
│   │   └── useModal.ts                   # Control de modales
│   │
│   ├── types/                            # Tipos e interfaces TypeScript
│   │   ├── images.d.ts                   # Tipos de imágenes
│   │   ├── react-app-env.d.ts            # Tipos del entorno
│   │   ├── user.types.ts                 # Tipos de usuario
│   │   ├── event.types.ts                # Tipos de eventos
│   │   ├── activity.types.ts             # Tipos de actividades
│   │   ├── achievement.types.ts          # Tipos de logros
│   │   ├── short.types.ts                # Tipos de SportShorts
│   │   └── organizer.types.ts            # Tipos de organizador
│   │
│   ├── data/                             # Datos temporales/mock
│   │   ├── mockUsers.ts                  # Usuarios de prueba
│   │   ├── mockEvents.ts                 # Eventos de prueba
│   │   ├── mockActivities.ts             # Actividades de prueba
│   │   └── mockAchievements.ts            # Logros de prueba
│   │
│   ├── utils/                            # Funciones auxiliares
│   │   ├── formatDate.ts                 # Formatear fechas
│   │   ├── formatDistance.ts             # Formatear distancias
│   │   ├── formatTime.ts                 # Formatear tiempos
│   │   └── validators.ts                 # Validaciones
│   │
│   ├── index.css                         # Estilos globales
│   ├── index.tsx                         # Punto de entrada de React
│   ├── main.tsx                          # Router principal
│   ├── reportWebVitals.ts                # Métricas de rendimiento
│   └── setupTests.ts                     # Configuración de pruebas
│
├── .env                                  # Variables de entorno locales
├── .gitignore                            # Archivos ignorados por Git
├── package.json                          # Dependencias del proyecto
└── README.md                             # Documentación del proyecto
``` 

## REGLAS DE ARQUITECTURA

1. Las páginas van en /pages.
2. Los componentes reutilizables van en /components.
3. Los componentes UI genéricos van en /components/ui.
4. La navegación va en /routes.
5. Las llamadas a API van en /services.
6. Los hooks reutilizables van en /hooks.
7. Los tipos de TypeScript van en /types.
8. Los datos temporales/mock van en /data.
9. Las funciones auxiliares van en /utils.
11. No duplicar componentes existentes.
