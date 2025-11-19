import type { Request, Response } from "express";
import { CidadeService } from "./cidade.service.js";

export class CidadeController {
    private cidadeService = new CidadeService();

    constructor() {
        this.cidadeService = new CidadeService();
    };

    create = async (req: Request, res: Response) => {
        try {
            const { nome, populacao, paisId } = req.body;
            const novaCidade = await this.cidadeService.create({ nome, populacao, paisId })
            res.status(201).json(novaCidade);
        } catch (error) {
            if (error instanceof Error && error.message === "Cidade já existe") {
                return res.status(409).json({ message: error.message });
            }

            console.error(error);
            return res.status(500).json({ 
                message: 'Ocorreu um erro interno no servidor.' 
            });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const { nome, paisId } = req.query as { nome?: string; paisId?: string };

            const filters = {
                nome,
                paisId: paisId ? Number(paisId) : undefined,
            };

            const cidades = await this.cidadeService.findAll(filters);
            res.status(200).json(cidades);
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
            return res.status(500).json({ message: 'Ocorreu um erro interno inesperado no servidor.' });
        }
    }    

    findById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const cidade = await this.cidadeService.findById(Number(id));
            res.status(200).json(cidade);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nome, populacao, paisId} = req.body;
            const cidadeAtualizada = await this.cidadeService.update(Number(id), { nome, populacao, paisId });
            return res.status(200).json(cidadeAtualizada);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    delete = async ( req: Request, res: Response ) => {
        try {
            const { id } = req.params;
            const cidadeDeletada = await this.cidadeService.delete(Number(id));
            return res.status(200).json(cidadeDeletada);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    getClima = async( req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const clima = await this.cidadeService.getClima(Number(id))
            return res.status(200).json(clima);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: "Erro ao buscar clima." });
        }
    }
}