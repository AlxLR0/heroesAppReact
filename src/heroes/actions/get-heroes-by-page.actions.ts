import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async(
    page: number,
    limit: number = 6,
    category:string = 'all'
): Promise <HeroesResponse>=>{
    try {
        if (isNaN(page)) {
            page=1;
        }
        if (isNaN(limit)) {
            limit=1;
        }
        const {data} = await heroApi.get<HeroesResponse>(`/`,{
            params:{
                limit:limit,
                offset: (page-1)*limit,
                category:category,
            }
        })

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