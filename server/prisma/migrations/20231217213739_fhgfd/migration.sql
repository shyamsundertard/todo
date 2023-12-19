-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_labelId_fkey";

-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "labelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE SET NULL ON UPDATE CASCADE;
