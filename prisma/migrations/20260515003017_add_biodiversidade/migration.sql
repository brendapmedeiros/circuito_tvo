
ALTER TABLE "biodiversidade" RENAME CONSTRAINT "biodiversity_pkey" TO "biodiversidade_pkey";

ALTER TABLE "eventos" RENAME CONSTRAINT "events_pkey" TO "eventos_pkey";

DROP TABLE "Trilhas";

DROP TABLE "eventos_usuarios";

-- CreateTable
CREATE TABLE "trilhas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "distancia" DOUBLE PRECISION NOT NULL,
    "localizacao" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trilhas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_eventos" (
    "id" SERIAL NOT NULL,
    "tipo_evento" TEXT NOT NULL,
    "entity_id" INTEGER NOT NULL,
    "entity_tipo" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_eventos_pkey" PRIMARY KEY ("id")
);
