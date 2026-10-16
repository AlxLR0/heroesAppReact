import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { Heart, Trophy, Users, Zap } from "lucide-react"
import { HeroStatsCard } from "./HeroStatsCard"
import { getSummaryAction } from "../actions/get-summary.action"

export const HeroStats = () => {

  const {data: summary} = useQuery({
    queryKey:['summary-information'],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5, //5 mins
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          

          <HeroStatsCard 
            title="Total de personajes"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
            <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {summary?.heroCount} Heroes
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  {summary?.villainCount} Villains
                </Badge>
              </div>

            </HeroStatsCard>

          <HeroStatsCard 
            title="Favoritos"
            icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
            <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">18.8% of total</p>

            </HeroStatsCard>
          <HeroStatsCard 
            title="+ Fuerte"
            icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
            <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
              <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>

            </HeroStatsCard>
          <HeroStatsCard 
            title="+ Inteligente"
            icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
            <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
              <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>

            </HeroStatsCard>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">18.8% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strongest</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Superman</div>
              <p className="text-xs text-muted-foreground">Strength: 10/10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Smartest</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Batman</div>
              <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
            </CardContent>
          </Card> */}
        </div>
  )
}
