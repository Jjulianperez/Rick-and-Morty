import { createFileRoute } from '@tanstack/react-router'
import { Card } from '../components/card/Card'
import { Filtro } from '../components/filtro/Filtro'
import "../styles/main.scss"


//-----------fotos de prueba xd---------------
import ImgCharacter from '../assets/cargando.png'
import ImgCharacter1 from '../assets/1.jpeg'
import ImgCharacter2 from '../assets/2.jpeg'
import ImgCharacter3 from '../assets/3.jpeg'
import ImgCharacter4 from '../assets/4.jpeg'
import ImgCharacter5 from '../assets/5.jpeg'
// ------------------------------------------

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Filtro/>
        <div className='cards-grid'>
          <Card className={"character-card"} ImgCharacter={ImgCharacter} name='JULIAN PEREZ' status='dead' firstSeen='EL PARAISO' lastSeen='aqui'/>
          <Card className={"character-card fav"} ImgCharacter={ImgCharacter1} name='juan123' status='live'firstSeen='MI CASA' lastSeen='unknow' />
          <Card className={"character-card"} ImgCharacter={ImgCharacter2} name='belu' status='live' firstSeen='el primero' lastSeen='en el ultimo' />
          <Card className={"character-card create"} ImgCharacter={ImgCharacter3} name='carlos' status='unknow' firstSeen='el 15' lastSeen='ultimo episodio' />
          <Card className={"character-card fav"} ImgCharacter={ImgCharacter4} name='Juli' status='dead' firstSeen='en el segundo' lastSeen='penultimo' />
          <Card className={"character-card"} ImgCharacter={ImgCharacter5} name='elsebas' status='live' firstSeen='en el primero'lastSeen='en el ultimo' />
        </div>
    </main>
  )
}
