import type { Continente } from "@prisma/client";
import { prisma } from "../../database/prisma.client.js";

type CreateContinenteDTO = {
  nome: string;
  descricao: string;
};

export class continenteService {
    async create(data: CreateContinenteDTO): Promise<Continente> {
        const continenteExists = await prisma.continente.findUnique({
        where: { nome: data.nome },
        });

        if (continenteExists) {
        throw new Error("Continente já existe");
        }

        const novoContinente = await prisma.continente.create({
        data: {
            nome: data.nome,
            descricao: data.descricao,
        },
        });
        return novoContinente;
    }

    async findAll(): Promise<Continente[]> {
        const continentes = await prisma.continente.findMany();
        return continentes;
    }
}
