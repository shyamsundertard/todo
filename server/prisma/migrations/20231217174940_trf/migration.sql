/*
  Warnings:

  - You are about to drop the column `label` on the `todo` table. All the data in the column will be lost.
  - Added the required column `labelId` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "label",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "labelId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "labelName" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_labelName_key" ON "Label"("labelName");

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
