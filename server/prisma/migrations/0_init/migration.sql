-- CreateTable
CREATE TABLE "todo" (
    "todo_id" SERIAL NOT NULL,
    "title" VARCHAR(50),
    "type" VARCHAR(50),
    "content" VARCHAR(300),

    CONSTRAINT "todo_pkey" PRIMARY KEY ("todo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_todo_id_key" ON "todo"("todo_id");

