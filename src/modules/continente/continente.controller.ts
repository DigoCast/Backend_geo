import type { Request, Response } from "express";
import { continenteService } from "./continente.service.js";

export class continenteController {
    private continenteService: continenteService;

    constructor() {
        this.continenteService = new continenteService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, descricao } = req.body;
            const novoContinente = await this.continenteService.create({ nome, descricao });
            return res.status(201).json(novoContinente);
        } catch (error: unknown) { 
            if (error instanceof Error && error.message === "Continente já existe") {
                return res.status(409).json({ message: error.message });
            }

            return res.status(500).json({ 
                message: 'Ocorreu um erro interno no servidor.' 
            });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const continentes = await this.continenteService.findAll();
            return res.status(200).json(continentes);
        } catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro interno inesperado no servidor.' });
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const continente = await this.continenteService.findById(Number(id));
            return res.status(200).json(continente);
        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nome, descricao } = req.body;
            const continenteAtualizado = await this.continenteService.update(Number(id), { nome, descricao });
            return res.status(200).json(continenteAtualizado);
        }catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const continenteDeletado = await this.continenteService.delete(Number(id))
            return res.status(200).json(continenteDeletado);
        }catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
}