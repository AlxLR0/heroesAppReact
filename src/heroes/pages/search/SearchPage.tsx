import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadCrums } from "@/components/custom/CustomBreadCrums"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHeroesAction } from "@/heroes/actions/search-heroes.actions"

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const team = searchParams.get('team') ?? undefined;
  const category = searchParams.get('category') ?? undefined;
  const universe = searchParams.get('universe') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;
 
  const {
    data: heroes = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['search',{name,team,category,universe,status,strength}],
    queryFn: ()=> searchHeroesAction({name,team,category,universe,status,strength}),
    staleTime: 1000 * 60 *5, //5 minutos

  })

  return (
    <>
      <CustomJumbotron
              title="Busqueda de SuperHeroes y villanos"
              description="Descubre, explora y gestiona tus superhéroes y villanos favoritos"
       />

       <CustomBreadCrums currentPage="Buscador"
        // breadCrumbs={[
        //   {label: 'Home1', to: '/'},
        //   {label: 'Home1', to: '/'},
        //   {label: 'Home1', to: '/'}
        // ]}
       />

       {/* Stats Dashboard */}
               <HeroStats />

        {/* Controls */}
          <SearchControls />

          {isPending ? (
            <p role="status">Buscando personajes...</p>
          ) : error ? (
            <p role="alert">No se pudieron buscar los personajes: {error.message}</p>
          ) : (
            <HeroGrid heroes={heroes}/>
          )}
    </>
  )
}

export default SearchPage