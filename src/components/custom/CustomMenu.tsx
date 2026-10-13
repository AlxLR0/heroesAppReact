import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router"

export const CustomMenu = () => {

    const{pathname} = useLocation();

    const isActive = (path: string)=>{
        return pathname === path
    }
  return (
    <NavigationMenu className="justify-start">
      <NavigationMenuList className="justify-start gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/" />}
            className={cn(isActive('/') && "bg-slate-200 rounded-md ","p-2 rounded-md" ) }
            
          >
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search" />}
             className={cn(
              isActive('/search') && 'bg-slate-200',
              'p-2 rounded-md'
            )}
          >
            Buscar
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
