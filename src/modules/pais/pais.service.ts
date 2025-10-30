import type { Pais } from "@prisma/client";
import { prisma } from "../../database/prisma.client.js"

type CreatePaisDTO = {
    nome: string,
    idiomaOficial: string
    moeda: string
    populacao: bigint
    sigla: string
    continenteId: number
}

export class paisService {
    async create(data: CreatePaisDTO): Promise<Pais> {
        const paisExists = await prisma.pais.findUnique({
            where: { nome: data.nome }
        })

        if(paisExists) {
            throw new Error("País já existe")
        }

        const novoPais = await prisma.pais.create({
            data: {
                nome: data.nome,
                idiomaOficial: data.idiomaOficial,
                moeda: data.moeda,
                populacao: data.populacao,
                sigla: data.sigla,
                continenteId: data.continenteId,
            }
        })
        return novoPais;
    }

    async findAll (): Promise<Pais[]> {
        const paises = await prisma.pais.findMany();
        return paises
    }
}