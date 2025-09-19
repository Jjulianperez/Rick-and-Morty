import { createFileRoute } from '@tanstack/react-router'
import { Card } from '../components/card'
import { Filtro } from '../components/filtro'
import "../styles/main.scss"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Filtro/>
        <div className='cards-grid'>
          <Card isFav={"character-card"} />
          <Card isFav={"character-card-fav"} />
          <Card isFav={"character-card"} />
          <Card isFav={"character-card-create"} />
          <Card isFav={"character-card-fav"} />
          <Card isFav={"character-card"} />
          <Card isFav={"character-card"} />
          <Card isFav={"character-card"} />
        </div>
    </main>
  )
}
