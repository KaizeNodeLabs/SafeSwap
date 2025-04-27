/*
  Warnings:

  - Added the required column `condition` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_address` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'FAIR');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "condition" "ProductCondition" NOT NULL,
ADD COLUMN     "seller_address" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_seller_address_fkey" FOREIGN KEY ("seller_address") REFERENCES "users"("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE;
