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
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const continentes = await this.continenteService.findAll();
            return res.status(200).json(continentes);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    // ... (Aqui iriam os outros métodos: findById, update, delete)
}