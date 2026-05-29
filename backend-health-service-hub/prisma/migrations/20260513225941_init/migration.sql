-- CreateEnum
CREATE TYPE "TipoMedico" AS ENUM ('Residente', 'Efetivo');

-- CreateEnum
CREATE TYPE "StatusRequisicao" AS ENUM ('Solicitado', 'Aprovado', 'Entregue');

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "capacidade" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ambulatorios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sigla" VARCHAR(10),
    "rua" VARCHAR(100) NOT NULL,
    "bairro" VARCHAR(50),
    "numero" VARCHAR(10),
    "cidade" VARCHAR(50) NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "cep" VARCHAR(8),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "idHospital" TEXT NOT NULL,

    CONSTRAINT "ambulatorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id" TEXT NOT NULL,
    "matricula" VARCHAR(20) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(20),
    "email" VARCHAR(100),
    "tipo" "TipoMedico" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos_lotacoes" (
    "id" TEXT NOT NULL,
    "dataInicio" DATE NOT NULL,
    "dataFim" DATE,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idMedico" TEXT NOT NULL,
    "idAmbulatorio" TEXT NOT NULL,

    CONSTRAINT "medicos_lotacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteiras_funcionais" (
    "id" TEXT NOT NULL,
    "crm" VARCHAR(20) NOT NULL,
    "dataExpedicao" DATE NOT NULL,
    "orgaoExpedidor" VARCHAR(50),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "idMedico" TEXT NOT NULL,

    CONSTRAINT "carteiras_funcionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos_residentes" (
    "id" TEXT NOT NULL,
    "valorBolsa" DECIMAL(10,2),
    "orgaoPagador" VARCHAR(100),
    "dataInicioResidencia" DATE,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "idMedico" TEXT NOT NULL,

    CONSTRAINT "medicos_residentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos_efetivos" (
    "id" TEXT NOT NULL,
    "dataAdmissao" DATE NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "idMedico" TEXT NOT NULL,
    "idSupervisor" TEXT,

    CONSTRAINT "medicos_efetivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditorias" (
    "id" TEXT NOT NULL,
    "dataAuditoria" DATE NOT NULL,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "idAmbulatorio" TEXT NOT NULL,
    "idMedicoResponsavel" TEXT NOT NULL,

    CONSTRAINT "auditorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipamentos" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "fabricante" VARCHAR(100),
    "cor" VARCHAR(50),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requisicoes_equipamentos" (
    "id" TEXT NOT NULL,
    "numeroRequisicao" VARCHAR(20) NOT NULL,
    "dataRequisicao" DATE NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "status" "StatusRequisicao" NOT NULL DEFAULT 'Solicitado',
    "dataEntrega" DATE,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "idAuditoria" TEXT NOT NULL,
    "idEquipamento" TEXT NOT NULL,

    CONSTRAINT "requisicoes_equipamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medicos_matricula_key" ON "medicos"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_lotacoes_idMedico_idAmbulatorio_key" ON "medicos_lotacoes"("idMedico", "idAmbulatorio");

-- CreateIndex
CREATE UNIQUE INDEX "carteiras_funcionais_crm_key" ON "carteiras_funcionais"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "carteiras_funcionais_idMedico_key" ON "carteiras_funcionais"("idMedico");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_residentes_idMedico_key" ON "medicos_residentes"("idMedico");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_efetivos_idMedico_key" ON "medicos_efetivos"("idMedico");

-- CreateIndex
CREATE UNIQUE INDEX "requisicoes_equipamentos_numeroRequisicao_key" ON "requisicoes_equipamentos"("numeroRequisicao");

-- AddForeignKey
ALTER TABLE "ambulatorios" ADD CONSTRAINT "ambulatorios_idHospital_fkey" FOREIGN KEY ("idHospital") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos_lotacoes" ADD CONSTRAINT "medicos_lotacoes_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "medicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos_lotacoes" ADD CONSTRAINT "medicos_lotacoes_idAmbulatorio_fkey" FOREIGN KEY ("idAmbulatorio") REFERENCES "ambulatorios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteiras_funcionais" ADD CONSTRAINT "carteiras_funcionais_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "medicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos_residentes" ADD CONSTRAINT "medicos_residentes_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "medicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos_efetivos" ADD CONSTRAINT "medicos_efetivos_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "medicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos_efetivos" ADD CONSTRAINT "medicos_efetivos_idSupervisor_fkey" FOREIGN KEY ("idSupervisor") REFERENCES "medicos_efetivos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditorias" ADD CONSTRAINT "auditorias_idAmbulatorio_fkey" FOREIGN KEY ("idAmbulatorio") REFERENCES "ambulatorios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditorias" ADD CONSTRAINT "auditorias_idMedicoResponsavel_fkey" FOREIGN KEY ("idMedicoResponsavel") REFERENCES "medicos_efetivos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisicoes_equipamentos" ADD CONSTRAINT "requisicoes_equipamentos_idAuditoria_fkey" FOREIGN KEY ("idAuditoria") REFERENCES "auditorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisicoes_equipamentos" ADD CONSTRAINT "requisicoes_equipamentos_idEquipamento_fkey" FOREIGN KEY ("idEquipamento") REFERENCES "equipamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
