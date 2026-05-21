import { createFileRoute } from '@tanstack/react-router'
import { EditForm } from '../../components/editForm/EditForm'

export const Route = createFileRoute('/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <EditForm id={id} />
}
