/*
  Warnings:

  - Added the required column `endereco` to the `Ponto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ponto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endereco" TEXT NOT NULL,
    "coordenadaX" TEXT NOT NULL,
    "coordenadaY" TEXT NOT NULL
);
INSERT INTO "new_Ponto" ("coordenadaX", "coordenadaY", "id") SELECT "coordenadaX", "coordenadaY", "id" FROM "Ponto";
DROP TABLE "Ponto";
ALTER TABLE "new_Ponto" RENAME TO "Ponto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
