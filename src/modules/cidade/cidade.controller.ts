import type { Request, Response } from "express";
import { CidadeService } from "./cidade.service.js";

export class CidadeController {
    private cidadeService = new CidadeService();

    constructor() {
        this.cidadeService = new CidadeService();
    };

    create = async (req: Request, res: Response) => {
        try {
            const { nome, populacao, latitude, longitude, paisId } = req.body;
            const novaCidade = await this.cidadeService.create({ nome, populacao, latitude, longitude, paisId })
        } catch (error) {
            
        }
    }
}