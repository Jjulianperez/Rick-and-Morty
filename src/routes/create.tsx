import { createFileRoute } from '@tanstack/react-router'
import { NewCharacterForm } from '../components/createForm/NewCharacterForm'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    
        <NewCharacterForm/>
    
  )
}
