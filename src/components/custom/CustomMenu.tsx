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
    <NavigationMenu className="sticky top-4 z-50 mb-8 w-full max-w-none justify-start">
      <NavigationMenuList className="w-full justify-start gap-1.5 rounded-2xl border border-white/70 bg-white/70 p-1.5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-xl">
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/" />}
            className={cn(
              isActive('/')
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-purple-700"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
              "h-11 rounded-xl px-5 font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            )}
            
          >
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search" />}
            className={cn(
              isActive('/search')
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-purple-700"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
              "h-11 rounded-xl px-5 font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            )}
          >
            Buscar
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
