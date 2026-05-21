import { createFileRoute } from '@tanstack/react-router'
import { Card } from '../components/card/Card'
import { useFavoritosStore } from '../stores/favoritosStore'

export const Route = createFileRoute('/favoritos')({
  component: RouteComponent,
})

function RouteComponent() {
  const { favoritos } = useFavoritosStore()

  if (favoritos.length === 0) {
    return (
      <main>
        <p style={{ textAlign: "center", padding: "2rem" }}>
          No tienes personajes favoritos aún. Haz clic en el corazón en la página principal para agregarlos.
        </p>
      </main>
    )
  }

  return (
    <main>
      <div className='cards-grid'>
        {favoritos.map((char) => (
          <Card
            key={char.id}
            id={char.id}
            name={char.name}
            ImgCharacter={char.image}
            status={char.status}
            firstSeen={char.firstSeen}
            lastSeen={char.lastSeen}
            isCreate={char.isCreate}
            isFavorito={true}
          />
        ))}
      </div>
    </main>
  )
}
