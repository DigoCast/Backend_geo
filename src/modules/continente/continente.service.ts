import type { Continente } from "@prisma/client";
import { prisma } from "../../database/prisma.client.js";

type CreateContinenteDTO = {
  nome: string;
  descricao: string;
};

export class ContinenteService {
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

    async findAll(nome?: string): Promise<Continente[]> {
        const continentes = await prisma.continente.findMany({
            where: nome ? { nome: {contains: nome, mode: "insensitive"}}
            : {},
            orderBy: {nome: "asc"}
        });
        return continentes;
    }

    async findById(id: number) {
        const continente = await prisma.continente.findUnique({
            where: { id: id },
            include: {
                paises: true
            }
        });

        if (!continente) {
            throw new Error('Continente não encontrado.');
        }
        return continente;
    }

    async update(id: number, data: CreateContinenteDTO): Promise<Continente> {
        const continenteAtualizado = await prisma.continente.update({
            where: { id: id },
            data: {
                nome: data.nome,
                descricao: data.descricao,
            },
        });
        return continenteAtualizado;
    }

    async delete(id: number): Promise<Continente> {
        const continenteDeletado = await prisma.continente.delete({
            where: { id: id },
        })
        return continenteDeletado;
    }
}
