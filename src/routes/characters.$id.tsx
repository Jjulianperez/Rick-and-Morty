import { createFileRoute } from '@tanstack/react-router'
import { useFetchSingleCharacters } from './../hook/useFetchSingleCharacter'
import { CharacterDetail } from '../components/characterId/Character'
import { useSingleCharacterStore } from '../stores/characterSingleStore'

export const Route = createFileRoute('/characters/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  useFetchSingleCharacters(id)
  const { character } = useSingleCharacterStore()
  return (
    <CharacterDetail character={character}/>
)
}
