# 🚚 Transport Bidding App

A full-stack monorepo transport bidding platform built using **Next.js**, **Tailwind CSS**, **ShadCN UI**, **Express**, **Firebase Admin SDK**, **Prisma**, and **PostgreSQL**, powered by **Bun** and orchestrated with **TurboRepo** and **Docker**.

---

## 📦 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, ShadCN UI , Tanstack Query
- **Backend**: Express.js, Firebase Admin SDK
- **Database**: PostgreSQL with Prisma ORM
- **Monorepo**: TurboRepo
- **Runtime**: Bun
- **Containerization**: Docker

---


---

## ⚙️ Requirements

- [Bun](https://bun.sh) (runtime)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- Firebase Admin credentials

---

## 🔐 Environment Variables

Create a `.env` file in the apps/web or simply run `cp .env.example .env` :

```env

NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_SENDER_ID=
NEXT_PUBLIC_APP_ID=
NEXT_PUBLIC_MEASUREMENT_ID=

Create a file `serviceAccountKey.json` at apps/server/src/auth which looks something like this : 

{
  "type": ,
  "project_id": ,
  "private_key_id": ,
  "private_key": ,
  "client_email":,
  "client_id": ,
  "auth_uri": ",
  "token_uri": ,
  "auth_provider_x509_cert_url":,
  "client_x509_cert_url": ,
  "universe_domain": 
}

Create a `.env` file in the apps/server or simply run `cp .env.example .env` :

GEMINI_API_KEY=
DATABASE_URL=

```

### Set up Database

```
cd apps/server
docker compose up -d
bunx prisma generate
bunx prisma migrate dev --name init
```

### Development Script
```
bun server:up
bun web:up

```

