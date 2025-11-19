import { prisma } from "../../database/prisma.client.js";

interface GeoStats {
    totalContinents: number;
    totalCountries: number;
    totalCities: number;
}

export class DashboardService {

    async getGeoStats(): Promise<GeoStats> {
        const [
            totalContinents,
            totalCountries,
            totalCities,
        ] = await Promise.all([
            prisma.continente.count(),
            prisma.pais.count(),
            prisma.cidade.count(),
        ]);

        return {
            totalContinents,
            totalCountries,
            totalCities,
        };
    }
}