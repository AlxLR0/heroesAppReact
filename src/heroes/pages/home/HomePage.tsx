import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"


export const HomePage = () => {

  const [activeTab, setActiveTab] = useState<
  'all'|'favorites'|'heroes'|'villains'
  >('all');
  return (
    <>
      <>
        {/* Header */}
       <CustomJumbotron
        title="SuperUniverse"
        description="Descubre, explora y gestiona tus superhéroes y villanos favoritos"
       />

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
              <HeroGrid/>
          </TabsContent>
          <TabsContent value='favorites'>
            {/* mostrar todos los Favoritos*/}
            <h1>Favoritos</h1>
          </TabsContent>
          <TabsContent value='heroes'>
            {/*mostrar todos los Heroes*/}
            <h1>Heroes!!</h1>
          </TabsContent>
          <TabsContent value='villains'>
            {/*mostrar todos los villanos*/}
            <h1>villanos muajajaja</h1>
          </TabsContent>
        </Tabs>

      
       

        {/* Pagination */}
        <CustomPagination totalPages={8}/>
      </>
    </>
  )
}