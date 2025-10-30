/*
  Warnings:

  - A unique constraint covering the columns `[sigla]` on the table `Pais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sigla` to the `Pais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pais" ADD COLUMN     "sigla" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pais_sigla_key" ON "Pais"("sigla");
