# trading-journal-academy-pro
Dashboard profesional de trading journal para academias - Análisis de consistencia y efectividad de señales de trading

## Descripción

Trading Journal Academy Pro es una aplicación web desarrollada en React + TypeScript que proporciona un dashboard profesional para el seguimiento y análisis de operaciones de trading. Diseñada especialmente para academias de trading y sus estudiantes.

## Características Principales

- **Dashboard Analítico**: Visualización de métricas clave como winrate, expectativa, drawdown y consistencia
- **Registro de Operaciones**: Sistema completo para documentar trades con detalles de entrada, salida, estrategia y resultado
- **Gestión de Traders**: Administración de múltiples estudiantes/traders
- **Análisis de Consistencia**: Seguimiento de la curva de equity y rendimiento a lo largo del tiempo
- **Interfaz Intuitiva**: Diseño moderno y responsive

## Tecnologías Utilizadas

- React 18
- TypeScript
- React Router para navegación
- IndexedDB para almacenamiento local
- Componentes modulares

## Estructura del Proyecto

```
/componentes
  - Tablero.tsx        (Dashboard principal)
  - Diseño.tsx         (Layout de la aplicación)
  - FormularioComercial.tsx  (Formulario para registrar trades)
  - ListaDeComercio.tsx      (Lista de operaciones)
  - ListaDeComerciantés.tsx  (Lista de traders)
/servicios
  - dbService.ts       (Gestión de IndexedDB)
  - tipos.ts           (Definiciones de tipos TypeScript)
Aplicación.tsx        (Componente principal)
índice.tsx             (Punto de entrada)
```

## Cómo Subir el Código desde Google AI Studio

### Opción 1: Descarga y Git CLI

1. En Google AI Studio, haz clic en "Descargar aplicación" (icono de descarga en la barra superior)
2. Extrae el archivo ZIP descargado
3. Abre una terminal en la carpeta del proyecto
4. Ejecuta los siguientes comandos:

```bash
git init
git add .
git commit -m "Initial commit: Trading Journal Academy Pro"
git remote add origin https://github.com/ivansilverorevolution-netizen/trading-journal-academy-pro.git
git push -u origin main
```

### Opción 2: Interfaz Web de GitHub

1. Descarga la aplicación desde Google AI Studio
2. En este repositorio, haz clic en "Add file" > "Upload files"
3. Arrastra todos los archivos del proyecto
4. Escribe un mensaje de commit y confirma

## Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/ivansilverorevolution-netizen/trading-journal-academy-pro.git

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## Enlace a Google AI Studio

Proyecto original: [Trading Journal Academy Pro en Google AI Studio](https://aistudio.google.com/apps/drive/1WHt82OolpzGhzHWsPXcjV0DOBifVCqeS)

## Licencia

Este proyecto es de uso privado para Trading Sin Fronteras Academy.

## Contacto

Desarrollado para Trading Sin Fronteras - Academia de Trading Profesional
