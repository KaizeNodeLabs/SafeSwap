-- CreateTable
CREATE TABLE "User" (
    "wallet_address" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "telegram_username" VARCHAR(50),
    "country" VARCHAR(100) NOT NULL,
    "is_seller" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("wallet_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
