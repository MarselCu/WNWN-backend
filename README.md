# WNWN-backend
**Waste Not Want Not (WNWN)** is a platform that helps restaurants, bakeries, and supermarkets reduce food waste by selling surplus food at discounted prices. It benefits businesses, consumers, and the environment by ensuring good food doesn’t go to waste. ♻️ 

## Tech Stack
| Kebutuhan Teknologi      | Teknologi yang Digunakan              |
| ------------------------ | ------------------------------------- |
| Backend Framework        | Node.js + Express.js                  |
| Database                 | PostgreSQL                            |
| ORM                      | Prisma                                |
| Autentikasi              | OAuth2 + JWT + Bcrypt.js              |
| Keamanan                 | Helmet.js + CORS + Express Rate Limit |
| Real-time (Opsional)     | Socket.io                             |
| Dokumentasi API          | Swagger                               |
| Testing                  | Jest + Supertest                      |
| Storage                  | MinIO                                 |
| Deployment               | VPS + Docker                          |

## Database Design
| Table Name        | Columns |
|------------------|---------|
| **customers**    | id (PK), name, email, password, phone, created_at |
| **store_owners** | id (PK), name, email, password, phone, created_at |
| **store_admins** | id (PK), store_id (FK), name, email, password, phone, created_at |
| **stores**       | id (PK), store_owner_id (FK), store_name, email, phone, location, category, created_at |
| **products**     | id (PK), store_id (FK), name, description, price, stock, expiration_date, created_at |
| **orders**       | id (PK), customer_id (FK), store_id (FK), status, total_price, created_at |
| **order_details** | id (PK), order_id (FK), product_id (FK), quantity, subtotal |
| **payments**     | id (PK), order_id (FK), method, status, transaction_id, amount, created_at |
| **reviews**      | id (PK), customer_id (FK), store_id (FK), rating, comment, created_at |
