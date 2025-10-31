import { createFileRoute } from '@tanstack/react-router'
import { Card } from '../components/card/Card'
import "../scss/main.scss"

export const Route = createFileRoute('/favoritos')({
  component: RouteComponent,
})

//-----------fotos de prueba xd---------------
import ImgCharacter from '../assets/cargando.png'
import ImgCharacter1 from '../assets/1.jpeg'
import ImgCharacter2 from '../assets/2.jpeg'
import ImgCharacter3 from '../assets/3.jpeg'
import ImgCharacter4 from '../assets/4.jpeg'
import ImgCharacter5 from '../assets/5.jpeg'
// ------------------------------------------


function RouteComponent() {
  return (
    <main>

        <div className='cards-grid'>
          <Card  isCreate={true} isFavorito={true}  ImgCharacter={ImgCharacter} name='JULIAN PEREZ' status='dead' firstSeen='EL PARAISO' lastSeen='aqui'/>

          <Card  isCreate={true} isFavorito={true} ImgCharacter={ImgCharacter1} name='juan123' status='live'firstSeen='MI CASA' lastSeen='unknown' />

          <Card  isCreate={false} isFavorito={true} ImgCharacter={ImgCharacter2} name='belu' status='live' firstSeen='el primero' lastSeen='en el ultimo' />

          <Card  isCreate={false} isFavorito={true} ImgCharacter={ImgCharacter3} name='carlos' status='unknown' firstSeen='el 15' lastSeen='ultimo episodio' />

          <Card  isCreate={false} isFavorito={true} ImgCharacter={ImgCharacter4} name='Juli' status='dead' firstSeen='en el segundo' lastSeen='penultimo' />

          <Card  isCreate={true} isFavorito={true} ImgCharacter={ImgCharacter5} name='elsebas' status='live' firstSeen='en el primero'lastSeen='en el ultimo' />
        </div>
    </main>
  )
}