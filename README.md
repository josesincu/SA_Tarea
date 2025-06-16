# SA_Tarea
## Pasos 
Ejecutar el Proyecto
1. Pre-requisitos
Tener instalado Docker y Docker Compose.

Las imágenes *-service-image deben estar creadas o usar build: . si están en el mismo repositorio.

2. Crear los Dockerfile de cada microservicio

```dockerfile
Copiar
Editar
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
CMD ["node", "index.js"]
```
3. Estructura recomendada del proyecto
```bash
Copiar
Editar
/project-root
  /user-service
  /product-service
  /order-service
  ...
  /api-gateway
  docker-compose.yml
```
4. Construir y levantar los servicios
```bash
Copiar
Editar
docker-compose up --build
```
5. Verificar servicios
API Gateway: http://localhost

RabbitMQ: http://localhost:15672 (user/pass: guest/guest)

Cada microservicio: depende de su puerto interno

## Codigo Docker Composer
```dockerfile
version: '3.8'

services:

  # API Gateway
  api-gateway:
    image: api-gateway-image
    ports:
      - "80:3000"
    depends_on:
      - user-service
      - product-service
      - order-service

  # User Service
  user-service:
    image: user-service-image
    environment:
      - DB_HOST=user-db
    depends_on:
      - user-db

  user-db:
    image: postgres:15
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - user-data:/var/lib/postgresql/data

  # Product Service
  product-service:
    image: product-service-image
    depends_on:
      - product-db
    environment:
      - DB_HOST=product-db

  product-db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: products
    volumes:
      - product-data:/var/lib/mysql

  # Cart Service
  cart-service:
    image: cart-service-image
    depends_on:
      - cart-db
    environment:
      - DB_HOST=cart-db

  cart-db:
    image: postgres:15
    environment:
      POSTGRES_DB: cart
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - cart-data:/var/lib/postgresql/data

  # Order Service
  order-service:
    image: order-service-image
    depends_on:
      - order-db
      - rabbitmq
    environment:
      - MQ_URL=amqp://guest:guest@rabbitmq:5672/

  order-db:
    image: postgres:15
    environment:
      POSTGRES_DB: orders
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - order-data:/var/lib/postgresql/data

  # Payment Service
  payment-service:
    image: payment-service-image
    depends_on:
      - payment-db
      - rabbitmq

  payment-db:
    image: postgres:15
    environment:
      POSTGRES_DB: payments
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - payment-data:/var/lib/postgresql/data

  # Shipping Service
  shipping-service:
    image: shipping-service-image
    depends_on:
      - rabbitmq

  # Review Service
  review-service:
    image: review-service-image
    depends_on:
      - review-db

  review-db:
    image: postgres:15
    environment:
      POSTGRES_DB: reviews
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - review-data:/var/lib/postgresql/data

  # Offer Service
  offer-service:
    image: offer-service-image
    depends_on:
      - offer-db

  offer-db:
    image: postgres:15
    environment:
      POSTGRES_DB: offers
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - offer-data:/var/lib/postgresql/data

  # Return/Exchange Service
  return-service:
    image: return-service-image
    depends_on:
      - return-db
      - payment-service

  return-db:
    image: postgres:15
    environment:
      POSTGRES_DB: returns
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - return-data:/var/lib/postgresql/data

  # Admin Panel
  admin-service:
    image: admin-service-image

  # Supplier Service
  supplier-service:
    image: supplier-service-image
    depends_on:
      - product-service
      - offer-service

  # Mensajería
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"

volumes:
  user-data:
  product-data:
  cart-data:
  order-data:
  payment-data:
  review-data:
  offer-data:
  return-data:


```
