import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadCrums } from "@/components/custom/CustomBreadCrums"

export const SearchPage = () => {
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
    </>
  )
}

export default SearchPage