## Descripción

Backend de prueba técnica yaydoo - Isaac Contreras

Se puede visualizar una version en producción en (https://yaydoo-test.herokuapp.com/docs)

Se desarrollo un front básico para visualizar la funcionalidad (https://yaydoo-test.netlify.app)


## Instalación

Instalar dependencias con yarn

\$ yarn

## Ejecución

Ejecutar aplicación con yarn, por defecto se ejecutará en el puerto 8082.

# Development

\$ yarn dev

## Endpoints

La documentación también se puede consultar en {BASE_URL}/Docs (http://localhost:8082/docs) (Swagger)

# GET v1/products

Lista todos los Productos

# GET /products/:category

Lista todos los Productos de una categoría

# POST /products/reload

Vuelve a generar la BDD por medio del scraper

# GET /categories

Lista todas las categorías
