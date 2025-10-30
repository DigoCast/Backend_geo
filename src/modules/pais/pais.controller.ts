import type { Request, Response } from "express";
import { paisService } from "./pais.service.js"

export class paisController {
    private paisService: paisService;

    constructor(){
        this.paisService = new paisService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, idiomaOficial, moeda, populacao, sigla, continenteId } = req.body
            const novoPais = await this.paisService.create({ nome, idiomaOficial, moeda, populacao, sigla, continenteId })
            return res.status(201).json(novoPais)
        } catch (error: unknown) {
            if(error instanceof Error && error.message === "País já existe"){
                return res.status(409).json({message: error.message});
            }
            return res.status(500).json({
                message: "Ocorrou um erro interno no servidor"
            })
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const paises = await this.paisService.findAll();
            return res.status(200).json(paises)
        } catch (error) {
            
        }
    }
}