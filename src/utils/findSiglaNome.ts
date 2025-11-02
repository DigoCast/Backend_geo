import { siglaPaises } from "./siglaPais.js";

const normalizarString = (str: string): string => {
    return str
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
};

const criarMapaNomeParaSigla = (): Map<string, string> => {
    const mapa = new Map<string, string>();
    for (const [sigla, nomeDaLista] of Object.entries(siglaPaises)) {
        const nomeNormalizado = normalizarString(nomeDaLista);
        mapa.set(nomeNormalizado, sigla);
    }
    return mapa;
}

const nomeParaSiglaMap = criarMapaNomeParaSigla();


export function findSiglaPorNome(nomePortugues: string): string | null {
    const nomeNormalizado = normalizarString(nomePortugues);
    return nomeParaSiglaMap.get(nomeNormalizado) || null
}