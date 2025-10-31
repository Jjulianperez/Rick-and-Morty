import { createFileRoute } from '@tanstack/react-router'
import { NewCharacterForm } from '../components/createForm/NewCharacterForm'
import "../scss/main.scss";

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    
        <NewCharacterForm/>
    
  )
}
