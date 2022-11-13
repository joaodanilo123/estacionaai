-- CreateTable
CREATE TABLE "Ponto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endereco" TEXT NOT NULL,
    "coordenadaX" TEXT NOT NULL,
    "coordenadaY" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pontoId" INTEGER NOT NULL,
    CONSTRAINT "Ticket_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "Ponto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    CONSTRAINT "Pagamento_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_ticketId_key" ON "Pagamento"("ticketId");
