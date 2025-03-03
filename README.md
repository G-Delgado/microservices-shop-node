# 🏢 Microservices E-commerce

Este es un **sistema basado en microservicios** diseñado para gestionar una tienda en línea.  
Utiliza tecnologías como **Node.js, TypeScript, PostgreSQL, MongoDB, RabbitMQ y Kafka** para garantizar escalabilidad y resiliencia.

---

## 📌 **Servicios**

| Servicio             | Puerto | Base de Datos | Descripción |
|----------------------|--------|--------------|-------------|
| API Gateway         | 3000   | -            | Enruta las solicitudes hacia los microservicios. |
| User Service        | 3001   | PostgreSQL   | Maneja autenticación y gestión de usuarios. |
| Order Service       | 3002   | PostgreSQL   | Gestiona órdenes de compra. |
| Inventory Service   | 3003   | MongoDB      | Administra el inventario de productos. |
| Notification Service| 3004   | RabbitMQ/Kafka | Envía notificaciones a los usuarios. |

---

## 📊 **Modelo de Datos**

### **User Service (PostgreSQL)**
```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  role: string;
}
```

### **Order Service (PostgreSQL)**
```ts
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  total_price: number;

  @Column({ default: "pending" })
  status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
```

### **Inventory Service (MongoDB)**
```ts
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
});
```

### **Notification Service (RabbitMQ/Kafka)**
Ejemplo de evento:
```json
{
  "userId": 1,
  "message": "Your order has been placed successfully!",
  "timestamp": "2024-09-07T12:34:56Z"
}
```

---

## 🚀 **Cómo iniciar el proyecto**

### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/tu-usuario/microservices-ecommerce.git
cd microservices-ecommerce
```

### 2️⃣ Iniciar bases de datos y servicios de mensajería
```sh
docker-compose -f docker-compose.databases.yml up -d
```
Esto levanta:
- PostgreSQL (users_db y orders_db)
- MongoDB (inventory_db)
- RabbitMQ
- Kafka con Zookeeper

### 3️⃣ Iniciar el Api Gateway
```sh
cd api-gateway
npm install
npm run start:dev
```
Esto ejecuta:
- `Api Gateway` en el puerto `3000`

### 4️⃣ Iniciar los microservicios
```sh
docker-compose -f docker-compose.services.yml up --build -d
```
Esto ejecuta:
- `user-service` en el puerto `3001`
- `order-service` en el puerto `3002`
- `inventory-service` en el puerto `3003`
- `notification-service` en el puerto `3004`

---

## 📡 **API Gateway**
El API Gateway enruta solicitudes a los microservicios.  
Ejemplo de endpoints:

- **Usuarios:** `POST /users/register`
- **Órdenes:** `POST /orders/create`
- **Inventario:** `GET /products`

---

## 📬 **Colas de Mensajería**
El `notification-service` recibe mensajes cuando:
- Se crea un nuevo usuario.  
- Se realiza una compra exitosa.

---

## 🛠 **Tecnologías Utilizadas**
- **Backend:** NestJS + Node.js + Express + TypeScript
- **Base de Datos:** PostgreSQL y MongoDB
- **Mensajería:** RabbitMQ y Kafka
- **Orquestación:** Docker + Docker Compose

---

## 💡 **Contribuir**
1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m "Añadir nueva funcionalidad"`)
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

---

## 📄 **Licencia**
Este proyecto está bajo la licencia ISC?.

