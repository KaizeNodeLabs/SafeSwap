/*
  Warnings:

  - Added the required column `buyer_address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escrow_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'ON_DISPUTE', 'FOR_REVIEW', 'APPROVED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyer_address" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "escrow_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "seller_address" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
