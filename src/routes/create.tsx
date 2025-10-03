import { createFileRoute } from '@tanstack/react-router'
import { NewCharacterForm } from '../components/createForm/NewCharacterForm'
import "../styles/main.scss"

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
        <NewCharacterForm/>
    </main>
  )
}
