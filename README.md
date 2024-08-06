# Análisis de Perfiles de Instagram con Express y Vercel AI SDK

La aplicación esta disponible en `[https://aigram-bup6.onrender.com/analysis/:username]`.

Este proyecto es una aplicación web desarrollada con Express que permite analizar perfiles de Instagram utilizando el SDK de Vercel.

## Características

- **Análisis de perfiles**: Obtén información detallada sobre cualquier perfil de Instagram.
- **Despliegue en Vercel**: Implementación sin problemas utilizando la plataforma Vercel.

## Requisitos

- Node.js
- OPENAI_API_KEY
- Vercel AI SDK
- RAPIDAPI_KEY for use the Ig API https://rapidapi.com/yuananf/api/instagram28

## Instalación

1. Clona este repositorio:

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto y añade tu token de acceso a la API de Instagram:

    ```env
    OPENAI_API_KEY=tu_key_de_openai
    ```

## Uso

1. Crea el build de la solucion

    ```bash
    npm run build
    ```

2. Inicia el servidor de desarrollo:

    ```bash
    npm run start
    ```

    La aplicación esta disponible en `[https://aigram-bup6.onrender.com/analysis/:username]`.


## Estructura del Proyecto

- `index.ts`: Contiene el código fuente de la aplicación, endpoint para obtener el analisis.
- `Services/PostService.ts`: Fetch para obtener los posts de Instagram
- `Models/ig.ts`: Interfaces de la respuesta de Instagram

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork de este repositorio.
2. Crea una rama con tu nueva característica (`git checkout -b feature/nueva-caracteristica`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Agradecimientos

Este proyecto utiliza el SDK de Vercel y la API de Instagram para proporcionar funcionalidades avanzadas de análisis de perfiles.

---

