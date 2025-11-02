import { findSiglaPorNome } from "../utils/findSiglaNome.js"

const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/alpha/"

interface DadosPaisAPI {
    sigla: string,
    populacao: bigint,
    moeda: string,
    idiomaOficial: string
}

export class CountriesService {
    async getDadosPorSiglaPais(sigla: string): Promise<DadosPaisAPI | null>{
        try {
            const url = `${REST_COUNTRIES_URL}${sigla}`
            const response = await fetch(url);
            if(!response.ok) {
                console.warn(`API de Países falhou para a sigla: ${sigla}`);
                return null;
            }
            const rawData = await response.json();

            const idioma = Object.values(rawData[0].languages)[0] as string;
            const infoMoeda = Object.values(rawData[0].currencies)[0] as { name: string };
            const moeda = infoMoeda.name;

            const respostaCorretaAPI = {
                sigla: String(rawData[0].cca2),
                populacao: BigInt(rawData[0].population),
                moeda: moeda,
                idiomaOficial: idioma
            };
            return respostaCorretaAPI

        } catch (error) {
            console.error("Erro no CountriesService:", error);
            throw new Error("Erro ao comunicar com o serviço de paises.");
        }
    }

}