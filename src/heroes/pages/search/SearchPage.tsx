import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/searchControls"

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
              title="Busqueda de SuperHeroes y villanos"
              description="Descubre, explora y gestiona tus superhéroes y villanos favoritos"
       />

       {/* Stats Dashboard */}
               <HeroStats />

        {/* Controls */}
          <SearchControls />
    </>
  )
}

export default SearchPage