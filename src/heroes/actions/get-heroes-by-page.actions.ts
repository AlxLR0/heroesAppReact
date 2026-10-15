import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async(): Promise <HeroesResponse>=>{
    try {
        const {data} = await heroApi.get<HeroesResponse>(`/`)

        const heroes = data.heroes.map(hero =>({
            ...hero,
            image: `${BASE_URL}/images/${hero.image}`,

        }))

        const response = {
            ...data,
            heroes
        };

        // console.groupCollapsed(`[Heroes API] ${heroApi.getUri()} - ${heroes.length} heroes`)
        // console.log("Respuesta original del backend:", data)
        // console.log("Respuesta completa con URLs de imagen:", response)
        // console.table(heroes.map(({ id, alias, image }) => ({ id, alias, image })))
        // console.groupEnd()

        return response;
    } catch (error) {
        console.error(`[Heroes API] Error al consultar ${heroApi.getUri()}:`, error)
        throw error
    }
}