import type { Cidade } from "@prisma/client";
import { prisma } from "../../database/prisma.client.js";

type CreateCidadeDTO = {
    nome: string
    populacao: bigint
    latitude: number
    longitude: number
    paisId: number
}

export class CidadeService {
    async create (data: CreateCidadeDTO): Promise<Cidade> {
        const cidadeExists = await prisma.cidade.findFirst({
            where: { 
                nome: data.nome,
                paisId: data.paisId
            },
        });

        if (cidadeExists){
            throw new Error("Cidade já existe")
        };

        const novaCidade = await prisma.cidade.create({
            data: {
                nome: data.nome,
                populacao: data.populacao,
                latitude: data.latitude,
                longitude: data.longitude,
                paisId: data.paisId
            }
        });

        return novaCidade;
    };

    async findAll () : Promise<Cidade[]> {
        const cidades = await prisma.cidade.findMany();
        return cidades;
    };

    async findById (id: number) {
        const cidade = await prisma.cidade.findUnique({
            where: { id: id }
        });

        if (!cidade) {
            throw new Error('Cidade não encontrada.')
        };

        return cidade
    }
}