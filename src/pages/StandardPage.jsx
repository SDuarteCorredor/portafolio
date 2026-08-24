import { ContentPage } from '../components/page/ContentPage'

// Páginas de servicio, casos de estudio, perfil y contacto: todas comparten la
// misma plantilla editorial. Lo que cambia es el contenido, no la estructura.
export default function StandardPage({ page }) {
  return <ContentPage page={page} />
}
