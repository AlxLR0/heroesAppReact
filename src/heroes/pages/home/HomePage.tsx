import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import {  use, useMemo } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrums } from "@/components/custom/CustomBreadCrums"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"




export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const {favoriteCount, favorites}= use (FavoriteHeroContext);
  
  const activeTab=searchParams.get('tab') ?? 'all';
  const page=searchParams.get('page') ?? '1';
  const limit=searchParams.get('limit') ?? '6';
  
  const selectedTab= useMemo(()=>{
    const validTabs =['all','favorites','heroes','villains'];
    return validTabs.includes(activeTab)?activeTab:'all';
  },[activeTab])
  // const [activeTab, setActiveTab] = useState<
  // 'all'|'favorites'|'heroes'|'villains'
  // >('all');

  const category = selectedTab === 'heroes'
    ? 'hero'
    : selectedTab === 'villains'
      ? 'villain'
      : 'all';

  const {
    data: heroesResponse,
    isPending,
    error,
  } =usePaginatedHero(+page,+limit, category);
  
  
  // useQuery({
  //   queryKey: ['heroes',{page,limit}],
  //   queryFn: ()=> getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5, //5 minutos
  // })

  const {data: summary} = useHeroSummary();
  

  const heroes = heroesResponse?.heroes ?? []
  const heroesContent = isPending ? (
    <p role="status">Cargando personajes...</p>
  ) : error ? (
    <p role="alert">No se pudieron cargar los personajes: {error.message}</p>
  ) : (
    <HeroGrid heroes={heroes} />
  )

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
        <Tabs
          value={selectedTab}
          className="mb-8"
          onValueChange={(value) => {
            const tab = String(value);
            const nextCategory = tab === 'heroes'
              ? 'hero'
              : tab === 'villains'
                ? 'villain'
                : 'all';

            setSearchParams((prev) => {
              prev.set('tab', tab);
              prev.set('category', nextCategory);
              prev.set('page', '1');
              return prev;
            });
          }}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger value="favorites" className="flex items-center gap-2">
              Favorites ({favoriteCount})
            </TabsTrigger>

            <TabsTrigger value="heroes">
              Heroes ({summary?.heroCount})
            </TabsTrigger>

            <TabsTrigger value="villains">
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            {/* Character Grid - mostrar todos los personajes*/}
            {heroesContent}
          </TabsContent>
          <TabsContent value='favorites'>
            {/* mostrar todos los Favoritos*/}
            {/* <h1>Favoritos</h1> */}
            <HeroGrid heroes={favorites}></HeroGrid>
          </TabsContent>
          <TabsContent value='heroes'>
            {/*mostrar todos los Heroes*/}
            {heroesContent}
          </TabsContent>
          <TabsContent value='villains'>
            {heroesContent}
          </TabsContent>
        </Tabs>

      
       

        {/* Pagination */}
        {selectedTab !== 'favorites' && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>

        )}
      </>
    </>
  )
}