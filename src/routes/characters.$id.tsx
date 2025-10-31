import { createFileRoute } from '@tanstack/react-router'
import { CharacterDetail } from '../components/characterId/Character'
import ImgCharacter from '../assets/1.jpeg'

export const Route = createFileRoute('/characters/$id')({
  component: RouteComponent,
})


function RouteComponent() {
  
  return (
    <CharacterDetail name='Rick Sanches' image={ImgCharacter} isFavorito={true} isCreate={true} species='Human' gender='Masculino' status='muerto' origin='Earth' location='Villa Mercedes' 
    episodes={[
      {
        id: 1,
        name: "The Ricklantis Mixup",
        episode: "S03E07",
        air_date: "Septiembre 10, 2017",
      },
      {
        id: 2,
        name: "Close Rick-Counters of the Rick Kind",
        episode: "S01E10",
        air_date: "Abril 7, 2014",
      },
      {
        id: 3,
        name: "Pilot",
        episode: "S01E01",
        air_date: "Diciembre 2, 2013",
      },
    ]}/>
)
}
