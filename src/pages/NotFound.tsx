
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="detail-page">
      <h1>Error 404</h1>
      <h2>Página no encontrada</h2>
      <p>La dirección que ingresaste no existe.</p>

      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

export default NotFound
