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
          <Card className={"character-card"} ImgCharacter={ImgCharacter} />
          <Card className={"character-card-fav"} ImgCharacter={ImgCharacter1} />
          <Card className={"character-card"} ImgCharacter={ImgCharacter2} />
          <Card className={"character-card-create"} ImgCharacter={ImgCharacter3} />
          <Card className={"character-card-fav"} ImgCharacter={ImgCharacter4} />
          <Card className={"character-card"} ImgCharacter={ImgCharacter5} />
          <Card className={"character-card"} ImgCharacter={ImgCharacter} />
          <Card className={"character-card"} ImgCharacter={ImgCharacter} />
        </div>
    </main>
  )
}
