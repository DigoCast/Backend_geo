import type { Pais } from "@prisma/client";
import { prisma } from "../../database/prisma.client.js"
import { CountriesService } from "../../services/countries.service.js";
import { findSiglaPorNome } from "../../utils/findSiglaNome.js";

type CreatePaisDTO = {
    nome: string,
    continenteId: number
}

type UpdatePaisDTO = {
    nome: string,
    idiomaOficial: string
    moeda: string
    populacao: bigint
    sigla: string
    continenteId: number
}

interface FindAllFilters {
    nome?: string | undefined;
    continenteId?: number | undefined;
    populacaoMin?: bigint | undefined;
    populacaoMax?: bigint | undefined;
}

export class PaisService {
    private countriesService = new CountriesService();

    async create(data: CreatePaisDTO): Promise<Pais> {
        const sigla = findSiglaPorNome(data.nome);
        if (!sigla) {
            throw new Error(`País "${data.nome}" não encontrado.`);
        }

        const paisExists = await prisma.pais.findUnique({
            where: { sigla: sigla }
        });
        if(paisExists) {
            throw new Error("País já existe")
        };

        const dadosApiCountries = await this.countriesService.getDadosPorSiglaPais(sigla);
        if (!dadosApiCountries) {
            throw new Error("Não foi possível buscar os dados da API externa para este país.");
        }

        const novoPais = await prisma.pais.create({
            data: {
                nome: data.nome,
                idiomaOficial: dadosApiCountries.idiomaOficial,
                moeda: dadosApiCountries.moeda,
                populacao: dadosApiCountries.populacao,
                sigla: dadosApiCountries.sigla,
                continenteId: data.continenteId,
            }
        });
        return novoPais;
    };

    async findAll (filters: FindAllFilters = {}): Promise<Pais[]> {
        const { nome, continenteId, populacaoMin, populacaoMax } = filters;
        const whereClause: any = {};
        
        if (nome) {
            whereClause.nome = {
                contains: nome,
                mode: "insensitive" as const,
            };
        }
        if (continenteId) {
            whereClause.continenteId = continenteId;
        }
        const populacaoFilter: { gte?: bigint; lte?: bigint } = {};
        if (populacaoMin !== undefined) {
            populacaoFilter.gte = populacaoMin;
        }
        if (populacaoMax !== undefined) {
            populacaoFilter.lte = populacaoMax;
        }
        
        if (Object.keys(populacaoFilter).length > 0) {
            whereClause.populacao = populacaoFilter;
        }
        const paises = await prisma.pais.findMany({
            where: whereClause,
            orderBy: {nome: "asc"}
        });
        return paises;
    };

    async findById (id: number) {
        const pais = await prisma.pais.findUnique({
            where: { id: id },
            include: {
                cidades: true,
            }
        });

        if (!pais) {
            throw new Error('País não encontrado.');
        };
        return pais;
    };

    async update(id: number, data: UpdatePaisDTO): Promise<Pais> {
        const paisAtualizado = await prisma.pais.update({
            where: {id: id},
            data: {
                nome: data.nome,
                idiomaOficial: data.idiomaOficial,
                moeda: data.moeda,
                populacao: data.populacao,
                sigla: data.sigla,
                continenteId: data.continenteId,
            }
        });
        return paisAtualizado;
    };

    async delete (id: number ): Promise<Pais> {
        const paisDeletado = await prisma.pais.delete({
            where: {id: id}
        });
        return paisDeletado;
    }
}