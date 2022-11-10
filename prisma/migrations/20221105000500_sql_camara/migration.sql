-- CreateTable
CREATE TABLE "Politico" (
    "idPolitico" SERIAL NOT NULL,
    "nomePolitico" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Politico_pkey" PRIMARY KEY ("idPolitico")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" SERIAL NOT NULL,
    "nomeSessao" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicial" TIMESTAMP(3) NOT NULL,
    "dataFinal" TIMESTAMP(3) NOT NULL,
    "votosFavor" INTEGER NOT NULL,
    "votosContra" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Politico_nomePolitico_key" ON "Politico"("nomePolitico");
