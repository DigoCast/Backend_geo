import type { Cidade } from "@prisma/client";
import { prisma } from "../../database/prisma.client.js";
import { GeoService, type ClimaFormatado } from "../../services/geo.service.js";

type CreateCidadeDTO = {
    nome: string
    populacao: bigint
    paisId: number
}

interface FindAllFilters {
    nome?: string | undefined;
    paisId?: number | undefined;
}

export class CidadeService {
    private geoService = new GeoService();

    async create (data: CreateCidadeDTO): Promise<Cidade> {
        const pais = await prisma.pais.findUnique({
            where: {
                id: data.paisId
            }
        });
        if(!pais){
            throw new Error("País não encontrado para esta cidade");
        }

        const coordenadas = await this.geoService.getCoordenadasCidade(data.nome, pais.sigla)
        if(!coordenadas){
            throw new Error(`Não foi possível encontrar coordenadas para a cidade: ${data.nome}`);
        }

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
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
                paisId: data.paisId
            }
        });

        return novaCidade;
    };

    async findAll (filters: FindAllFilters = {}) : Promise<Cidade[]> {
        const { nome, paisId } = filters;
        const whereClause: any = {};
        
        if (nome) {
            whereClause.nome = {
                contains: nome,
                mode: "insensitive" as const,
            };
        }
        if (paisId) {
            whereClause.paisId = paisId;
        }

        const cidades = await prisma.cidade.findMany({
            where: whereClause, 
            orderBy: {nome: "asc"}
        });
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

    async update(id: number, data: CreateCidadeDTO): Promise<Cidade> {
        const pais = await prisma.pais.findUnique({ where: { id: data.paisId } });
        if (!pais) throw new Error("País não encontrado");

        const coordenadas = await this.geoService.getCoordenadasCidade(data.nome, pais.sigla);
        if (!coordenadas) throw new Error(`Não foi possível encontrar coordenadas para: ${data.nome}`);

        const cidadeAtualizada = await prisma.cidade.update({
            where: {id: id},
            data: {
                nome: data.nome,
                populacao: data.populacao, 
                latitude: coordenadas.latitude,
                longitude: coordenadas.longitude,
                paisId: data.paisId
            }
        });
        return cidadeAtualizada;
    }

    async delete( id: number ) : Promise<Cidade>{
        const cidadeDeletada = await prisma.cidade.delete({
            where: {id: id}
        });
        return cidadeDeletada;
    }

    async getClima (id: number): Promise<ClimaFormatado> {
        const cidade = await this.findById(id);
        const lat = Number(cidade.latitude);
        const lon = Number(cidade.longitude);

        const clima = await this.geoService.getClimaPorCoordenadas(lat, lon)

        return clima
    }
}