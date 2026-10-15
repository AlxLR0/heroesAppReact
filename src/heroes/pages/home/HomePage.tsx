import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import {  useState } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrums } from "@/components/custom/CustomBreadCrums"
import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.actions"




export const HomePage = () => {

  const [activeTab, setActiveTab] = useState<
  'all'|'favorites'|'heroes'|'villains'
  >('all');

  const {
    data: heroesResponse,
    isPending,
    error,
  } = useQuery({
    queryKey: ['heroes'],
    queryFn: ()=> getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, //5 minutos
  })

  const heroes = heroesResponse?.heroes ?? []

  return (
    <>
      <>
        {/* Header */}
       <CustomJumbotron
        title="SuperUniverse"
        description="Descubre, explora y gestiona tus superhéroes y villanos favoritos"
       />

       <CustomBreadCrums currentPage="Todos los heroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={()=>setActiveTab('all')}>All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={()=>setActiveTab('favorites')}>
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={()=>setActiveTab('heroes')}>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={()=>setActiveTab('villains')}>Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
              {/* Character Grid - mostrar todos los personajes*/}
              {isPending ? (
                <p role="status">Cargando personajes...</p>
              ) : error ? (
                <p role="alert">No se pudieron cargar los personajes: {error.message}</p>
              ) : (
                <HeroGrid heroes={heroes} />
              )}
          </TabsContent>
          <TabsContent value='favorites'>
            {/* mostrar todos los Favoritos*/}
            <h1>Favoritos</h1>
          </TabsContent>
          <TabsContent value='heroes'>
            {/*mostrar todos los Heroes*/}
            <HeroGrid heroes={heroes.filter(hero => hero.category.toLowerCase() === 'hero')} />
          </TabsContent>
          <TabsContent value='villains'>
            <HeroGrid heroes={heroes.filter(hero => hero.category.toLowerCase() === 'villain')} />
          </TabsContent>
        </Tabs>

      
       

        {/* Pagination */}
        <CustomPagination totalPages={8}/>
      </>
    </>
  )
}