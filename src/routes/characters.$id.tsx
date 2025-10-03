import { createFileRoute } from '@tanstack/react-router'
import { CharacterDetail } from '../components/characterId/Character'
import ImgCharacter from '../assets/1.jpeg'

export const Route = createFileRoute('/characters/$id')({
  component: RouteComponent,
})


function RouteComponent() {
  return (
    <CharacterDetail name='Rick Sanches' image={ImgCharacter} species='Human' gender='Masculino' status='muerto' origin='Earth' location='Villa Mercedes' 
    episodes={[
      {
        id: 1,
        name: "The Ricklantis Mixup",
        code: "S03E07",
        airDate: "Septiembre 10, 2017",
      },
      {
        id: 2,
        name: "Close Rick-Counters of the Rick Kind",
        code: "S01E10",
        airDate: "Abril 7, 2014",
      },
      {
        id: 3,
        name: "Pilot",
        code: "S01E01",
        airDate: "Diciembre 2, 2013",
      },
    ]}/>
)
}
