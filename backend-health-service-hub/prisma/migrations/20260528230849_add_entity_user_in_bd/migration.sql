-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
