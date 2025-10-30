-- CreateTable
CREATE TABLE "Continente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Continente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" BIGINT NOT NULL,
    "idiomaOficial" TEXT NOT NULL,
    "moeda" TEXT NOT NULL,
    "continenteId" INTEGER NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" BIGINT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Continente_nome_key" ON "Continente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Pais_nome_key" ON "Pais"("nome");

-- AddForeignKey
ALTER TABLE "Pais" ADD CONSTRAINT "Pais_continenteId_fkey" FOREIGN KEY ("continenteId") REFERENCES "Continente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
