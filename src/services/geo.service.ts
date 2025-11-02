const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const GEO_API_URL = "http://api.openweathermap.org/geo/1.0/direct"
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json?"

type Coordenadas = {
    latitude: number,
    longitude: number
}

export interface ClimaFormatado{
    localidade: string;
    hora_local: string;
    atualizado_em: string;
    temperatura_c: number;
    sensacao_termica_c: number;
    descricao: string;
    icone_url: string;
    umidade_perc: number;
    vento_kph: number;
}

export class GeoService {
    async getCoordenadasCidade (cidade: string, siglaPais: string) : Promise<Coordenadas>{
        if(!GEOCODING_API_KEY) {
            throw new Error("Chave da API de Geocoding não está definida no .env");
        }

        try {
            const url = `${GEO_API_URL}?q=${cidade},${siglaPais}&limit=1&appid=${GEOCODING_API_KEY}`; 
            const reponse = await fetch(url);
            if(!reponse.ok) {
                throw new Error("Erro ao buscar coordenadas na API de Geocoding");
            }

            const data = await reponse.json();
            if(!data || data.length === 0) {
                console.warn(`Geocoding API não encontrou coordenadas para: ${cidade}, ${siglaPais}`);
                return { latitude: 0, longitude: 0 };
            }

            const { lat, lon } = data[0];
            return { latitude: lat, longitude: lon };
        } catch (error) {
            console.error("Erro no GeoService:", error);
            throw new Error("Erro ao comunicar com o serviço de geolocalização.");
        }
    }

    async getClimaPorCoordenadas(latitude: number, longitude: number): Promise<ClimaFormatado> {
        if (!OPENWEATHER_API_KEY) {
            throw new Error("Chave da API OpenWeather não configurada no .env");
        }

        const url = `${WEATHER_API_URL}key=${OPENWEATHER_API_KEY}&q=${latitude},${longitude}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados climáticos na API OpenWeather");
            }
            const rawData = await response.json();

            const climaFormatado: ClimaFormatado = {
                localidade: rawData.location.name,
                hora_local: rawData.location.localtime,
                atualizado_em: rawData.current.last_updated,
                temperatura_c: rawData.current.temp_c,
                sensacao_termica_c: rawData.current.feelslike_c,
                descricao: rawData.current.condition.text,
                icone_url: "https:" + rawData.current.condition.icon,
                umidade_perc: rawData.current.humidity,
                vento_kph: rawData.current.wind_kph,
            };

            return climaFormatado;
        } catch (error) {
            console.error("Erro no GeoService (Clima):", error);
            throw new Error("Erro ao comunicar com o serviço de clima.");
        }
    }
}