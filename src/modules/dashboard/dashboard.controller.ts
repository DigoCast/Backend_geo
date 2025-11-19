import type { Request, Response } from "express";
import { DashboardService } from "./dashboard.service.js";

export class DashboardController {
    private dashboardService: DashboardService;

    constructor() {
        this.dashboardService = new DashboardService();
    }

    getGeoStats = async (req: Request, res: Response) => {
        try {
            const stats = await this.dashboardService.getGeoStats();
            return res.status(200).json(stats);
        } catch (error) {
            console.error("Erro ao buscar estatísticas do dashboard:", error);
            return res.status(500).json({
                message: "Ocorreu um erro ao buscar as estatísticas."
            });
        }
    }
}