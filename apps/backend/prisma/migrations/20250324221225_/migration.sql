/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "wallet_address" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "telegram_username" VARCHAR(50),
    "country" VARCHAR(100) NOT NULL,
    "is_seller" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("wallet_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
